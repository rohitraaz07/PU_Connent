import { Bike, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Page, PageHeader } from "../components/common/Page";
import { StatCard } from "../components/common/UI";
import { campusLocations } from "../data/mockData";
import { writeStorage } from "../utils/storage";

export function ERickshaw() {
  const [pickup, setPickup] = useState(campusLocations[0]);
  const [drop, setDrop] = useState(campusLocations[2]);
  const [choice, setChoice] = useState("Shared Shuttle");
  const book = () => {
    writeStorage("pu-connect-rides", [{ pickup, drop, choice, time: new Date().toISOString() }]);
    toast.success("E-Rickshaw booking confirmed for the selected campus route.");
  };
  return (
    <Page>
      <PageHeader eyebrow="Campus shuttle" title="E-Rickshaw booking" description="Select pickup and drop locations, compare ride choices, and reserve a frontend-only campus shuttle." />
      <section className="content-grid three">
        <StatCard label="Nearest stand" value="UIET Gate" hint="7 minutes" />
        <StatCard label="Live availability" value="12 rides" hint="Across campus stands" tone="success" />
        <StatCard label="Peak route" value="Library loop" hint="Student Centre to AC Joshi" tone="info" />
      </section>
      <section className="module-layout">
        <form className="data-card control-card">
          <label>Pickup location<select value={pickup} onChange={(e) => setPickup(e.target.value)}>{campusLocations.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Drop location<select value={drop} onChange={(e) => setDrop(e.target.value)}>{campusLocations.map((item) => <option key={item}>{item}</option>)}</select></label>
          <div className="ride-summary">
            <span>ETA<strong>7 min</strong></span>
            <span>Fare mode<strong>Campus pass</strong></span>
            <span>Live stands<strong>12 rides</strong></span>
          </div>
          <div className="segmented vertical">
            {["Shared Shuttle", "Direct Ride", "Accessible Ride"].map((item) => <button type="button" key={item} className={choice === item ? "selected" : ""} onClick={() => setChoice(item)}>{item}</button>)}
          </div>
          <button type="button" className="primary-button" onClick={book}>Book Ride</button>
        </form>
        <div className="data-card route-map">
          <div><MapPin /> {pickup}</div>
          <span />
          <div><Bike /> Campus transit visualization</div>
          <span />
          <div><Clock /> {drop}</div>
        </div>
      </section>
    </Page>
  );
}
