const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function formatDate(date?: Date) {
  if (!date) {
    return "";
  }

  return dateFormatter.format(date);
}

