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

    const trackings = useSelector(state => state.tracking);
    // filter : 
    const fetchAll = async () => {
        try {
            await dispatch(fetchTrackingData());
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
    const [filtredData, setFiltredData] = useState([])
    let dateValue
    if ((startDate && endDate) === '') {
        dateValue = ''
    } else {
        dateValue = [startDate, endDate]
    }
    const handeleFilter = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:3001/tracks/api/filter',
                {
                    code: equipment,
                    employee_name: employee,
                    atelier_name: atelier,
                    created_date: dateValue,

                }
            )
            setFiltredData(res.data)
            // console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handelReset = () => {
        setAtelier('')
        setEmployee('')
        setEquipment('')

    }
    // date : 
    return (
        <div className='ml-20 pt-3 h-screen'>
            <form onSubmit={handeleFilter}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">

                            <div className='sm:col-span-3'>
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nom :
                                </label>
                                <div className="relative mt-1.5">
                                    <input
                                        value={employee}
                                        onChange={e=>setEmployee(e.target.value)}
                                        type="text"
                                        list="employeeName"
                                        id="HeadlineAct"
                                        className="w-72 rounded border border-gray-300 pe-10 p-1 text-gray-700 sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                                        placeholder="Nom ..."
                                    />
                                </div>
                                <datalist name="HeadlineAct" id="employeeName">
                                    {
                                        employees.data && employees.data.map(employee => {
                                            return (
                                                <option value={employee.employee_name} key={employee.employee_id}>{employee.employee_name}</option>
                                            )
                                        })
                                    }
                                </datalist>
                            </div>

                            <div className='sm:col-span-3'>
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Code :
                                </label>
                                <div className="relative mt-1.5">
                                    <input
                                        value={equipment}
                                        onChange={e => setEquipment(e.target.value)}
                                        type="text"
                                        list="equipments"
                                        id="HeadlineAct"
                                        className="w-72 rounded border border-gray-300 pe-10 p-1 text-gray-700 sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                                        placeholder="Code ..."
                                    />
                                </div>
                                <datalist name="HeadlineAct" id="equipments">
                                    {

                                        equipments.data && equipments.data.map(equipment => {
                                            return (

                                                <option value={equipment.equipment_code} key={equipment.equipment_id}>{equipment.code}</option>
                                            )
                                        })
                                    }
                                </datalist>
                            </div>
                            <div className="col-span-full">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Désignation : 
                                </label>
                                <div className="relative mt-1.5">
                                    <input
                                        value={atelier}
                                        onChange={e => setAtelier(e.target.value)}
                                        type="text"
                                        list="ateliers"
                                        id="HeadlineAct"
                                        className="w-72 rounded border border-gray-300 pe-10 p-1 text-gray-700 sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0"
                                        placeholder="désignation ..."
                                    />
                                </div>
                                <datalist name="HeadlineAct" id="ateliers">
                                    {

                                        ateliers.data && ateliers.data.map(atelier => {
                                            return (

                                                <option value={atelier.atelier_name} key={atelier.atelier_id}>{atelier.atelier_name}</option>
                                            )
                                        })
                                    }
                                </datalist>
                                
                                
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    A partir :
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
                                    a :
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
                                    onClick={() => handelReset()}
                                    type="reset"
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Annuler
                                </button>
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


            {
                filtredData.length === 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border " id='trackingTable'>
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">code</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">ref</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">article</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">nom</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">destination</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">position</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">quantity</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {

                                    trackings.data && trackings.data.map(tracking => {
                                        return (
                                            <tr key={tracking.id}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tracking.code}</td>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tracking.ref}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.equipment_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.employee_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.atelier_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.position_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.quantity}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.created_date}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border " id='trackingTable'>
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">code</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">ref</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">article</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">nom</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">destination</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">position</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">quantity</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {

                                    filtredData && filtredData.map(tracking => {
                                        return (
                                            <tr key={tracking.id}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tracking.code}</td>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tracking.ref}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.equipment_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.employee_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.atelier_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.position_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.quantity}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.created_date}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                )
            }
            <button
                className="group relative inline-flex items-center overflow-hidden rounded bg-green-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-green-500 mt-3"
                onClick={() => exportToExcel()}
            >
                <span className="absolute -end-full transition-all group-hover:end-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.75 6.75h-3a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3h7.5a3 3 0 0 0 3-3v-7.5a3 3 0 0 0-3-3h-3V1.5a.75.75 0 0 0-1.5 0v5.25Zm0 0h1.5v5.69l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V6.75Z" clipRule="evenodd" />
                        <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
                    </svg>

                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4"> Exporter </span>
            </button>
        </div>
    )
}
