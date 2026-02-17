function DayCell({ day, entries = [], isActive, onAdd }) {
  if (!isActive) {
    return <div className="calendar-cell disabled"></div>;
  }

  const total = entries.reduce((sum, e) => sum + e.amount, 0);

  let bgClass = "";
  if (total > 0 && total <= 300) bgClass = "low-spend";
  else if (total > 300 && total <= 800) bgClass = "medium-spend";
  else if (total > 800) bgClass = "high-spend";

  return (
    <div className={`calendar-cell ${bgClass}`}

      onClick={() => onAdd(day)}
    >
      <div>
        <span className="day-number">{day}</span>

        {total > 0 && (
          <div className="day-total">₹{total}</div>
        )}
      </div>

      <div className="entries">
        {entries.slice(0, 2).map((e, idx) => (
          <div key={idx} className="entry">
            ₹{e.amount} — {e.category}
          </div>
        ))}

        {entries.length > 2 && (
          <div className="more">
            +{entries.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
}

export default DayCell;
