import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const fetchAtelierData = createAsyncThunk('ateliers/fetchAtelierData', async () => {
    try {
        const res = await axios.get('http://localhost:3001/atelier/api/allAtelier', { withCredentials: true })
        return res.data;
    } catch (error) {
        return error.message;
    }
})

const atelieSlice = createSlice({
    name: 'ateliers',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchAtelierData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchAtelierData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchAtelierData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default atelieSlice.reducer;
