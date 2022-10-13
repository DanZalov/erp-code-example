import { createSlice } from '@reduxjs/toolkit'

const currentFullDate = new Date()
const currentDate = currentFullDate.getDate()
const currentMonth = currentFullDate.getMonth() + 1
const currentYear = currentFullDate.getFullYear()
const daysInMonth = new Date(
  currentFullDate.getFullYear(),
  currentMonth,
  0
).getDate()

const initialState = {
  date: currentDate,
  month: currentMonth,
  year: currentYear,
  daysInMonth,
  fullDate: currentFullDate.toDateString(),
}

export const dateSlice = createSlice({
  name: 'dateInfo',
  initialState,
  reducers: {},
})

export const dateReducer = dateSlice.reducer
