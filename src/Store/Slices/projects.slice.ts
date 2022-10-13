import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProjectTime } from '../../models'

interface ProjectListState {
  projectList: IProjectTime[]
}

const initialState: ProjectListState = {
  projectList: [
    {
      projectName: 'First Example Project',
      regTime: '',
      overTime: '',
      id: 1,
    },
    {
      projectName: 'Second Example Project',
      regTime: '',
      overTime: '',
      id: 2,
    },
    {
      projectName: 'Third Example Project',
      regTime: '',
      overTime: '',
      id: 3,
    },
  ],
}

interface enterTimeProps {
  id: number
  value: string
}

export const projectListSlice = createSlice({
  name: 'projectList',
  initialState,
  reducers: {
    enterRegTime(state, action: PayloadAction<enterTimeProps>) {
      state.projectList.map((project) => {
        if (project.id === action.payload.id) {
          project.regTime = action.payload.value
        }
      })
    },
    enterOverTime(state, action: PayloadAction<enterTimeProps>) {
      state.projectList.map((project) => {
        if (project.id === action.payload.id) {
          project.overTime = action.payload.value
        }
      })
    },
  },
})

export const projectListActions = projectListSlice.actions
export const projectListReducer = projectListSlice.reducer
