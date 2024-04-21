import { fetchNotificationData } from '@/Redux/NotificationSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Notification() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchNotificationData())
    }, [dispatch])
    const notifications = useSelector(state => state.notification)
    const [show, setShow] = useState(false)
    const showInput = (id) => {
        if (id === id) {
            setShow(true)
        }
        console.log(id)
    }
    return (
        <div className='ml-20 p-3 bg-gray-100 h-screen'>
            <span className="flex items-center py-3">
                <span className="pr-6 font-mono capitalize">Articles en faible quantité </span>
                <span className="h-px flex-1 bg-black"></span>
            </span>          

            


            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Article :</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Quantité :</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Dernière mise à jour :</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    {
                        notifications.data && notifications.data.map(notification => {
                            return (
                                <tbody className="divide-y divide-gray-200" key={notification.id}>
                                    <tr>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{notification.equipment_name}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{show ? (<input
                                            type="number"
                                            id="qts"
                                            placeholder=""
                                            className="mt-1 w-full rounded-md border-gray-500 shadow-sm sm:text-sm"
                                        />): notification.quantity_available}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{notification.updated_date}</td>
                                        <td className="whitespace-nowrap px-4 py-2">
                                            <Link
                                                onClick={() => showInput(notification.id)}
                                                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                                            >
                                                modifier
                                            </Link>
                                        </td>
                                    </tr>
                                </tbody>
                                
                            )
                        })
                    }
                    
                </table>
            </div>
            
            
        </div>
    )
}
