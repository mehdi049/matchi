import {
  CalendarDate,
  CalendarDateTime,
  parseDate,
} from '@internationalized/date'

import dayjs from 'dayjs'
import 'dayjs/locale/fr'

dayjs.locale('fr')

export const dateConverterInput = (date: Date) => {
  try {
    date = new Date(date)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const dateConverted = new CalendarDate(year, month, day)
    return parseDate(dateConverted.toString()).toString()
  } catch (error) {
    console.log(error, date)
    return undefined
  }
}

export const timeStringToDatetime = (selectedDate: Date, time: string) => {
  try {
    const date = new Date(selectedDate)

    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    let calendarDateTime = new CalendarDateTime(
      year,
      month,
      day,
      parseInt(time.split(':')[0]),
      parseInt(time.split(':')[1])
    )
    return calendarDateTime.toString()
  } catch (error) {
    console.log(error, selectedDate + ' ' + time)
    return undefined
  }
}

export const fullDate = (date: Date, locale = 'fr') => {
  try {
    return dayjs(date).format('dddd D MMM YYYY')
  } catch (error) {
    console.log(error)
    return ''
  }
}
