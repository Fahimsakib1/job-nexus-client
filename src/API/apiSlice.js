import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// https://job-nexus-server.vercel.app

export const jobsAPI = createApi({
    reducerPath: 'getJobs',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://job-nexus-server.vercel.app',
    }),
    tagTypes: ['Jobs'],

    endpoints: (builder) => (
        {
            getAllJobs: builder.query({
                query: () => ({
                    url: '/allJobs', 
                    headers: {
                        authorization: `bearer ${localStorage.getItem('JobNexusToken')}`
                    },
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
                        authorization: `bearer ${localStorage.getItem('JobNexusToken')}`
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

            updateJob: builder.mutation({
                query: (job) => ({
                    url: `/updateJob/${job.id}`,
                    method: 'PUT',
                    body: job,
                    headers: {
                        'Content-type': 'application/json',
                        authorization: `bearer ${localStorage.getItem('JobNexusToken')}`
                    },
                }),
                invalidatesTags: ['Jobs']
            }),
            
        }
    )
})


export const { useGetAllJobsQuery, useAddJobMutation, useDeleteJobMutation, useUpdateJobMutation} = jobsAPI;