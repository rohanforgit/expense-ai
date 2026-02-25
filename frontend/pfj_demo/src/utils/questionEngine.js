export function getNextQuestion(state, answers) {
  const {
    impulseScore,
    overspendScore,
    disciplineScore,
    topCategory,
  } = state;

  // -------------------------------
  // CORE QUESTION 1 (always)
  // -------------------------------
  if (!answers.awareness) {
    return {
      id: "awareness",
      text: "How do you feel about your spending this month?",
      options: [
        "I am in control",
        "Slightly concerned",
        "I overspent",
        "Not sure",
      ],
    };
  }

  // -------------------------------
  // CORE QUESTION 2 (always)
  // -------------------------------
  if (!answers.tracking_habit) {
    return {
      id: "tracking_habit",
      text: "How regularly do you track your expenses?",
      options: [
        "Daily",
        "Few times a week",
        "Rarely",
        "This is my first time",
      ],
    };
  }

  // -------------------------------
  // DYNAMIC: overspend follow-up
  // -------------------------------
  if (
    (answers.awareness === "I overspent" ||
      answers.awareness === "Slightly concerned") &&
    !answers.overspend_reason
  ) {
    return {
      id: "overspend_reason",
      text: `What mainly caused higher spending in ${
        topCategory || "your top category"
      }?`,
      options: [
        "Planned big purchase",
        "Unexpected expense",
        "Impulse spending",
        "Lifestyle costs",
      ],
    };
  }

  // -------------------------------
  // DYNAMIC: impulse deep dive
  // -------------------------------
  if (
    impulseScore >= 10 &&
    answers.overspend_reason === "Impulse spending" &&
    !answers.impulse_trigger
  ) {
    return {
      id: "impulse_trigger",
      text: "What usually triggers your impulse purchases?",
      options: [
        "Discounts & offers",
        "Mood / stress",
        "Social influence",
        "Random urges",
      ],
    };
  }

  // -------------------------------
  // CORE QUESTION 3 (always)
  // -------------------------------
  if (!answers.improvement_goal) {
    return {
      id: "improvement_goal",
      text: "What is your primary focus for next month?",
      options: [
        "Reduce unnecessary spending",
        "Build savings",
        "Control impulse buys",
        "Just monitor for now",
      ],
    };
  }

  // -------------------------------
  // BONUS QUESTION (adaptive depth)
  // -------------------------------
  if (disciplineScore < 25 && !answers.commitment_level) {
    return {
      id: "commitment_level",
      text: "How committed are you to improving next month?",
      options: [
        "Very committed",
        "Somewhat committed",
        "Just exploring",
        "Not sure yet",
      ],
    };
  }

  // -------------------------------
  // DONE
  // -------------------------------
  return null;
}