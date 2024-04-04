import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const fetchTrackingData = createAsyncThunk('trackings/fetchTrackingData', async () => {
    try {
        const res = await axios.get('http://localhost:3001/tracks/api/getAllTrack',{withCredentials:true})
        return res.data;
    } catch (error) {
        return error.message;
    }
})

const trackingSlice = createSlice({
    name: 'tracking',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchTrackingData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchTrackingData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchTrackingData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default trackingSlice.reducer;
