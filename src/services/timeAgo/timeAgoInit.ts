const dateFormater = new Intl.DateTimeFormat("en", {
  day: "numeric",
  minute: "numeric",
  month: "long",
  hour: "numeric",
});

export const formatTime = (date: number) => {
  return dateFormater.format(date);
};
