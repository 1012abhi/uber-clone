import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function UserLogout() {
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
    
            // console.log('response', response);
            
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/userlogin')
        
            }
            
    
            
        })
        
    }, [])
   
    
    
    return (
    <div>
      logout Loading...
    </div>
  )
}

export default UserLogout
