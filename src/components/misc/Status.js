export function statusIcon(currentP, maxP, status, timeStart, timeEnd) {
  if (status) {
    return "grey";
  }

  if (maxP && currentP >= maxP) {
    return "red";
  } else {
    const now = new Date();
    if (now > timeStart) {
      return "red";
    } else {
      return "lime";
    }
  }
}
