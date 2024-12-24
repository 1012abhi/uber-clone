import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function CaptainLogOut() {
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
    
            // console.log('response', response);
            
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/captainlogin')
        
            }
            
    
            
        })
        
    }, [])
   
    
    
    return (
    <div>
      logout Loading...
    </div>
  )
}

export default CaptainLogOut
