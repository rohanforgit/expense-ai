import { useState } from "react";

function SmartInsights({ grandTotal, categoryTotals, topCategory }) {
  const [answer, setAnswer] = useState(null);

  // 🔹 find top percentage
  let topAmount = categoryTotals[topCategory] || 0;
  const topPercent =
    grandTotal > 0 ? (topAmount / grandTotal) * 100 : 0;

  // 🔹 decide which question to show
  let questionBlock = null;

  if (grandTotal === 0) {
    return null; // show nothing if no data
  }

  // 🚨 overspend case
  if (topPercent > 50) {
    questionBlock = (
      <>
        <div className="insight-title">
          ⚠️ High spending in {topCategory}
        </div>

        <p className="insight-question">
          Was this spending planned?
        </p>

        <div className="insight-options">
          {[
            "Planned expense",
            "One-time event",
            "Need to reduce",
            "Not sure"
          ].map((opt) => (
            <button
              key={opt}
              className={`insight-btn ${
                answer === opt ? "active" : ""
              }`}
              onClick={() => setAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </>
    );
  }

  // ✅ balanced spending
  else if (topPercent >= 25 && topPercent <= 50) {
    questionBlock = (
      <>
        <div className="insight-title">
          ✅ Spending looks balanced
        </div>

        <p className="insight-question">
          Want to set a saving goal for next month?
        </p>

        <div className="insight-options">
          {["Yes", "Maybe later"].map((opt) => (
            <button
              key={opt}
              className={`insight-btn ${
                answer === opt ? "active" : ""
              }`}
              onClick={() => setAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </>
    );
  }

  // 🧊 very low concentration
  else {
    questionBlock = (
      <>
        <div className="insight-title">
          👍 Good distribution
        </div>

        <p className="insight-question">
          Keep tracking daily to maintain control.
        </p>
      </>
    );
  }

  return <div className="insight-card">{questionBlock}</div>;
}

export default SmartInsights;