// behaviorEngine.js

export function analyzeBehavior(expenses) {
  let impulseScore = 0;
  let overspendScore = 0;
  let disciplineScore = 0;

  const categoryTotals = {};
  let grandTotal = 0;
  let highDays = 0;
  let lowDays = 0;

  Object.values(expenses).forEach((dayEntries) => {
    let dayTotal = 0;

    dayEntries.forEach((entry) => {
      const cat = entry.category || "Other";
      categoryTotals[cat] = (categoryTotals[cat] || 0) + entry.amount;
      grandTotal += entry.amount;
      dayTotal += entry.amount;
    });

    // Daily behavior
    if (dayTotal > 1000) impulseScore += 10;
    if (dayTotal < 200 && dayTotal > 0) disciplineScore += 5;

    if (dayTotal > 1200) highDays++;
    if (dayTotal > 0 && dayTotal <= 300) lowDays++;
  });

  // Category concentration
  let topCategory = null;
  let topAmount = 0;

  Object.entries(categoryTotals).forEach(([cat, total]) => {
    if (total > topAmount) {
      topAmount = total;
      topCategory = cat;
    }
  });

  if (grandTotal > 0 && topAmount / grandTotal > 0.5) {
    overspendScore += 20;
  }

  // Consistency bonus
  if (lowDays >= 10) disciplineScore += 15;

  return {
    impulseScore,
    overspendScore,
    disciplineScore,
    topCategory,
    grandTotal,
  };
}