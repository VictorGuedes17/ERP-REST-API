export const getCurrentMonth = (): { startOf: string, endOf: string} => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const formatMonth = month < 10 ? `0${month}` : month;

  const lastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate();
  const firstDayOfMonth = '01';

  return {
    startOf: `${year}-${formatMonth}-${firstDayOfMonth}`,
    endOf: `${year}-${formatMonth}-${lastDayOfMonth}`
  }
}
