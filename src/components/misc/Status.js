export function statusIcon(currentP, maxP, status, timeStart, timeEnd) {
  if (status) {
    return "grey";
  }

  if (maxP && currentP >= maxP) {
    return "red";
  } else {
    const now = new Date();
    const start = new Date(timeStart);

    if (now > start) {
      return "red";
    } else {
      return "lime";
    }
  }
}
