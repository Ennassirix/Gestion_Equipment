import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSingleEquipmentData } from '@/Redux/SingleEquipmentSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ErrorPopUp from '@/Components/ErrorPopUp';
import SuccessPopUp from '@/Components/SuccessPopUp';
import axios from "axios";

export default function UpdateEquipment() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchSingleEquipmentData(id))
    }, [dispatch,id])
    const singleEquipment = useSelector(state => state.singleEquipment.data)
    const [equipmentName, setEquipmentName] = useState(singleEquipment[0] && singleEquipment[0].equipment_name);
    const [quantity, setQuantity] = useState(singleEquipment[0] && singleEquipment[0].quantity_available);
    const [code, setCode] = useState(singleEquipment[0] && singleEquipment[0].code);
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
                const res = await axios.put(`http://localhost:3001/equipment/api/equipment/${id}`,
                    { code: code, equipment_name: equipmentName, quantity_available: quantity })
                if (res.status === 200) {
                    setShowPopUp(true)
                    setErrorPopUp(false)
                    setCode('')
                    setEquipmentName('')
                    setQuantity('')
                    navigate('/equipments')
                } else {
                    console.log('error')
                }
            } catch (error) {
                console.error(error)
                setErrorPopUp(true)
            }
        }
    }
    return (
        <div className="ml-20">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg flex">
                    <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handelSubmit}>
                        <p className="text-center text-lg font-medium">Edit </p>
                        {
                            errorPopUp && <ErrorPopUp error={error} />
                        }
                        {
                            showPopUp && <SuccessPopUp />
                        }
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
                                    placeholder={code}
                                    autoComplete=""
                                    className="block md:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    className="block md:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    className="block md:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-start gap-x-6">
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sauvegarder
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
