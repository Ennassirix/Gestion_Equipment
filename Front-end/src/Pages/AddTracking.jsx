import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeData } from '../Redux/EmployeeSlice'
import { fetchEquipmentData } from '../Redux/EquipmentSlice'
import { fetchAtelierData } from '../Redux/AtelierSlice'
import axios from "axios";
import SuccessPopUp from '../Components/SuccessPopUp'
import ErrorPopUp from '../Components/ErrorPopUp'
export default function AddTracking() {
    const dispatch = useDispatch()
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
    // handeleSubmit
    const [employee, setEmployee] = useState('')
    const [equipment, setEquipment] = useState('')
    const [atelier, setAtelier] = useState('')
    const [quantity, setQauntity] = useState('')
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false)
    const handeleSubmet = async e => {
        e.preventDefault()
        try {
            if (employee === '') {
                setError('sélectionnez le nom dun employé')
                setErrorPopUp(true)
            } else if (equipment === '') {
                setError('sélectionnez un equipment')
                setErrorPopUp(true)
            } else if (atelier === '') {
                setError('sélectionnez un atelier')
                setErrorPopUp(true)
            } else if (quantity === '') {
                setError('la quantité ne doit pas être vide')
                setErrorPopUp(true)
            } else {
                try {
                    const res = await axios.post('http://localhost:3001/tracks/api/createTrack',
                        {
                            equipment_id: equipment,
                            employee_id: employee,
                            atelier_id: atelier,
                            quantity_issued: quantity
                        })
                    if (res.status === 200) {
                        setShowPopUp(true)
                        setErrorPopUp(false)
                        setAtelier('')
                        setEmployee('')
                        setQauntity('')
                        setEquipment('')
                    } else {
                        setError('Check quantity')
                    }
                } catch (error) {
                    console.error(error)
                    setError('check qts')
                    setErrorPopUp(true)
                }
            }
        } catch (error) {
            setError('Check qts')
            setErrorPopUp(true)
        }
    }
    return (
        <div className='ml-20 p-3'>
            {
                showPopUp && <SuccessPopUp/>
            }
            {
                errorPopUp && <ErrorPopUp error={error}/>
            }
            <form onSubmit={handeleSubmet}>
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
                                    quantity
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={e => setQauntity(e.target.value)}
                                        value={quantity}
                                        type="number"
                                        name="postal-code"
                                        id="postal-code"
                                        autoComplete="postal-code"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <button type="reset" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
