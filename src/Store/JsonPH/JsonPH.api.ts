import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IServerData } from '../../models'

export const jsonphApi = createApi({
  reducerPath: 'jsonph/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com/',
  }),
  endpoints: (build) => ({
    getTodos: build.query<IServerData[], number>({
      query: (limit: number = 20) => ({
        url: 'todos',
        params: {
          _limit: limit,
        },
      }),
    }),
  }),
})

export const { useGetTodosQuery, useLazyGetTodosQuery } = jsonphApi
