import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const fetchSingleEquipmentData = createAsyncThunk('singleEquipment/fetchSingleEquipmentData', async (id) => {
    try {
        const res = await axios.get(`http://localhost:3001/equipment/api/getAnEquipment/${id}`, { withCredentials: true })
        return res.data;
    } catch (error) {
        return error.message;
    }
})

const singleEquipmentSlice = createSlice({
    name: 'singleEquipment',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchSingleEquipmentData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSingleEquipmentData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchSingleEquipmentData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default singleEquipmentSlice.reducer;
