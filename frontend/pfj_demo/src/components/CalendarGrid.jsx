import { useState } from "react";
import DayCell from "./DayCell";

function CalendarGrid({ month, year, expenses, setExpenses }) {
  const [selectedDay, setSelectedDay] = useState(null);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [custom, setCustom] = useState("");

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const cells = [];

  for (let i = 0; i < startOffset; i++) {
    cells.push({ day: null, isActive: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ day, isActive: true });
  }

  while (cells.length < 42) {
    cells.push({ day: null, isActive: false });
  }

  // 🔹 Open modal
  const handleAddExpense = (day) => {
    setSelectedDay(day);
  };

  // 🔹 Submit from modal
  const handleSubmitExpense = () => {
    if (!amount || !selectedDay) return;

    const entry = {
      amount: Number(amount),
      category: category === "Other" ? custom || "Other" : category,
    };

    setExpenses((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), entry],
    }));

    setAmount("");
    setCategory("Food");
    setCustom("");
    setSelectedDay(null);
  };

  // 🔹 Delete entry
  const handleDeleteExpense = (day, index) => {
    setExpenses((prev) => {
      const updatedDay = [...(prev[day] || [])];
      updatedDay.splice(index, 1);

      return {
        ...prev,
        [day]: updatedDay,
      };
    });
  };

  // 🔹 Edit entry
  const handleEditExpense = (day, index, updatedEntry) => {
    setExpenses((prev) => {
      const updatedDay = [...(prev[day] || [])];
      updatedDay[index] = updatedEntry;

      return {
        ...prev,
        [day]: updatedDay,
      };
    });
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((cell, index) => (
          <DayCell
            key={index}
            day={cell.day}
            isActive={cell.isActive}
            entries={cell.day ? expenses[cell.day] || [] : []}
            onAdd={handleAddExpense}
            onDelete={handleDeleteExpense}
            onEdit={handleEditExpense}
          />
        ))}
      </div>

      {selectedDay && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h4>Add Expense - Day {selectedDay}</h4>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Groceries</option>
              <option>Entertainment</option>
              <option>Shopping</option>
              <option>Other</option>
            </select>

            {category === "Other" && (
              <input
                type="text"
                placeholder="Specify category"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />
            )}

            <button
              className="btn-primary-clean"
              onClick={handleSubmitExpense}
            >
              Add
            </button>

            <button
              style={{ marginTop: "10px" }}
              onClick={() => setSelectedDay(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarGrid;
