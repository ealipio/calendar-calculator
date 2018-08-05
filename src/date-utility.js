import { mountInDOM, createDOMElements } from './dom-utility'

export const buildStartDate = (date) => {
  let [month = 8, day = 1, year = 2018] = date.split('/').map(i => parseInt(i))
  return {
    month: --month,
    day,
    year
  }
}

export const getAllowedMonths = (month, nextDate) => {
  const monthsInYear = 12
  return Array.from(Array(monthsInYear).keys(), n => ++n).slice(month - 1, nextDate.getMonth())
}

export const calculateMonthRange = (year, month, day, daysAmount) => {
  const myDate = new Date(year, month, day)
  const nextDate = new Date(year, month, day)
  nextDate.setDate(nextDate.getDate() + parseInt(daysAmount) - 1)
  return {myDate, nextDate}
}

const buildDays = (week) => {
  return week.map(day => {
    const [td] = createDOMElements(['td'])
    td.textContent = day.date.getDate()
    day.before && td.classList.add('before')
    day.after && td.classList.add('after')
    day.weekend && td.classList.add('weekend')
    return td
  })
}

export const buildWeeks = (weeks) => {
  return weeks.map(week => {
    const [tr] = createDOMElements(['tr'])
    const days = buildDays(week)
    mountInDOM(days, tr)
    return tr
  })
}

export const buildHead = ({month, year}) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const weekDays = Array.from('SMTWTFS').join('</td><td>')
  return `<tr><td>${weekDays}</td></tr><tr><td colspan="7">${months[month]} ${year}</td></tr>`
}

export const getFirstSunday = (firstDate) => {
  var offset = firstDate.getDay()

  var result = new Date(firstDate)
  result.setDate(firstDate.getDate() - offset)

  return result
}

export const getLastSaturday = (lastDate) => {
  var offset = 6 - lastDate.getDay()

  var result = new Date(lastDate)
  result.setDate(lastDate.getDate() + offset)

  return result
}

export const getWeekInMonth = (year, month, myDate, nextDate) => {
  let results = []

  // find out first and last days of the month
  const firstDate = new Date(year, month, 1)
  const lastDate = new Date(year, month + 1, 0)

  // calculate first sunday and last saturday
  var firstSunday = getFirstSunday(firstDate)
  var lastSaturday = getLastSaturday(lastDate)

  // iterate days starting from first sunday
  let iterator = new Date(firstSunday)
  let i = 0
  let week

  // ..until last saturday
  while (iterator <= lastSaturday) {
    if (i++ % 7 === 0) {
      // start new week when sunday
      week = []
      results.push(week)
    }

    // push day to week
    week.push({
      date: new Date(iterator),
      before: iterator < myDate,
      after: iterator > nextDate,
      weekend: (iterator.getDay() === 0 || iterator.getDay() === 6) && ((iterator < firstDate) || (iterator < lastDate))
    })
    // before: iterator < firstDate, // add indicator if before current month
    // after: iterator > lastDate // add indicator if after current month
    iterator.setDate(iterator.getDate() + 1)
  }

  return results
}
