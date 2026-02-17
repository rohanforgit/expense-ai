import { useState, useEffect } from "react";

function SpendSettings() {
  const [lowLimit, setLowLimit] = useState("");
  const [mediumLimit, setMediumLimit] = useState("");

  // Load saved limits
  useEffect(() => {
    const savedLow = localStorage.getItem("pfj-low-limit");
    const savedMedium = localStorage.getItem("pfj-medium-limit");

    if (savedLow) setLowLimit(savedLow);
    if (savedMedium) setMediumLimit(savedMedium);
  }, []);

  // Save when changed
  useEffect(() => {
    if (lowLimit) localStorage.setItem("pfj-low-limit", lowLimit);
    if (mediumLimit) localStorage.setItem("pfj-medium-limit", mediumLimit);
  }, [lowLimit, mediumLimit]);

  return (
    <div className="settings-card">
      <h4>Spending Thresholds</h4>

      <div className="settings-row">
        <label>Low Spend (≤)</label>
        <input
          type="number"
          value={lowLimit}
          onChange={(e) => setLowLimit(e.target.value)}
        />
      </div>

      <div className="settings-row">
        <label>Medium Spend (≤)</label>
        <input
          type="number"
          value={mediumLimit}
          onChange={(e) => setMediumLimit(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SpendSettings;
