import React, { useContext, useEffect } from 'react'
import { UserDatacontext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

function UserProtectedWrapper({children}) {

    const token = localStorage.getItem('token')
    
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!token) {
            navigate('/userlogin')
            return null;
        }
    }, [token])

    return (
       <>
        {children}
       </>
    )
}

export default UserProtectedWrapper
