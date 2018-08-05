import {
  getValue
} from './dom-utility'

import {
  buildStartDate
} from './date-utility'

const generateCalendar = () => {
  const startDateValue = getValue('#start-date')
  const daysAmount = getValue('#days-amount')
  const startDate = buildStartDate(startDateValue)
  console.log({startDate, daysAmount})
}

const startUp = () => {
  document.querySelector('#generate-calendar')
    .addEventListener('click', generateCalendar)
}

document.addEventListener('DOMContentLoaded', startUp)
