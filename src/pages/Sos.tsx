// import { useState } from "react";

// export default function SOS() {
//   const [active, setActive] = useState(false);

//   const handleSOS = () => {
//     setActive(true);

//     setTimeout(() => {
//       alert("🚨 SOS Alert Activated!");
//       setActive(false);
//     }, 500);
//   };

//   return (
//     <main className="sos-page">
//       <h1>Emergency SOS</h1>

//       <p>
//         Press the button below to activate an emergency alert.
//       </p>

//       <button
//         className={`sos-button ${active ? "active" : ""}`}
//         onClick={handleSOS}
//       >
//         {active ? "ALERTING..." : "SOS"}
//       </button>
//     </main>
//   );
// }

import { useEffect, useState } from "react";

type Contact = {
  id: number;
  name: string;
  phone: string;
};

export default function SOS() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [alertActive, setAlertActive] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [locationLoading, setLocationLoading] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "Emergency Contact",
      phone: "112",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  /* SOS countdown */
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      setCountdown(null);
      setAlertActive(true);

      alert("🚨 SOS ALERT ACTIVATED!");

      return;
    }

    const timer = setTimeout(() => {
      setCountdown((value) => (value === null ? null : value - 1));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  /* Get current location */
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Location is not supported by this browser.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setLocation(`${latitude}, ${longitude}`);
        setLocationLoading(false);
      },
      () => {
        alert("Unable to get your location.");
        setLocationLoading(false);
      }
    );
  };

  /* Start SOS */
  const handleSOS = () => {
    if (alertActive) return;

    getLocation();
    setCountdown(5);
  };

  /* Cancel countdown */
  const cancelSOS = () => {
    setCountdown(null);
  };

  /* Reset SOS */
  const resetSOS = () => {
    setAlertActive(false);
    setCountdown(null);
  };

  /* Add emergency contact */
  const addContact = () => {
    if (!newName.trim() || !newPhone.trim()) {
      alert("Please enter contact name and phone number.");
      return;
    }

    setContacts((current) => [
      ...current,
      {
        id: Date.now(),
        name: newName,
        phone: newPhone,
      },
    ]);

    setNewName("");
    setNewPhone("");
  };

  /* Remove contact */
  const removeContact = (id: number) => {
    setContacts((current) =>
      current.filter((contact) => contact.id !== id)
    );
  };

  return (
    <main className="sos-page">

      {/* Header */}
      <section className="sos-header">
        <p className="sos-eyebrow">EMERGENCY ASSISTANCE</p>

        <h1>Emergency SOS</h1>

        <p>
          Press the SOS button to start an emergency alert.
          Your location can also be shared with your trusted contacts.
        </p>
      </section>

      {/* SOS Button */}
      <section className="sos-main">

        <div
          className={`sos-circle ${
            countdown !== null || alertActive ? "sos-pulse" : ""
          }`}
        >
          <button
            className="big-sos-button"
            onClick={handleSOS}
            disabled={countdown !== null || alertActive}
          >
            {alertActive
              ? "ACTIVE"
              : countdown !== null
              ? countdown
              : "SOS"}
          </button>
        </div>

        {countdown !== null && (
          <div className="sos-countdown">
            <h2>Alert starting in {countdown}</h2>

            <p>
              Press cancel if this was accidental.
            </p>

            <button
              className="cancel-sos-button"
              onClick={cancelSOS}
            >
              Cancel SOS
            </button>
          </div>
        )}

        {alertActive && (
          <div className="alert-active-box">
            <h2>🚨 SOS Alert Active</h2>

            <p>
              Emergency assistance has been activated.
            </p>

            <button
              className="reset-sos-button"
              onClick={resetSOS}
            >
              Reset SOS
            </button>
          </div>
        )}

        {!countdown && !alertActive && (
          <p className="sos-instruction">
            Press the button only during an emergency
          </p>
        )}

      </section>

      {/* Emergency Actions */}
      <section className="emergency-actions">

        <a
          className="call-112-button"
          href="tel:112"
        >
          📞 Call 112
        </a>

        <button
          className="location-button"
          onClick={getLocation}
        >
          📍{" "}
          {locationLoading
            ? "Getting Location..."
            : "Get My Location"}
        </button>

      </section>

      {/* Location */}
      {location && (
        <section className="location-card">

          <h2>📍 Your Current Location</h2>

          <p>{location}</p>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${location}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Location in Maps
          </a>

        </section>
      )}

      {/* Emergency Contacts */}
      <section className="contacts-section">

        <div className="section-heading">
          <p className="sos-eyebrow">TRUSTED PEOPLE</p>

          <h2>Emergency Contacts</h2>

          <p>
            Add people you trust so you can contact them quickly.
          </p>
        </div>

        {/* Existing contacts */}
        <div className="contacts-list">

          {contacts.map((contact) => (
            <div
              className="contact-card"
              key={contact.id}
            >

              <div className="contact-info">

                <div className="contact-avatar">
                  👤
                </div>

                <div>
                  <h3>{contact.name}</h3>
                  <p>{contact.phone}</p>
                </div>

              </div>

              <div className="contact-actions">

                <a
                  className="contact-call"
                  href={`tel:${contact.phone}`}
                >
                  📞 Call
                </a>

                <button
                  className="remove-contact"
                  onClick={() => removeContact(contact.id)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Add contact */}
        <div className="add-contact-card">

          <h3>Add Emergency Contact</h3>

          <div className="contact-form">

            <input
              type="text"
              placeholder="Contact name"
              value={newName}
              onChange={(event) =>
                setNewName(event.target.value)
              }
            />

            <input
              type="tel"
              placeholder="Phone number"
              value={newPhone}
              onChange={(event) =>
                setNewPhone(event.target.value)
              }
            />

            <button
              onClick={addContact}
            >
              + Add Contact
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}