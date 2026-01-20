function chooseDifficulty(score) {
  if (score >= 80) return "hard";
  if (score >= 50) return "medium";
  return "easy";
}

function aiMessage(score) {
  if (score >= 80) return "Excellent! AI recommends harder tests.";
  if (score >= 50) return "Good job! AI suggests more practice.";
  return "AI says: Revise basics and try again.";
}
