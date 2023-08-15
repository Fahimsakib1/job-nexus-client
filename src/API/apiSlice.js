import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const jobsAPI = createApi({
    reducerPath: 'getJobs',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000',
    }),
    tagTypes: ['Jobs'],

    endpoints: (builder) => (
        {
            getAllJobs: builder.query({
                query: () => ({
                    url: '/allJobs'
                }),
                providesTags: ['Jobs'],
            }),

            addJob: builder.mutation({
                query: (data) => ({
                    url: '/addJob',
                    method: 'POST',
                    body: data,
                    headers: {
                        'Content-type': 'application/json',
                    },
                }),
                invalidatesTags: ['Jobs']
            }),


            deleteJob: builder.mutation({
                query: (id) => ({
                    url: `/job/${id}`,
                    method: 'DELETE'
                }),
                invalidatesTags: ['MyJobs']
            }),
            
        }
    )
})


export const { useGetAllJobsQuery, useAddJobMutation, useDeleteJobMutation} = jobsAPI;