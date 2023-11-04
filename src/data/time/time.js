export function timeConv(time) {
  const timestamp = time;
  const dateObj = new Date(timestamp);
  const options = {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  return formattedDate;
}

export function timeConvMini(time) {
  const timestamp = time;
  const dateObj = new Date(timestamp);
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();
  const formattedHour = hour.toString().padStart(2, "0");
  const formattedMinute = minute.toString().padStart(2, "0");

  return `${formattedHour}.${formattedMinute}`;
}
