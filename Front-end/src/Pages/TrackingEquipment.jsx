import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrackingData } from '../Redux/TrackingSlice'
import { fetchEmployeeData } from '../Redux/EmployeeSlice'
import { fetchEquipmentData } from '../Redux/EquipmentSlice'
import { fetchAtelierData } from '../Redux/AtelierSlice'
import * as XLSX from 'xlsx';
import axios from 'axios'
// execel 
const exportToExcel = () => {
    const table = document.getElementById('trackingTable');
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'tracking_data.xlsx');
};
export default function TrackingEquipment() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTrackingData());
    }, [])
    const trackings = useSelector(state => state.tracking);
    // filter : 
    const fetchAll = async () => {
        try {
            await dispatch(fetchEmployeeData());
            await dispatch(fetchEquipmentData());
            await dispatch(fetchAtelierData());
        } catch (error) {
            console.error('Failed to fetch all data:', error);
        }
    };
    useEffect(() => {
        fetchAll()
    }, [])
    const employees = useSelector(state => state.employees);
    const equipments = useSelector(state => state.equipments);
    const ateliers = useSelector(state => state.ateliers)
    const [employee, setEmployee] = useState('')
    const [equipment, setEquipment] = useState('')
    const [atelier, setAtelier] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const handeleFilter = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3001/tracks/api/filter',
                {
                    "equipment_id": equipment,
                    "employee_id": employee,
                    "atelier_id": atelier,
                    "date_issued": [startDate, endDate]
            })
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='ml-20 pt-3 h-screen'>
            <h1>Filter : </h1>
            <form onSubmit={handeleFilter}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                            <div className="sm:col-span-3 ">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Employee Name
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={e => setEmployee(e.target.value)}
                                        value={employee}
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option >Select A Name</option>
                                        {

                                            employees.data && employees.data.map(employee => {
                                                return (
                                                    <option value={employee.employee_id} key={employee.employee_id}>{employee.employee_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>


                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Equipment Name
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={e => setEquipment(e.target.value)}
                                        value={equipment}
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Select Equipment</option>
                                        {

                                            equipments.data && equipments.data.map(equipment => {
                                                return (

                                                    <option value={equipment.equipment_id} key={equipment.equipment_id}>{equipment.equipment_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Atelier
                                </label>
                                <div className="mt-2">
                                    <select
                                        onChange={e => setAtelier(e.target.value)}
                                        value={atelier}
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option>Select Atelier</option>
                                        {

                                            ateliers.data && ateliers.data.map(atelier => {
                                                return (

                                                    <option value={atelier.atelier_id} key={atelier.atelier_id}>{atelier.atelier_name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    From :
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={e => setStartDate(e.target.value)}
                                        type="date"
                                        name="startDate"
                                        id=""
                                        // value={startDate}
                                        autoComplete=""
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    To :
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={e => setEndDate(e.target.value)}
                                        type="date"
                                        name="endDate"
                                        id=""
                                        // value={endDate}
                                        autoComplete=""
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="mt-6 flex items-center justify-center gap-x-6">

                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <hr />
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border " id='trackingTable'>
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">code</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">equipment_name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">atelier_name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">employee_name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">date_issued</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">quantity_issued</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {

                            trackings.data && trackings.data.map(tracking => {
                                return (
                                    <tr key={tracking.id}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tracking.code}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.equipment_name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.atelier_name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.employee_name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.date_issued}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.quantity_issued}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => exportToExcel()}
                type="submit"
                className="rounded-md bg-red-600 px-3 py-2 text-sm 
                        font-semibold text-white shadow-sm hover:bg-red-500 
                        focus-visible:outline focus-visible:outline-2 
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
            >
                Download
            </button>
        </div>
    )
}
