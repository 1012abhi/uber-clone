import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectedWrapper = ({children}) => {

    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)
    const token = localStorage.getItem('token')
    // console.log(token);
    
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!token) {
            navigate('/captainlogin')
        }                                    
        
        // edge case: token validation ki ye token user ka hai ya captain ka or kahi token expired to nahi 
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response);
            
            if (response.status === 200) {
                const data = response.data;
                setCaptain(data.captain)
                setIsLoading(false)
            }
        })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem('token')
            navigate('/captainlogin')
        })
    }, [navigate, setCaptain, token])
    
    if (isLoading ) {
        return (
            <div>Loading...</div>

        )
        
    }

    return (
       <>
        {children}
       </>
    )
}

export default CaptainProtectedWrapper
