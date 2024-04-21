import React from 'react'

export default function UpdateQuantity() {
    return (
        <div className='ml-20 p-3 bg-gray-100 h-screen flex justify-center'>
            <div className="rounded-lg bg-white p-8 shadow-2xl max-w-96 h-56 ">
                <h2 className="text-lg font-bold">modifier quantité </h2>
                <div className="sm:col-span-3 mr-3">
                    <div className="mt-2">
                        <input
                            type="text"
                            name=""
                            id=""
                            autoComplete=""
                            className="block md:w-72 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <button type="button" className="rounded bg-green-50 px-4 py-2 text-sm font-medium text-green-600">
                        save
                    </button>
                    <button type="button" className="rounded bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                        go back
                    </button>
                </div>
            </div>
        </div>
    )
}
