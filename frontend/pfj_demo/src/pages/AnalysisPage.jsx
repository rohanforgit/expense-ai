import { useState, useEffect } from "react";
import MonthlySummary from "../components/MonthlySummary";
import SpendSettings from "../components/SpendSettings";
import SmartInsights from "../components/SmartInsights";

function AnalysisPage() {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const storageKey = `pfj-expenses-${currentYear}-${currentMonth}`;

  const [expenses, setExpenses] = useState({});

  // 🔹 Load current month data
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setExpenses(saved ? JSON.parse(saved) : {});
  }, [storageKey]);

  // 🔹 CATEGORY AGGREGATION
  const categoryTotals = {};
  let grandTotal = 0;

  Object.values(expenses).forEach((dayEntries) => {
    dayEntries.forEach((entry) => {
      const cat = entry.category || "Other";

      categoryTotals[cat] = (categoryTotals[cat] || 0) + entry.amount;

      grandTotal += entry.amount;
    });
  });

  // 🔹 Find Top Category
  let topCategory = null;
  let topAmount = 0;

  Object.entries(categoryTotals).forEach(([cat, total]) => {
    if (total > topAmount) {
      topAmount = total;
      topCategory = cat;
    }
  });

  // 🔹 Overspend Detection (>50% in one category)
  let overspendWarning = null;

  if (grandTotal > 0 && topAmount / grandTotal > 0.5) {
    overspendWarning = `High concentration spending detected in "${topCategory}". Consider reviewing this category.`;
  }

  return (
    <div className="page-container">
      <h3>Expense Analysis (This Month)</h3>

      {/* Spending Threshold Settings */}
      <div className="card-section">
        <SpendSettings />
      </div>

      {/* Monthly Summary */}
      <div className="card-section">
        <MonthlySummary expenses={expenses} />
      </div>

      {/* Overspend Warning */}
      {overspendWarning && (
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#f8d7da",
            borderRadius: "6px",
            color: "#721c24",
          }}
        >
          ⚠️ {overspendWarning}
        </div>
      )}

      {/* Category Breakdown */}
      <div style={{ marginTop: "30px" }}>
        <h5>Category Breakdown</h5>

        {Object.keys(categoryTotals).length === 0 ? (
          <p>No expenses recorded yet.</p>
        ) : (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Category</th>
                <th>Total (₹)</th>
                <th>% of Spending</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(categoryTotals).map(([category, total]) => {
                const percentage =
                  grandTotal > 0 ? ((total / grandTotal) * 100).toFixed(1) : 0;

                const isTop = category === topCategory;

                return (
                  <tr
                    key={category}
                    style={isTop ? { backgroundColor: "#fff3cd" } : {}}
                  >
                    <td>
                      {category}
                      {isTop && " 🔥"}
                    </td>
                    <td>₹{total}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
              {/* 🧠 Smart Insights */}
              <SmartInsights
                grandTotal={grandTotal}
                categoryTotals={categoryTotals}
                topCategory={topCategory}
              />
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default AnalysisPage;
