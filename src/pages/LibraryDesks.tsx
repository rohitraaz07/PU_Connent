import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Page, PageHeader } from "../components/common/Page";
import { libraryZones } from "../data/mockData";
import { writeStorage } from "../utils/storage";

export function LibraryDesks() {
  const [library, setLibrary] = useState(libraryZones[0]);
  const [slot, setSlot] = useState("10:00 - 12:00");
  const [seat, setSeat] = useState("A04");
  const seats = useMemo(() => Array.from({ length: 24 }, (_, i) => `${String.fromCharCode(65 + Math.floor(i / 8))}${String((i % 8) + 1).padStart(2, "0")}`), []);
  const reserve = () => {
    writeStorage("pu-connect-library-bookings", [{ library, slot, seat, createdAt: new Date().toISOString() }]);
    toast.success(`Desk ${seat} reserved at ${library}`);
  };
  return (
    <Page>
      <PageHeader eyebrow="Library Desk booking" title="Reserve a study desk" description="Choose a reading hall, time slot, and available seat with instant prototype confirmation." />
      <section className="module-layout">
        <form className="data-card control-card">
          <label>Library / reading hall<select value={library} onChange={(e) => setLibrary(e.target.value)}>{libraryZones.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Time slot<select value={slot} onChange={(e) => setSlot(e.target.value)}>{["08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00", "16:00 - 18:00"].map((item) => <option key={item}>{item}</option>)}</select></label>
          <div className="booking-summary">
            <span>Selected desk<strong>{seat}</strong></span>
            <span>Selected time<strong>{slot}</strong></span>
            <span>Library location<strong>{library}</strong></span>
          </div>
          <button type="button" className="primary-button" onClick={reserve}>Confirm Reservation</button>
        </form>
        <div className="data-card seat-map-panel">
          <div className="card-title between">
            <h2>Desk availability</h2>
            <div className="seat-legend">
              <span><i className="available" /> Available</span>
              <span><i className="selected" /> Selected</span>
              <span><i className="reserved" /> Reserved</span>
              <span><i className="unavailable" /> Unavailable</span>
            </div>
          </div>
          <div className="seat-grid">
            {seats.map((item, index) => (
              <button key={item} className={seat === item ? "seat selected" : index % 11 === 0 ? "seat unavailable" : index % 7 === 0 ? "seat occupied" : "seat"} disabled={index % 7 === 0 || index % 11 === 0} onClick={() => setSeat(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
