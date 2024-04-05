import React from 'react'

export default function Employees() {
    return (
        <div>
            <div className='ml-20 mt-3'>
                <h1>Add Employees </h1>
                <form action="" className='flex justify-start'>
                    <div className="sm:col-span-3 mr-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                     Name
                                </label>
                                <div className="mt-2">
                                <input
                                        type="text"
                                        name=""
                                        id=""
                                        autoComplete=""
                                        className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                    </div>
                    <div className="sm:col-span-3 mr-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                <input
                                        type="text"
                                        name=""
                                        id=""
                                        autoComplete=""
                                        className="block w-50 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                    </div>
                    <div className="mt-6 flex items-center justify-start gap-x-6">
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
                <h1>List Employees</h1>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="ltr:text-left rtl:text-right">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name :</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Last Name :</th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action :</th>
                            </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                                            <tr >
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Ayoub</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">Ennassiri</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <button
                        type="submit"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm 
                        font-semibold text-white shadow-sm hover:bg-red-500 
                        focus-visible:outline focus-visible:outline-2 
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-3 "
                    >
                        Upadet
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm 
                        font-semibold text-white shadow-sm hover:bg-red-500 
                        focus-visible:outline focus-visible:outline-2 
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
                    >
                        Delete
                    </button>
                                                </td>
                                            </tr>
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
