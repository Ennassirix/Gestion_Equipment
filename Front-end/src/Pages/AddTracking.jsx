import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeData } from '../Redux/EmployeeSlice'
import { fetchEquipmentData } from '../Redux/EquipmentSlice'
import { fetchAtelierData } from '../Redux/AtelierSlice'
import axios from "axios";
import SuccessPopUp from '../Components/SuccessPopUp'
import ErrorPopUp from '../Components/ErrorPopUp'
import { fetchPositionData } from '@/Redux/PositionSlice'
export default function AddTracking() {
    const dispatch = useDispatch()
    const fetchAll = async () => {
        try {
            await dispatch(fetchEmployeeData());
            await dispatch(fetchEquipmentData());
            await dispatch(fetchAtelierData());
            await dispatch(fetchPositionData())
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
    const positions = useSelector(state => state.positions)

    // handeleSubmit
    const [employee, setEmployee] = useState('')
    const [atelier, setAtelier] = useState('')
    const [quantity, setQauntity] = useState('')
    const [code, setCode] = useState('')
    const [ref, setRef] = useState('')
    const [position, setPosition] = useState('')
    const [equipment, setEquipment] = useState('')


    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false)
    const handeleSubmet = async e => {
        e.preventDefault()
        try {
            if (code === '') {
                setError('sélectionnez le code')
                setErrorPopUp(true)
            } else if (ref === '') {
                setError('sélectionnez le ref')
                setErrorPopUp(true)
            } else if (equipment === '') {
                setError('sélectionnez un Article')
                setErrorPopUp(true)
            } else if (employee === '') {
                setError("sélectionnez le nom d'employee ")
                setErrorPopUp(true)
            } else if (atelier === '') {
                setError('sélectionnez la Destination')
                setErrorPopUp(true)
            } else if (position === '') {
                setError("sélectionnez la position d'article")
                setErrorPopUp(true)
            } else if (quantity === '') {
                setError('la quantité ne doit pas être vide')
                setErrorPopUp(true)
            } else {
                try {
                    const res = await axios.post('http://localhost:3001/tracks/api/createTrack',
                        {
                            code: code,
                            ref: ref,
                            equipment_name: equipment,
                            employee_name: employee,
                            atelier_name: atelier,
                            position_name: position,
                            quantity: quantity
                        })
                    if (res.status === 200) {
                        setShowPopUp(true)
                        setErrorPopUp(false)
                        setAtelier('')
                        setEmployee('')
                        setQauntity('')
                        setEquipment('')
                        setCode('')
                        setRef('')
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
    // filter search equipmetn :


    return (
        <div className='ml-20 p-3 bg-gray-100 h-screen'>
            {
                showPopUp && <SuccessPopUp />
            }
            {
                errorPopUp && <ErrorPopUp error={error} />
            }
            <form onSubmit={handeleSubmet}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-6">
                            
                            <div className="sm:col-span-3 mr-3">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    code
                                </label>
                                <div className="mt-2">
                                    <input list="codes" name="code" id="code"
                                        onChange={e => setCode(e.target.value)}
                                        value={code}
                                        className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <datalist id="codes"

                                    >
                                        {
                                            equipments.data && equipments.data.map(equipment => {
                                                return (
                                                    <option value={equipment.code} key={equipment.code}>{equipment.equipment_name}</option>
                                                )
                                            })
                                        }
                                    </datalist>
                                </div>
                            </div>
                            <div className="sm:col-span-3 mr-3">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    ref
                                </label>
                                <div className="mt-2">
                                    <input list="refs" name="ref" id="ref"
                                        onChange={e => setRef(e.target.value)}
                                        value={ref}
                                        className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <datalist id="refs"
                                        className=''
                                    >
                                        {
                                            equipments.data && equipments.data.map(equipment => {
                                                return (
                                                    <option value={equipment.ref} key={equipment.ref}>{equipment.equipment_name}</option>
                                                )
                                            })
                                        }
                                    </datalist>
                                </div>
                            </div>
                            <div className="sm:col-span-3 mr-3">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Article
                                </label>
                                <div className="mt-2">
                                    <input list="equipments" name="equipment" id="equipment"
                                        onChange={e => setEquipment(e.target.value)}
                                        value={equipment}
                                        className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <datalist id="equipments"
                                        className=''
                                    >
                                        {
                                            equipments.data && equipments.data.map(equipment => {
                                                return (
                                                    <option value={equipment.equipment_name} key={equipment.equipment_name}>{equipment.code}</option>
                                                )
                                            })
                                        }
                                    </datalist>
                                </div>
                            </div>

                            <div className="sm:col-span-3 mr-3" >
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nom
                                </label>
                                <div className="mt-2" >
                                    <input list="employees" name="employee" id="employee"
                                        onChange={e => setEmployee(e.target.value)}
                                        value={employee}
                                        className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <datalist id="employees"
                                        className=''

                                    >
                                        {
                                            employees.data && employees.data.map(employee => {
                                                return (
                                                    <option value={employee.employee_name} key={employee.employee_name}>{employee.employee_name}</option>
                                                )
                                            })
                                        }
                                    </datalist>
                                </div>
                            </div>


                            <div className="col-span-full">
                                <div className="sm:col-span-3 mr-3">
                                    <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                        Destination
                                    </label>
                                    <div className="mt-2">
                                        <input list="ateliers" name="atelier" id="atelier"
                                            onChange={e => setAtelier(e.target.value)}
                                            value={atelier}
                                            className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        <datalist id="ateliers"
                                            className=''
                                        >
                                            {
                                                ateliers.data && ateliers.data.map(atelier => {
                                                    return (
                                                        <option value={atelier.atelier_name} key={atelier.atelier_id}>{atelier.atelier_name}</option>
                                                    )
                                                })
                                            }
                                        </datalist>
                                    </div>
                                </div>

                            </div>
                            <div className="sm:col-span-3 mr-3">
                                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                    Position
                                </label>
                                <div className="mt-2">
                                    <input list="positions" name="position" id="position"
                                        onChange={e => setPosition(e.target.value)}
                                        value={position}
                                        className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <datalist id="positions"
                                        className=''
                                    >
                                        {
                                            positions.data && positions.data.map(position => {
                                                return (
                                                    <option value={position.position_name} key={employee.position_name}>{position.position_name}</option>
                                                )
                                            })
                                        }
                                    </datalist>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                                    Quantity
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
                    
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sauvegarder
                    </button>
                </div>
            </form>
        </div>
    )
}
