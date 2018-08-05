export const buildStartDate = (date) => {
  let [month = 8, day = 1, year = 2018] = date.split('/').map(i => parseInt(i))
  return {
    month: --month,
    day,
    year
  }
}
