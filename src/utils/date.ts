import { CalendarDate, parseDate } from '@internationalized/date'

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
