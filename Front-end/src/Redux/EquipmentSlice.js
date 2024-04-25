import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const fetchEquipmentData = createAsyncThunk('equipments/fetchEquipmentData', async () => {
    try {
        const res = await axios.get(`http://localhost:3001/equipment/api/getAllEquipments`,{ withCredentials: true })
        return res.data;
    } catch (error) {
        return error.message;
    }
})

const equipmentSlice = createSlice({
    name: 'equipments',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchEquipmentData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchEquipmentData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchEquipmentData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default equipmentSlice.reducer;
