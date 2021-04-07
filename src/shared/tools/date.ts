function dateNowFormatted() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because in getMonth January starts with zero.
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const day = (date: Date): string => date.getDate().toString().padStart(2, '0');

const month = (date: Date): string =>
  (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because in getMonth January starts with zero.

function dateAndHoursNowFormatted() {
  const date = new Date();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return `${dateNowFormatted()} ${hour}:${minute}:${second}`;
}

const addDays = (date: Date, days: number): Date => {
  const dateNew = new Date(date.valueOf());
  dateNew.setDate(dateNew.getDate() + days);
  return dateNew;
};

export default {
  dateNowFormatted,
  day,
  month,
  dateAndHoursNowFormatted,
  addDays,
};
