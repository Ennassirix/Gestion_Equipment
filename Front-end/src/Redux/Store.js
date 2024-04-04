import { configureStore } from "@reduxjs/toolkit";
import TrackingSlice from "./TrackingSlice";


const store = configureStore({
    reducer: {
        tracking : TrackingSlice
    }
})

export default store;