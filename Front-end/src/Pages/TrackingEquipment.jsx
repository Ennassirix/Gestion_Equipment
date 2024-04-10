import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTrackingData } from '../Redux/TrackingSlice'
import * as XLSX from 'xlsx';
// execel 
const exportToExcel = () => {
    const table = document.getElementById('trackingTable');
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'tracking_data.xlsx');
};
export default function TrackingEquipment() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTrackingData());
    }, [])
    const trackings = useSelector(state => state.tracking);
    return (
        <div className='ml-20 pt-3 h-screen'>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border " id='trackingTable'>
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">code</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">equipment_name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">atelier_name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">employee_name</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">date_issued</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">quantity_issued</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            
                                    trackings.data && trackings.data.map(tracking => {
                                        return (
                                            <tr key={tracking.id}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{tracking.code}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.equipment_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.atelier_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.employee_name}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.date_issued}</td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{tracking.quantity_issued}</td>
                                            </tr>
                                        )
                                    })
                        }
                    </tbody>
                </table>
            </div>
            <button
                onClick={() => exportToExcel()}
                type="submit"
                className="rounded-md bg-red-600 px-3 py-2 text-sm 
                        font-semibold text-white shadow-sm hover:bg-red-500 
                        focus-visible:outline focus-visible:outline-2 
                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-4"
            >
                Download
            </button>
        </div>
    )
}
