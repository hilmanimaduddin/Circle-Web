export function newDate() {
  const d = new Date();
  let dat = d.getDate();
  let year = d.getFullYear();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let month = months[d.getMonth()];

  let date = day + ", " + dat + " " + month + " " + year;

  return date;
}
