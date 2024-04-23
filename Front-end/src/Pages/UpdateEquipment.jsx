import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ErrorPopUp from '@/Components/ErrorPopUp';
import SuccessPopUp from '@/Components/SuccessPopUp';
import axios from "axios";
import { fetchPositionData } from '@/Redux/PositionSlice';

export default function UpdateEquipment() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false)
    const dispatch = useDispatch()
    // data 
    const [data, setData] = useState(null)
    // fetch Data:
    const fetchDataEquipment = async () => {
        const res = await axios.get(`http://localhost:3001/equipment/api/getAnEquipment/${id}`)
        setData(res.data)
    }
    const fetchData = async () => {
        await dispatch(fetchPositionData())
        await fetchDataEquipment()
    }
    useEffect(() => {
        fetchData()
    }, [dispatch, id])
    const positions = useSelector(state => state.positions)
    const [equipmentName, setEquipmentName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [code, setCode] = useState('');
    const [ref, setRef] = useState('');
    const [position, setPosition] = useState('');

    const handelSubmit = async e => {
        e.preventDefault()
        if (code === '') {
            setError('le champ du code ne doit pas être vide')
            setErrorPopUp(true)
        } else if (ref === '') {
            setError('le champ du ref doit pas être vide')
            setErrorPopUp(true)
        } else if (equipmentName === '') {
            setError('le champ du equipment nom ne doit pas être vide')
            setErrorPopUp(true)
        } else if (position === '') {
            setError('le champ du position  ne doit pas être vide')
            setErrorPopUp(true)
        } else if (quantity === '') {
            setError('le champ du quantity ne doit pas être vide')
            setErrorPopUp(true)
        } else {
            try {
                const res = await axios.put(`http://localhost:3001/equipment/api/equipment/${id}`,
                    {
                        code: code,
                        ref: ref,
                        equipment_name: equipmentName,
                        quantity_available: quantity,
                        position_name: position
                    })
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
        <div className="ml-20 pt-3">
            <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 ">
                <div className="mx-auto max-w-lg flex ">
                    <form action="#" className="space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8 " onSubmit={handelSubmit}>
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
                            <small className='text-gray-400'>ancien code : {data && data[0].code} </small>
                            <div className="mt-2">
                                <input
                                    onChange={e => setCode(e.target.value)}
                                    onFocus={() => setShowPopUp(false)}
                                    type="text"
                                    name=""

                                    id=""
                                    placeholder={data && data[0].code}
                                    autoComplete=""
                                    className="block md:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 mr-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Ref
                            </label>
                            <small className='text-gray-400'>ancien ref : {data && data[0].ref} </small>
                            <div className="mt-2">
                                <input
                                    onChange={e => setRef(e.target.value)}
                                    onFocus={() => setShowPopUp(false)}
                                    type="text"
                                    name=""
                                    value={ref}
                                    id=""
                                    placeholder={data && data[0].ref}
                                    autoComplete=""
                                    className="block md:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 mr-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                                nom de l'équipement
                            </label>
                            <small className='text-gray-400'>ancien nom : {data && data[0].equipment_name} </small>
                            <div className="mt-2">
                                <input
                                    onChange={e => setEquipmentName(e.target.value)}
                                    onFocus={() => setShowPopUp(false)}
                                    type="text"
                                    name=""
                                    value={equipmentName}
                                    id=""
                                    placeholder={data && data[0].equipment_name}
                                    autoComplete=""
                                    className="block md:w-96 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-3 mr-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Position
                            </label>
                            <small className='text-gray-400'>ancien position : {data && data[0].position_name} </small>
                            <div className="mt-2">
                                <select name="" id="" onChange={e => setPosition(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"

                                >
                                    <option value={data && data[0].position_name}>{data && data[0].position_name}</option>
                                    {
                                        positions.data && positions.data.map(position => {
                                            return (
                                                <option value={position.position_name} key={position.position_id}>{position.position_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="sm:col-span-3 mr-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                                Quantité disponible
                            </label>
                            <small className='text-gray-400'>ancien Quantité : {data && data[0].quantity_available} </small>

                            <div className="mt-2">
                                <input
                                    onChange={e => setQuantity(e.target.value)}
                                    onFocus={() => setShowPopUp(false)}
                                    type="number"
                                    name=""
                                    value={quantity}
                                    id=""
                                    placeholder={data && data[0].quantity_available}
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
