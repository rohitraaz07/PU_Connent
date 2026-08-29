import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";
import { randomUUID } from "crypto";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    // Read visitor cookie
    const cookies = req.headers.cookie || "";

    const visitorCookie = cookies
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("pu_visitor="));

    let visitorKey = visitorCookie
      ? decodeURIComponent(visitorCookie.split("=")[1])
      : "";

    // Create a new visitor ID if this is a new visitor
    if (!visitorKey) {
      visitorKey = randomUUID();

      res.setHeader(
        "Set-Cookie",
        `pu_visitor=${encodeURIComponent(
          visitorKey
        )}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`
      );
    }

    const today = new Date().toISOString().split("T")[0];

    // Add visitor if they haven't been counted before.
    // If they already exist, only update their last visit date.
    await sql`
      INSERT INTO visitors (visitor_key, last_visit)
      VALUES (${visitorKey}, ${today})
      ON CONFLICT (visitor_key)
      DO UPDATE SET last_visit = ${today}
    `;

    // Get total unique visitors
    const result = await sql`
      SELECT COUNT(*)::int AS count
      FROM visitors
    `;

    return res.status(200).json({
      visitors: result[0].count,
    });
  } catch (error) {
    console.error("Visitor counter error:", error);

    return res.status(500).json({
      error: "Unable to get visitor count",
    });
  }
}