import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    data: [],
    loading: false,
    error: ''
}

export const fetchEmployeeData = createAsyncThunk('employees/fetchEmployeeData', async () => {
    try {
        const res = await axios.get('http://localhost:3001/employees/api/allEmployees', { withCredentials: true })
        return res.data;
    } catch (error) {
        return error.message;
    }
})

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    extraReducers(builder) {
        builder.addCase(fetchEmployeeData.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchEmployeeData.fulfilled, (state, action) => {
            state.loading = false
            state.data = action.payload
        })
        builder.addCase(fetchEmployeeData.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        })
    }
})

export default employeeSlice.reducer;
