import { useState, useEffect } from "react";
import CalendarGrid from "../components/CalendarGrid";

function JournalPage() {
  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // ✅ ONE state only — start as null
  const [expenses, setExpenses] = useState(null);

  const storageKey = `pfj-expenses-${currentYear}-${currentMonth}`;

  // 🔹 LOAD from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);
    setExpenses(savedData ? JSON.parse(savedData) : {});
  }, [storageKey]);

  // 🔹 SAVE to localStorage (ONLY after load)
  useEffect(() => {
    if (expenses !== null) {
      localStorage.setItem(storageKey, JSON.stringify(expenses));
    }
  }, [expenses, storageKey]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // ⛔ Prevent render before data loads
  if (expenses === null) return null;

  return (
  <div className="page-container">

    <div className="month-nav">
      <button onClick={handlePrevMonth} className="nav-arrow">
        ←
      </button>

      <div className="month-title">
        {months[currentMonth]} {currentYear}
      </div>

      <button onClick={handleNextMonth} className="nav-arrow">
        →
      </button>
    </div>

    <CalendarGrid
      month={currentMonth}
      year={currentYear}
      expenses={expenses}
      setExpenses={setExpenses}
    />
  </div>
);

}

export default JournalPage;
