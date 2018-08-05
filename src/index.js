import {
  getValue
} from './dom-utility'

import {
  buildStartDate
} from './date-utility'

import {
  buildCalendar
} from './calendar-utility'

const generateCalendar = () => {
  const startDateValue = getValue('#start-date')
  const daysAmount = parseInt(getValue('#days-amount'))
  const startDate = buildStartDate(startDateValue)
  buildCalendar({startDate, daysAmount})
}

const startUp = () => {
  document.querySelector('#generate-calendar')
    .addEventListener('click', generateCalendar)
}

document.addEventListener('DOMContentLoaded', startUp)
