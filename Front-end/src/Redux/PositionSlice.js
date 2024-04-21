import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const fetchPositionData = createAsyncThunk('potisions/fetchPositionData', async () => {
    try {
        const res = await axios.get('http://localhost:3001/position/api/allPosition', { withCredentials: true })
        return res.data;
    } catch (error) {
        return error.message;
    }
})

const positionSlice = createSlice({
    name: 'positions',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchPositionData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchPositionData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchPositionData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default positionSlice.reducer;
