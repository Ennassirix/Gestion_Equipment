import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

import SuccessPopUp from '../Components/SuccessPopUp';
import ErrorPopUp from '../Components/ErrorPopUp';
import { fetchPositionData } from '@/Redux/PositionSlice';
export default function Position() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchPositionData())
    }, [dispatch])
    const positions = useSelector(state => state.positions)

    const [position, setPosition] = useState('')
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false)
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (position === '') {
                setError('Le champ de position ne doit pas être vide')
                setErrorPopUp(true)
                setShowPopUp(false)
            } else {
                const res = await axios.post('http://localhost:3001/position/api/createPosition',
                    {
                        position_name: position
                    }
                )
                if (res.status === 500) {
                    setError('La position ne doit pas être dupliquée')
                    setErrorPopUp(true)
                    setShowPopUp(false)
                } else {
                    setErrorPopUp(false)
                    setShowPopUp(true)
                    dispatch(fetchPositionData())
                    setPosition('')
                }
            }
        } catch (error) {
            setError('La position ne doit pas être dupliquée')
            setErrorPopUp(true)
            setShowPopUp(false)
        }
    }


    return (
        <div className='ml-20 pt-3 h-screen'>
            <span className="flex items-center py-3">
                <span className="pr-6 font-mono capitalize">ajouter des position </span>
                <span className="h-px flex-1 bg-black"></span>
            </span>
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

            <form action="" className='md:flex sm:block ' onSubmit={handleSubmit} >
                <div className="sm:col-span-3 mr-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        position
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={e => setPosition(e.target.value)}
                            onFocus={() => { setShowPopUp(false), setErrorPopUp(false) }}
                            type="text"
                            name=""
                            value={position}
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
                <span className="pr-6 font-mono capitalize">liste des positions </span>
                <span className="h-px flex-1 bg-black"></span>
            </span>
            {
                positions.data.length !== 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm" id='atelierTable'>
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nom</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {
                                    positions.data && positions.data.map(position => {
                                        return (
                                            <tr className="odd:bg-gray-50" key={position.position_id}>
                                                <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{position.position_name}</td>
                                                <td className="whitespace-nowrap py-2 text-gray-700">
                                                    <button
                                                        className="inline-block rounded  px-1 py-1 text-white hover:text-blue-700"
                                                    >
                                                        <Link to={`/position/update/${position.position_id}`}>
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                fill="none" viewBox="0 0 24 24"
                                                                strokeWidth="1.5" stroke="currentColor"
                                                                className="size-6 text-blue-600">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                        </Link>

                                                    </button>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    <button
                                                        onClick={() => handeleDelete(position.position_id)}
                                                        className="inline-block rounded  px-1 py-1 text-white hover:text-red-700"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            fill="none" viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
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
                )
            }
        </div>
    )
}
