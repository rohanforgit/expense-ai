function MonthlySummary({ expenses = {} }) {
  let total = 0;
  let days = 0;
  let maxDay = null;
  let maxAmount = 0;

  Object.entries(expenses).forEach(([day, entries]) => {
    const dayTotal = entries.reduce((s, e) => s + e.amount, 0);

    if (dayTotal > 0) {
      total += dayTotal;
      days += 1;

      if (dayTotal > maxAmount) {
        maxAmount = dayTotal;
        maxDay = day;
      }
    }
  });

  const average = days > 0 ? Math.round(total / days) : 0;

  return (
    <div className="monthly-summary">
      <strong>Total:</strong> ₹{total} &nbsp;&nbsp;
      <strong>Avg / day:</strong> ₹{average} &nbsp;&nbsp;
      <strong>Highest:</strong>{" "}
      {maxDay ? `Day ${maxDay} (₹${maxAmount})` : "—"}
    </div>
  );
}

export default MonthlySummary;

