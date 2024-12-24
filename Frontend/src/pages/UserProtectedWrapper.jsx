import React, { useContext, useEffect } from 'react'
import { UserDatacontext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserProtectedWrapper = ({children}) => {

    const token = localStorage.getItem('token')
    const { user, setUser } = useContext(UserDatacontext)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!token) {
            navigate('/userlogin')
            // return null;
        }                                    
        
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            const data = response.data;
            setUser(data.user)


        })


    }, [token, navigate, setUser]);

    return (
       <>
        {children}
       </>
    )
}

export default UserProtectedWrapper
