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



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Dashboard />}>
            <Route path="/" element={<App />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/trackingList' element={<TrackingEquipment />} />
            <Route path='/addTracking' element={<AddTracking />} />
            <Route path='/atelier' element={<Atetlier/>} />
            <Route path='/equipments' element={<Equipments />} />
            <Route path='/equiment/update/:id' element={<UpdateEquipment/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
