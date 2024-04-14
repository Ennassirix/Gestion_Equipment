import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorPopUp from '@/Components/ErrorPopUp';
import SuccessPopUp from '@/Components/SuccessPopUp';
export default function UpdateAtelier() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState({})
    const fetchAtelier = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/atelier/api/atelier/${id}`)
            setData(res && res.data)
        } catch (error) {
            throw new error
        }
    }
    useEffect(() => {
        fetchAtelier()
    }, [id])
    console.log(data.name)
    // hadeleSubmit
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false)
    const [atelier, setAtelier] = useState('')
    const handelSubmit = async e => {
        e.preventDefault()
        if (atelier === '') {
            setError('le champ du atelier nom ne doit pas être vide')
            setErrorPopUp(true)
        }else {
            try {
                const res = await axios.put(`http://localhost:3001/atelier/api/atelier/${id}`,
                    { atelier_name : atelier })
                if (res.status === 200) {
                    setShowPopUp(true)
                    setErrorPopUp(false)
                    setAtelier('')
                    navigate('/atelier')
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
        <div className='ml-20 pt-3 h-screen'>
            <div className='mx-auto max-w-lg flex'>
                <form action="#" className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" onSubmit={handelSubmit}>
                    <p className="text-center text-lg font-medium">   </p>
                    {
                        errorPopUp && <ErrorPopUp error={error} />
                    }
                    {
                        showPopUp && <SuccessPopUp />
                    }
                    <div className="sm:col-span-3 mr-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Nom : {data.name}
                        </label>
                        <span className='text-sm'>old name : { data.name}</span>
                        <div className="mt-2">
                            <input
                                onChange={e => setAtelier(e.target.value)}
                                onFocus={() => setShowPopUp(false)}
                                type="text"
                                name=""
                                value={atelier}
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
    )
}
