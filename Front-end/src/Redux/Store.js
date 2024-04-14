import { configureStore } from "@reduxjs/toolkit";
import TrackingSlice from "./TrackingSlice";
import EmployeeSlice from "./EmployeeSlice";
import AtelierSlice from "./AtelierSlice";
import EquipmentSlice from "./EquipmentSlice";
import SingleEquipmentSlice from "./SingleEquipmentSlice";
import SingleEmployee from "./SingleEmployee";


const store = configureStore({
    reducer: {
        singleEmployee : SingleEmployee,
        tracking: TrackingSlice,
        employees: EmployeeSlice,
        ateliers: AtelierSlice,
        equipments: EquipmentSlice,
        singleEquipment: SingleEquipmentSlice
        
    }
})

export default store;