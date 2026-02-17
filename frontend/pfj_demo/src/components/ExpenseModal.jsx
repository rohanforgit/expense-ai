import { useState } from "react";

function ExpenseModal({ day, onClose, onSave }) {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h5>Add Expense — Day {day}</h5>

        <input
          type="number"
          className="form-control mb-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Purpose"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        />

        <div className="d-flex justify-content-end gap-2">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onSave({ amount: Number(amount), purpose })}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseModal;
