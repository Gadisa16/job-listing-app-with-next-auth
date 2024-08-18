import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { jobsApi } from "./getApi";

export const store = configureStore({
    reducer: {
        [jobsApi.reducerPath]: jobsApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jobsApi.middleware),
})

setupListeners(store.dispatch)