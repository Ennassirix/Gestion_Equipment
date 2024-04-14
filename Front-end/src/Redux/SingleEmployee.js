import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const fetchSingleEmployeeData = createAsyncThunk('singleEmployee/fetchSingleEmployeeData', async (id) => {
    try {
        const res = await axios.get(`http://localhost:3001/employees/api/employee/${id}`, { withCredentials: true })
        return res.data;
    } catch (error) {
        return error.message;
    }
})

const singleEmployeeSlice = createSlice({
    name: 'singleEmployee',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchSingleEmployeeData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchSingleEmployeeData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchSingleEmployeeData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default singleEmployeeSlice.reducer;
