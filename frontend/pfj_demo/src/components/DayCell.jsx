function DayCell({
  day,
  entries = [],
  isActive,
  onAdd,
  onEdit,
  onDelete,
}) {
  // 🔹 hide inactive cells
  if (!isActive) {
    return <div className="calendar-cell disabled"></div>;
  }

  // 🔹 total calculation
  const total = entries.reduce((sum, e) => sum + e.amount, 0);

  // 🔹 spend color logic
  let bgClass = "";
  if (total > 0 && total <= 300) bgClass = "low-spend";
  else if (total > 300 && total <= 800) bgClass = "medium-spend";
  else if (total > 800) bgClass = "high-spend";

  return (
    <div
      className={`calendar-cell ${bgClass}`}
      onClick={() => onAdd(day)}
    >
      {/* 📅 day header */}
      <div>
        <span className="day-number">{day}</span>

        {total > 0 && (
          <div className="day-total">₹{total}</div>
        )}
      </div>

      {/* 🧾 entries */}
      <div className="entries">
        {entries.slice(0, 2).map((e, idx) => (
          <div key={idx} className="entry-row">
            <span>
              ₹{e.amount} — {e.category}
            </span>

            <div className="entry-actions">
              <button
                className="mini-btn edit"
                onClick={(ev) => {
                  ev.stopPropagation();

                  const newAmount = prompt(
                    "Edit amount:",
                    e.amount
                  );

                  if (!newAmount) return;

                  onEdit(day, idx, {
                    ...e,
                    amount: Number(newAmount),
                  });
                }}
              >
                ✏️
              </button>

              <button
                className="mini-btn delete"
                onClick={(ev) => {
                  ev.stopPropagation();
                  onDelete(day, idx);
                }}
              >
                🗑
              </button>
            </div>
          </div>
        ))}

        {/* 🔹 single +more indicator */}
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
