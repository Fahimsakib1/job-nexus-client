import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import { jobsAPI } from "../API/apiSlice";



const store = configureStore({
    reducer : {
        //for adding the jobsAPI to the store
        [jobsAPI.reducerPath]: jobsAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(jobsAPI.middleware)
})

export default store;