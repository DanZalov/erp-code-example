import { configureStore } from '@reduxjs/toolkit'
import { customerReducer } from './Slices/customer.slice'
import { dateReducer } from './Slices/date.slice'
import { jsonphApi } from './JsonPH/JsonPH.api'
import { jsonphReduser } from './JsonPH/JsonPH.slice'
import { projectListReducer } from './Slices/projects.slice'
import { TTDatabaseApi } from './TTDatabase/TTDatabase.api'

export const store = configureStore({
  reducer: {
    [jsonphApi.reducerPath]: jsonphApi.reducer,
    [TTDatabaseApi.reducerPath]: TTDatabaseApi.reducer,
    jsonph: jsonphReduser,
    projectList: projectListReducer,
    date: dateReducer,
    customer: customerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     // ignoredActions: ['TYPE'],
    //     // ignoredActionPaths: ['customerActions'],
    //     // ignoredPaths: ['customer'],
    //   },
    // })
    getDefaultMiddleware()
      .concat(jsonphApi.middleware)
      .concat(TTDatabaseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
