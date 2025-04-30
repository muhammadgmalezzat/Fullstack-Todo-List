import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()


const AppContextProvider = (props) => {


    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [todos, setTodos] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userData, setUserData] = useState(null);

    // Getting todos using API
    const getAllTodos = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/todo/getTodos', { headers: { token } });
            if (data.success) {
                setTodos(data.todos)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    // Getting User Profile using API
    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/getUserProfile', { headers: { token } })
            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            //toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getAllTodos();
            loadUserProfileData()
        }
    }, [token])



    const value = {
        backendUrl,
        userData,
        token,
        setToken,
        setUserData,
        todos,
        setTodos,
        getAllTodos,
        loadUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
};



export default AppContextProvider;
