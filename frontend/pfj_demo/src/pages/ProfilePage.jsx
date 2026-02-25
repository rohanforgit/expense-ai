import { useEffect, useState } from "react";

function ProfilePage() {
  const [incomes, setIncomes] = useState([]);
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState("");

  const [incomeSource, setIncomeSource] = useState("");
  const [incomeAmount, setIncomeAmount] = useState("");

  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const [saved, setSaved] = useState(false);

  // 🔹 Load existing profile
  useEffect(() => {
    const savedProfile = localStorage.getItem("pfj-profile");
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setIncomes(parsed.incomes || []);
      setFixedExpenses(parsed.fixedExpenses || []);
      setSavingsGoal(parsed.savingsGoal || "");
    }
  }, []);

  // 🔹 Add income source
  const addIncome = () => {
    if (!incomeSource || !incomeAmount) return;

    setIncomes((prev) => [
      ...prev,
      { source: incomeSource, amount: Number(incomeAmount) },
    ]);

    setIncomeSource("");
    setIncomeAmount("");
  };

  // 🔹 Add fixed expense
  const addExpense = () => {
    if (!expenseName || !expenseAmount) return;

    setFixedExpenses((prev) => [
      ...prev,
      { name: expenseName, amount: Number(expenseAmount) },
    ]);

    setExpenseName("");
    setExpenseAmount("");
  };

  // 🔹 Save profile
  const handleSave = () => {
    const profile = {
      incomes,
      fixedExpenses,
      savingsGoal: Number(savingsGoal) || 0,
    };

    localStorage.setItem("pfj-profile", JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const totalIncome = incomes.reduce((s, i) => s + i.amount, 0);
  const totalFixed = fixedExpenses.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="page-container">
      <h3>Financial Profile</h3>

      <div className="profile-card">
        {/* 🟢 Income Section */}
        <h4>Income Sources</h4>

        <input
          placeholder="Income source (Salary, Freelance...)"
          value={incomeSource}
          onChange={(e) => setIncomeSource(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
        />

        <button className="btn-primary-clean" onClick={addIncome}>
          Add Income
        </button>

        {incomes.map((inc, idx) => (
          <div key={idx} className="profile-item-row">
            <span>
              {inc.source} — ₹{inc.amount}
            </span>

            <div className="profile-actions">
              <button
                className="action-btn edit"
                onClick={() => {
                  setIncomeSource(inc.source);
                  setIncomeAmount(inc.amount);
                  setIncomes((prev) => prev.filter((_, i) => i !== idx));
                }}
              >
                Edit
              </button>

              <button
                className="action-btn delete"
                onClick={() =>
                  setIncomes((prev) => prev.filter((_, i) => i !== idx))
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="profile-total">Total Income: ₹{totalIncome}</div>

        {/* 🔵 Fixed Expenses */}
        <h4 style={{ marginTop: "20px" }}>Fixed Expenses</h4>

        <input
          placeholder="Expense name (Rent, EMI...)"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        />

        <button className="btn-primary-clean" onClick={addExpense}>
          Add Expense
        </button>

        {fixedExpenses.map((exp, idx) => (
          <div key={idx} className="profile-item-row">
            <span>
              {exp.name} — ₹{exp.amount}
            </span>

            <div className="profile-actions">
              <button
                className="action-btn edit"
                onClick={() => {
                  setExpenseName(exp.name);
                  setExpenseAmount(exp.amount);
                  setFixedExpenses((prev) => prev.filter((_, i) => i !== idx));
                }}
              >
                Edit
              </button>

              <button
                className="action-btn delete"
                onClick={() =>
                  setFixedExpenses((prev) => prev.filter((_, i) => i !== idx))
                }
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <div className="profile-total">Total Fixed: ₹{totalFixed}</div>

        {/* 🟡 Savings Goal */}
        <h4 style={{ marginTop: "20px" }}>Savings Goal</h4>

        <input
          type="number"
          placeholder="Optional monthly savings goal"
          value={savingsGoal}
          onChange={(e) => setSavingsGoal(e.target.value)}
        />

        <button className="btn-primary-clean" onClick={handleSave}>
          Save Profile
        </button>

        {saved && <div className="profile-success">✅ Profile saved</div>}
      </div>
    </div>
  );
}

export default ProfilePage;
