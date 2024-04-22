export function convertToLocalTime(
  isoString: string,
  fullDate: boolean = false
) {
  const date = new Date(isoString);

  if (fullDate) {
    // Format the date and time for Pakistan's timezone
    let LocalTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);

    return LocalTime;
  } else {
    // Format the date and time for Pakistan's timezone
    const LocalTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Karachi",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);

    const localIsoString = LocalTime.replace(/, /, "T");

    return localIsoString;
  }
}

export function formatNumber(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}
