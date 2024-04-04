import { configureStore } from "@reduxjs/toolkit";
import TrackingSlice from "./TrackingSlice";
import EmployeeSlice from "./EmployeeSlice";
import AtelierSlice from "./AtelierSlice";
import EquipmentSlice from "./EquipmentSlice";


const store = configureStore({
    reducer: {
        tracking: TrackingSlice,
        employees: EmployeeSlice,
        ateliers: AtelierSlice,
        equipments : EquipmentSlice
    }
})

export default store;