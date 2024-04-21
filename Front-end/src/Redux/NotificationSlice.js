import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const fetchNotificationData = createAsyncThunk('employees/fetchNotificationData', async () => {
    try {
        const res = await axios.get('http://localhost:3001/equipment/api/notification', { withCredentials: true })
        return res.data;
    } catch (error) {
        return error.message;
    }
})

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchNotificationData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchNotificationData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchNotificationData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default notificationSlice.reducer;
