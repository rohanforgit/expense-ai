import { useEffect, useState } from "react";
import { analyzeBehavior } from "../utils/behaviorEngine";
import { getNextQuestion } from "../utils/questionEngine";

function QuestionFlow() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const storageKey = `pfj-expenses-${year}-${month}`;

  const [expenses, setExpenses] = useState({});
  const [behaviorState, setBehaviorState] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [finished, setFinished] = useState(false);
  const [step, setStep] = useState(1);

  // 🔹 Load expenses and analyze behavior
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : {};
    setExpenses(parsed);

    const analysis = analyzeBehavior(parsed);
    setBehaviorState(analysis);
  }, [storageKey]);

  // 🔹 Decide next question dynamically
  useEffect(() => {
    if (!behaviorState || finished) return;

    const nextQ = getNextQuestion(behaviorState, answers);

    if (!nextQ) {
      setFinished(true);
      return;
    }

    setCurrentQuestion(nextQ);
  }, [answers, behaviorState, finished]);

  // 🔹 Handle answer
  const handleAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
    setStep((s) => s + 1);
  };

  // 🧠 Final insight generator
  const generateInsight = () => {
    if (!behaviorState) return { title: "", message: "" };

    if (behaviorState.overspendScore >= 20) {
      return {
        title: "Spending Risk Detected",
        message:
          "Your spending shows high concentration in one category. Consider setting category limits.",
      };
    }

    if (behaviorState.impulseScore >= 20) {
      return {
        title: "Impulse Pattern Noticed",
        message:
          "You may benefit from a 24-hour pause rule before non-essential purchases.",
      };
    }

    if (behaviorState.disciplineScore >= 20) {
      return {
        title: "Good Financial Discipline",
        message:
          "Your spending habits look controlled. Keep maintaining daily tracking.",
      };
    }

    return {
      title: "Moderate Spending Behavior",
      message:
        "Your pattern is fairly balanced. Small optimizations can improve savings.",
    };
  };

  // ===============================
  // FINISHED SCREEN
  // ===============================
  if (finished) {
    const insight = generateInsight();

    return (
      <div className="insight-card">
        <h4>🧠 {insight.title}</h4>
        <p>{insight.message}</p>

        <button
          className="insight-btn"
          onClick={() => {
            setAnswers({});
            setFinished(false);
            setStep(1);
          }}
        >
          Restart Review
        </button>
      </div>
    );
  }

  // ===============================
  // LOADING SAFETY
  // ===============================
  if (!currentQuestion) return null;

  // ===============================
  // MAIN QUESTION UI
  // ===============================
  return (
    <div className="insight-card">
      <div className="insight-progress">Step {step}</div>

      <h5 className="insight-question">
        {currentQuestion.text}
      </h5>

      <div className="insight-options">
        {currentQuestion.options.map((opt) => (
          <button
            key={opt}
            className="insight-btn"
            onClick={() => handleAnswer(opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuestionFlow;