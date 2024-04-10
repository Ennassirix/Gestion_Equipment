import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEquipmentData } from '../Redux/EquipmentSlice'
import axios from "axios";
import * as XLSX from 'xlsx';
import SuccessPopUp from '../Components/SuccessPopUp';
import ErrorPopUp from '../Components/ErrorPopUp';
import { Link } from 'react-router-dom';



export default function Equipments() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchEquipmentData())
    }, [dispatch])
    const equipments = useSelector(state => state.equipments)

    const [code, setCode] = useState('')
    const [equipmentName, setEquipmentName] = useState('')
    const [quantity, setQuantity] = useState('')

    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false)
    const handelSubmit = async e => {
        e.preventDefault()
        if (code === '') {
            setError('le champ du code ne doit pas être vide')
            setErrorPopUp(true)
        } else if (equipmentName === '') {
            setError('le champ du equipment nom ne doit pas être vide')
            setErrorPopUp(true)
        } else if (quantity === '') {
            setError('le champ du quantity ne doit pas être vide')
            setErrorPopUp(true)
        } else {
            try {
                const res = await axios.post('http://localhost:3001/equipment/api/equipment',
                    { code: code, equipment_name: equipmentName, quantity_available: quantity })
                if (res.status === 200) {
                    setShowPopUp(true)
                    setErrorPopUp(false)
                    setCode('')
                    setEquipmentName('')
                    setQuantity('')
                    dispatch(fetchEquipmentData());
                } else {
                    console.log('error')
                }
            } catch (error) {
                console.error(error)
                setErrorPopUp(true)
            }
        }
    }
    const handeleDelete = async (id) => {
        if (window.confirm('are u sure')) {
            try {
                await axios.delete(`http://localhost:3001/equipment/api/equipment/${id}`);
            } catch (error) {
                console.error(error)
            }
        }
    }
    // execel
    const exportToExcel = () => {
        const table = document.getElementById('equipmentsTable');
        const ws = XLSX.utils.table_to_sheet(table);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        XLSX.writeFile(wb, 'equipments_data.xlsx');
    };
    // update 
    const [showEdit, setShowEdit] = useState(false)
    const handeleSowEdit = () => {
        setShowEdit(!showEdit)
    }
    return (
        <div className='ml-20 pt-3 h-screen'>
            {
                showPopUp && (
                    <SuccessPopUp />
                )
            }
            {
                errorPopUp && (
                    <ErrorPopUp error={error} />
                )
            }

            <form action="" className='md:flex sm:block ' onSubmit={handelSubmit} >
                <div className="sm:col-span-3 mr-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Code
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={e => setCode(e.target.value)}
                            onFocus={() => setShowPopUp(false)}
                            type="text"
                            name=""
                            value={code}
                            id=""
                            autoComplete=""
                            className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3 mr-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                        nom de l'équipement
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={e => setEquipmentName(e.target.value)}
                            onFocus={() => setShowPopUp(false)}
                            type="text"
                            name=""
                            value={equipmentName}
                            id=""
                            autoComplete=""
                            className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-3 mr-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                        Quantité disponible
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={e => setQuantity(e.target.value)}
                            onFocus={() => setShowPopUp(false)}
                            type="number"
                            name=""
                            value={quantity}
                            id=""
                            autoComplete=""
                            className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-start gap-x-6">
                    <button
                        type="reset"
                        className="text-sm font-semibold leading-6 text-gray-900">
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sauvegarder
                    </button>
                </div>
            </form>

            
            <span className="flex items-center py-3">
                <span className="pr-6 font-mono capitalize">List des equipments </span>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            <div className="rounded-lg border border-gray-200">
                <div className="overflow-x-auto rounded-t-lg">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm" id='equipmentsTable'>
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize">Code :</th>
                                <th className="whitespace-nowrap  py-2 font-medium text-gray-900 capitalize">nom de l'équipement </th>
                                <th className="whitespace-nowrap  py-2 font-medium text-gray-900 capitalize">quantity :</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 capitalize"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {
                                equipments.data && equipments.data.map(equipment => {
                                    return (
                                        <tr key={equipment.equipment_id}>
                                            <td className="whitespace-nowrap px-5 py-2 font-medium text-gray-900">{equipment.code}</td>
                                            <td className="whitespace-nowrap px-5 py-2 text-gray-700">{equipment.equipment_name}</td>
                                            <td className="whitespace-nowrap px-5 py-2 text-gray-700">{equipment.quantity_available}</td>
                                            <td className="whitespace-nowrap px-5 py-2 text-gray-700">
                                                {/* <DialogUpdate id={equipment.equipment_id} /> */}
                                                <button className="inline-block rounded  px-1 py-1 mr-2 text-white hover:text-red-700">
                                                    <Link to={`/equiment/update/${equipment.equipment_id}`}>
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            fill="none" viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="size-6 text-blue-600">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>
                                                    </Link>
                                                </button>
                                                <button
                                                    onClick={() => handeleDelete(equipment.equipment_id)}
                                                    className="inline-block rounded  px-1 py-1 text-white hover:text-red-700"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        fill="none" viewBox="0 0 24 24"
                                                        strokeWidth="1.5" stroke="currentColor"
                                                        className="size-6 text-red-600">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>

                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <button
                className="group relative inline-flex items-center overflow-hidden rounded bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring active:bg-indigo-500 mt-3"
                onClick={() => exportToExcel()}
            >
                <span className="absolute -end-full transition-all group-hover:end-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.75 6.75h-3a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3h7.5a3 3 0 0 0 3-3v-7.5a3 3 0 0 0-3-3h-3V1.5a.75.75 0 0 0-1.5 0v5.25Zm0 0h1.5v5.69l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V6.75Z" clipRule="evenodd" />
                        <path d="M7.151 21.75a2.999 2.999 0 0 0 2.599 1.5h7.5a3 3 0 0 0 3-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 0 1-4.5 4.5H7.151Z" />
                    </svg>

                </span>

                <span className="text-sm font-medium transition-all group-hover:me-4"> Download </span>
            </button>
        </div>

    )
}
