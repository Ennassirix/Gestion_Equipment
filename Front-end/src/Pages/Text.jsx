import axios from 'axios'
import React, { useEffect } from 'react'

export default function Text() {
    const fetchData = async () => {
        try {
            const res = await axios.post('http://localhost:3001/tracks/api/filter'
                , { atelier_id : 2})
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handeleFilter = () => {
        fetchData()
    }
    return (
        <div>
            
        </div>
    )
}
