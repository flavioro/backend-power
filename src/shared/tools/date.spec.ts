import date from './date';

describe('should be able to return date now formatted, day, month and date and hours now formatted', () => {
  it('Success date now formatted dd/mm/yyyy', async () => {
    const dateNow = date.dateNowFormatted();

    const dateToday = new Date();
    const day = dateToday.getDate().toString().padStart(2, '0');
    const month = (dateToday.getMonth() + 1).toString().padStart(2, '0'); // +1 because in getMonth January starts with zero.
    const year = dateToday.getFullYear();

    expect(dateNow).toContain(day);
    expect(dateNow).toContain(month);
    expect(dateNow).toContain(year);
    expect(dateNow).toEqual(`${day}/${month}/${year}`);
  });

  it('Err date now formatted dd/mm/yyyy', async () => {
    const dateNow = date.dateNowFormatted();

    const dateToday = new Date();
    const day = dateToday.getDate().toString().padStart(2, '0');
    const month = (dateToday.getMonth() + 1).toString().padStart(2, '0'); // +1 because in getMonth January starts with zero.
    const year = dateToday.getFullYear();

    expect(dateNow).toContain(day);
    expect(dateNow).toContain(month);
    expect(dateNow).toContain(year);
    expect(dateNow).not.toEqual(`${day + 1}/${month}/${year}`);
  });

  it('Success date now formatted dd/MM/yyyy HH:mm:ss', async () => {
    const dateNow = date.dateAndHoursNowFormatted();

    const dateToday = new Date();
    const hour = dateToday.getHours();
    const minute = dateToday.getMinutes();
    const second = dateToday.getSeconds();

    expect(dateNow).toContain(hour);
    expect(dateNow).toContain(minute);
    expect(dateNow).toContain(second);
  });

  it('Success add days to date', async () => {
    const dateToday = new Date(2020, 10, 4);

    const dateNew = date.addDays(dateToday, 10);

    expect(dateNew).toStrictEqual(new Date('2020-11-14T03:00:00.000Z'));
  });
});
