import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from "../providers/auth";
import { todoApi } from "../api/todoApi";

const Repair = () => {
    let params = useParams()
    let navigate = useNavigate()

    const { token, user } = useAuth();
    const { get } = todoApi();

    const [repair, setRepair] = useState("")

    const getRepairsById = async () => {
        const response = await get(`/repair/${params.id}`)
        console.log(response.data);
        setRepair(response.data)
    }

    useEffect(() => {
        getRepairsById()
    },[])

    return (
        <div>
            <h1>Repair</h1>
            {
            repair ? 
            <p>
                {repair.comment}
            </p> :
            <p>the repair that you're looking for is unavailable</p>  
            }
        </div>
    )
}

export default Repair