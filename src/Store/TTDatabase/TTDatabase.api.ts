import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import {
  IBudget,
  IChargeLine,
  ICustomer,
  IEmployee,
  ILoginData,
  IProject,
} from '../../models'

export const TTDatabaseApi = createApi({
  reducerPath: 'TTDatabase/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://website.ru/',
    // baseUrl: 'http://localhost:5000/',
  }),
  endpoints: (build) => ({
    postUser: build.mutation<string, IEmployee>({
      // postUser: build.mutation<string, IPost>({
      query: (post) => ({
        // mode: 'no-cors',
        url: 'Employee/Add',
        // url: 'posts',
        method: 'POST',
        body: post,
      }),
    }),
    postCustomer: build.mutation<string, ICustomer>({
      query: (post) => ({
        url: 'Employee/Add',
        method: 'POST',
        body: post,
      }),
    }),
    postProject: build.mutation<string, IProject>({
      query: (post) => ({
        url: 'Employee/Add',
        method: 'POST',
        body: post,
      }),
    }),
    postBudget: build.mutation<string, IBudget>({
      query: (post) => ({
        url: 'Employee/Add',
        method: 'POST',
        body: post,
      }),
    }),
    postChargeline: build.mutation<string, IChargeLine>({
      query: (post) => ({
        url: 'Employee/Add',
        method: 'POST',
        body: post,
      }),
    }),
    postAuth: build.mutation<string, ILoginData>({
      query: (post) => ({
        url: 'Employee/Add',
        method: 'POST',
        body: post,
      }),
    }),
    getSmth: build.query<string, void>({
      query: () => ({
        url: 'Event/Types',
      }),
    }),
  }),
})

export const {
  usePostUserMutation,
  usePostCustomerMutation,
  usePostProjectMutation,
  usePostBudgetMutation,
  usePostChargelineMutation,
  usePostAuthMutation,
  useLazyGetSmthQuery,
} = TTDatabaseApi
