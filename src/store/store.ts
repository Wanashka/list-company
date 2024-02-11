import { configureStore } from '@reduxjs/toolkit'
import companySlice from "./companySlice";

export default configureStore({
    reducer: {
        companySlice: companySlice,
    },
})
