export function statusIcon(currentP, maxP, status) {
  const ratio = currentP / maxP;

  if (status) {
    return "red"
  }

  if (!maxP) {
    return "green"
  }

  if (ratio >= 1) {
    return "red";
  }
  if (ratio > 0.8) {
    return "yellow";
  }
  return "green";
}