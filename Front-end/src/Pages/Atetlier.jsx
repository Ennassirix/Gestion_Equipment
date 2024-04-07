import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAtelierData } from '../Redux/AtelierSlice'
import axios from "axios";
export default function Atetlier() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAtelierData())
    }, [dispatch])
    const ateliers = useSelector(state => state.ateliers)
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false)
    const handelSubmit = async e => {
        e.preventDefault()
        if (name === '') {
            setError('le champ du atelier nom ne doit pas être vide')
            setErrorPopUp(true)
        } else {
            try {
                const res = await axios.post('http://localhost:3001/atelier/api/createAtelier', { atelier_name: name })
                if (res.status === 200) {
                    setShowPopUp(true)
                    setErrorPopUp(false)
                    setName('')
                    dispatch(fetchAtelierData());
                } else {
                    console.log('error')
                }
            } catch (error) {
                console.error(error)
                setErrorPopUp(true)
            }
        }
    }
    // handeledelete
    const handeleDelete = async (id) => {
        if (window.confirm('are u sure')) {
            try {
                await axios.delete(`http://localhost:3001/atelier/api/atelier/${id}`);
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <div className='ml-20 pt-3'>
            <span className="relative flex justify-center">
                <div
                    className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                ></div>

                <span className="relative z-10 bg-white px-6 capitalize ">Ajouter des employés</span>
            </span>
            {
                showPopUp && (
                    <div role="alert" className="rounded-xl border border-gray-100 p-4 bg-green-200">
                        <div className="flex items-start gap-4">
                            <span className="text-green-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            <div className="flex-1">
                                <strong className="block font-medium text-gray-900">Success</strong>
                            </div>
                            <button className="text-gray-500 transition hover:text-gray-600" onClick={() => setShowPopUp(false)}>
                                <span className="sr-only">Dismiss popup</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )
            }
            {
                errorPopUp && (
                    <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4">
                        <strong className="block font-medium text-red-800"> Something went wrong </strong>
                        <p className="mt-2 text-sm text-red-700">
                            {error}
                        </p>
                    </div>
                )
            }
            <form action="" className='md:flex sm:block ' onSubmit={handelSubmit} >
                <div className="sm:col-span-3 mr-3">
                    <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Nom D'atelier
                    </label>
                    <div className="mt-2">
                        <input
                            onChange={e => setName(e.target.value)}
                            onFocus={() => setShowPopUp(false)}
                            type="text"
                            name=""
                            value={name}
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
            <span className="relative flex justify-center">
                <div
                    className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                ></div>

                <span className="relative z-10 bg-white px-6 capitalize">liste des ateliers</span>
            </span>

            {
                ateliers.data.length !== 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm" id='atelierTable'>
                            <thead className="ltr:text-left rtl:text-right">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {
                                    ateliers.data && ateliers.data.map(atelier => {
                                        return (
                                            <tr className="odd:bg-gray-50" key={atelier.atelier_id}>
                                                <td className="whitespace-nowrap px-2 py-2 font-medium text-gray-900">{atelier.atelier_name}</td>
                                                <td className="whitespace-nowrap py-2 text-gray-700">
                                                    <button
                                                        className="inline-block rounded bg-blue-600 px-1 py-1 text-white hover:bg-blue-700"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                        </svg>

                                                    </button>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    <button
                                                        onClick={() => handeleDelete(atelier.atelier_id)}
                                                        className="inline-block rounded bg-red-600 px-1 py-1 text-white hover:bg-red-700"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
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
