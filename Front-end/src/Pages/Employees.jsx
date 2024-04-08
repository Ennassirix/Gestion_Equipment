import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployeeData } from '../Redux/EmployeeSlice'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';
import SuccessPopUp from '../Components/SuccessPopUp';
import ErrorPopUp from '../Components/ErrorPopUp';
export default function Employees() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchEmployeeData())
    }, [dispatch])
    const employees = useSelector(state => state.employees)
    // add an employee :
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState('')
    const [showPopUp, setShowPopUp] = useState(false);
    const [errorPopUp, setErrorPopUp] = useState(false)
    const [update, setUpdate] = useState(false)
    const handelSubmit = async e => {
        e.preventDefault()
        if (name === '') {
            setError('le champ du nom ne doit pas être vide')
            setErrorPopUp(true)
        } else if (lastName === '') {
            setError('le champ du Prenom ne doit pas être vide')
            setErrorPopUp(true)
        } else {
            try {
                const res = await axios.post('http://localhost:3001/employees/api/createEmployee', { employee_name: name, last_name: lastName })
                if (res.status === 200) {
                    setShowPopUp(true)
                    setErrorPopUp(false)
                    setName('')
                    setLastName('')
                    // navigate('/addTracking')
                    dispatch(fetchEmployeeData());
                } else {
                    console.log('error')
                }
            } catch (error) {
                setError('le nom ou le prenom ne doit pas être dupliqué')
                setErrorPopUp(true)
            }
        }
    }
    // delete an employee
    const handleDelete = async (id) => {
        if (window.confirm('are u sure')) {
            try {
                await axios.delete(`http://localhost:3001/employees/api/employee/${id}`);
                console.log('Employee deleted successfully');
                // Optionally, you can trigger a UI update or show a confirmation message here
            } catch (error) {
                console.error('Failed to delete employee:', error);
                // Optionally, you can show an error message to the user or handle the error in another way
            }
        }

    };
    return (
        <div>
            <div className='ml-20 mt-3'>
                <span className="relative flex justify-center">
                    <div
                        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                    ></div>

                    <span className="relative z-10 bg-white px-6">Ajouter des employés</span>
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
                <form action="" className='md:flex sm:block ' onSubmit={handelSubmit}>
                    <div className="sm:col-span-3 mr-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Nom
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
                    <div className="sm:col-span-3 mr-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                            Prenom
                        </label>
                        <div className="mt-2">
                            <input
                                onChange={e => setLastName(e.target.value)}
                                value={lastName}
                                type="text"
                                name=""
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
                <span className="relative flex justify-center py-3">
                    <div
                        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                    ></div>

                    <span className="relative z-10 bg-white px-6">Liste Des Employés</span>
                </span>
                {
                    employees.data.length !== 0 && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nom :</th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Prenom :</th>
                                        <th className="px-4 py-2"></th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {
                                        employees.data && employees.data.map(employee => {
                                            return (
                                                <tr key={employee.employee_id} className='divide-y divide-gray-200'>
                                                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 uppercase">
                                                        {employee.employee_name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700 uppercase">{employee.last_name}</td>
                                                    <td className="whitespace-nowrap px-4 py-2">
                                                        <a
                                                            href="#"
                                                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                        >
                                                            Updade
                                                        </a>
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2">
                                                        <Link
                                                            onClick={() => handleDelete(employee.employee_id)}
                                                            to="/employees"
                                                            className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                                        >
                                                            Delete
                                                        </Link>
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
        </div>
    )
}
