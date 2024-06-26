import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Employees from './Pages/Employees.jsx'
import Dashboard from './Components/Dashboard.jsx'
import TrackingEquipment from './Pages/TrackingEquipment.jsx'
import AddTracking from './Pages/AddTracking.jsx'
import { Provider } from 'react-redux'
import store from './Redux/Store.js'
import Atetlier from './Pages/Atetlier.jsx'
import Equipments from './Pages/Equipments.jsx'
import UpdateEquipment from './Pages/UpdateEquipment.jsx'
import { AnimatePresence } from "framer-motion";
import UpdateEmployees from './Pages/UpdateEmployees.jsx'
import UpdateAtelier from './Pages/UpdateAtelier.jsx'
import Position from './Pages/Position.jsx'
import Notification from './Pages/Notification.jsx'
import UpdateQuantity from './Pages/UpdateQuantity.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AnimatePresence>

      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<Dashboard />}>
              <Route path="/" element={<App />} />
              <Route path='/employees' element={<Employees />} />
              <Route path='/trackingList' element={<TrackingEquipment />} />
              <Route path='/addTracking' element={<AddTracking />} />
              <Route path='/atelier' element={<Atetlier />} />
              <Route path='/equipments' element={<Equipments />} />
              <Route path='/positions' element={<Position/>} />
              <Route path='/equiment/update/:id' element={<UpdateEquipment />} />
              <Route path='/employees/update/:id' element={<UpdateEmployees />} />
              <Route path='/atelier/update/:id' element={<UpdateAtelier/>} />
              <Route path='/update/quantity/:id' element={<UpdateQuantity/>} />
              <Route path='/notifications' element={<Notification/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </AnimatePresence>
  </React.StrictMode>,
)
