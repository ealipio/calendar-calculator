import { mountInDOM, createDOMElements, resetElement } from './dom-utility'
import {
  getAllowedMonths,
  getWeekInMonth,
  calculateMonthRange,
  buildHead,
  buildWeeks,
  isValid} from './date-utility'

export const buildCalendar = (settings) => {
  const canvas = document.querySelector('#calendar-canvas')
  if (isValid(settings)) {
    resetElement(canvas)
    const months = buildMonths(settings)
    mountInDOM(months, canvas)
  } else {
    alert('Multi Year is not implemented yet')
  }
}

const buildMonths = ({startDate, daysAmount}) => {
  const {year, month, day} = startDate
  const {myDate, nextDate} = calculateMonthRange(year, month, day, daysAmount)
  const allowedMonths = getAllowedMonths(month, nextDate)
  return allowedMonths.map(month => {
    const [table, thead, tbody] = createDOMElements(['table', 'thead', 'tbody'])
    thead.innerHTML = buildHead({ month, year })
    // get weeks for a given month
    const calendar = getWeekInMonth(year, month, myDate, nextDate)
    const weeks = buildWeeks(calendar)
    mountInDOM(weeks, tbody)
    mountInDOM([tbody], table)
    mountInDOM([thead], table)
    return table
  })
}
