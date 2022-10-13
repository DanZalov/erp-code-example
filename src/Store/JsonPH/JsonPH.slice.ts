import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IServerData, IServerDataState } from '../../models'

const initialData: IServerData[] = [
  {
    userId: 1,
    id: 1,
    title: 'delectus aut autem',
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
  },
]

const initialState: IServerDataState = {
  dataVisible: false,
  dataList: initialData,
  modalDataList: initialData,
}

export const jsonphSlice = createSlice({
  name: 'jsonph',
  initialState,
  reducers: {
    showTable(state) {
      state.dataVisible = true
    },
    addData(state, action: PayloadAction<IServerData[]>) {
      state.dataList = action.payload
    },
    addModalData(state, action: PayloadAction<IServerData[]>) {
      state.modalDataList = action.payload
    },
  },
})

export const jsonphActions = jsonphSlice.actions
export const jsonphReduser = jsonphSlice.reducer
