import axios from "axios";
import {setUser} from "../reducers/userReducer";
import {setBio} from "../reducers/userBioReducer";
import {useSelector} from "react-redux";

export const registration = async (email, password) => {
    try {
        const response = await axios.post(`http://localhost:5000/api/auth/registration`, {
            email,
            password
        })
        alert(response.data.message)
        window.location.href = 'http://localhost:3000/login'
    } catch (e) {
        alert(e.response.data.message)
    }
}

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            await dispatch(userInfo())
            if (localStorage.getItem('checkbox')) {
                localStorage.removeItem('token')
            }
        } catch (e) {
            alert(e.response.data.message)
        }
    }
}

export const auth = () => {
    return async dispatch => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/auth`,
                {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                        })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            localStorage.removeItem('token')
        }
    }
}

export const userInfo = () => {
    return async dispatch => {
        try {
            if (localStorage.getItem('token')) {
                const response = await axios.get(`http://localhost:5000/api/auth/userpage`,
                    {
                        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
                    })
                dispatch(setBio(response))
            }
        } catch (e) {
            const isAuth = useSelector(state => state.user.isAuth)
            if (!isAuth) {
                alert(e.response.data.message)
            }
        }
    }
}