import { useState } from "react";

function ReviewPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    // 🔥 dynamic flow logic
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const restartReview = () => {
    setStep(1);
    setAnswers({});
  };

  return (
    <div style={{ padding: "24px" }}>
      <h2>Smart Spending Review</h2>

      {/* ================= STEP 1 ================= */}
      {step === 1 && (
        <div className="card-section">
          <div className="step-label">Step 1</div>

          <h4>
            How do you feel about your spending this month?
          </h4>

          <div className="question-options">
            <button
              className="btn-secondary-clean"
              onClick={() => handleAnswer("feeling", "control")}
            >
              I am in control
            </button>

            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("feeling", "concerned")
              }
            >
              Slightly concerned
            </button>

            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("feeling", "overspent")
              }
            >
              I overspent
            </button>

            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("feeling", "unsure")
              }
            >
              Not sure
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <div className="card-section">
          <div className="step-label">Step 2</div>

          <h4>
            How regularly do you track your expenses?
          </h4>

          <div className="question-options">
            <button
              className="btn-secondary-clean"
              onClick={() => handleAnswer("tracking", "daily")}
            >
              Daily
            </button>

            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("tracking", "weekly")
              }
            >
              Few times a week
            </button>

            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("tracking", "rarely")
              }
            >
              Rarely
            </button>

            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("tracking", "first_time")
              }
            >
              This is my first time
            </button>
          </div>
        </div>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <div className="card-section">
          <div className="step-label">Step 3</div>

          <h4>
            What usually causes overspending for you?
          </h4>

          <div className="question-options">
            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("cause", "impulse")
              }
            >
              Impulse purchases
            </button>

            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("cause", "social")
              }
            >
              Social outings
            </button>

            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("cause", "offers")
              }
            >
              Discounts & offers
            </button>

            <button
              className="btn-secondary-clean"
              onClick={() =>
                handleAnswer("cause", "not_sure")
              }
            >
              Not sure
            </button>
          </div>
        </div>
      )}

      {/* ================= RESULT ================= */}
      {step === 4 && (
        <div className="card-section">
          <h3>🧠 Spending Insight</h3>

          <p style={{ marginTop: "10px" }}>
            Based on your responses, your spending pattern
            shows areas where mindful tracking can help
            improve control.
          </p>

          <button
            className="btn-primary-clean"
            style={{ marginTop: "16px" }}
            onClick={restartReview}
          >
            Restart Review
          </button>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
