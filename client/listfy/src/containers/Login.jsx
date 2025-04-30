import React, { useContext, useState,useEffect } from 'react';
import { AppContext } from '../contexts/AppContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [state, setState] = useState('Sign Up');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState(0);
    const navigate = useNavigate();
    const { token, setToken, backendUrl } = useContext(AppContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Sign Up') {

                const { data } = await axios.post(backendUrl + '/api/auth/register',
                    { name, email, password ,phone });
                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token);
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }

            } else {

                const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })

                if (data.success) {
                    localStorage.setItem('token', data.token)
                    setToken(data.token);
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error)
        }

    };
    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token])
  
    return (
        <form
            onSubmit={onSubmitHandler}
            className='min-h-[80vh] flex items-center '>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm  shadow-lg '>
                <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Log In"}</p>
                <p>Please {state === 'Sign Up' ? "Create Account" : "Log In"} to book appointment</p>
                {state === 'Sign Up'
                    ? <div className='w-full '>
                        <p>Full Name</p>
                        <input
                            placeholder='enter your Name'
                            required
                            onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text"  />
                    </div>
                    : null
                }
                <div className='w-full '>
                    <label>E-mail</label>
                    <input
                        placeholder='enter your E-mail Address'
                        required
                        className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e) => { setEmail(e.target.value) }} value={email} />
                </div>
                <div className='w-full '>
                    <label>Password</label>
                    <input
                        placeholder='enter your Password'
                        required
                        className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e) => { setPassword(e.target.value) }} value={password} />
                </div>
                {state === 'Sign Up'
                    ?<div className='w-full '>
                    <label>Phone</label>
                    <input
                        placeholder='enter your phone number'
                        required
                        className='border border-zinc-300 rounded w-full p-2 mt-1'
                        type='number'
                        onChange={(e) => { setPhone(e.target.value) }} value={phone} />
                </div> : null}
                
                <button
                    type='submit'
                    className='bg-primary  w-full py-2  text-base bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 rounded-md transition'>{state === 'Sign Up' ? "Create Account" : "Log In"}</button>

                {state === 'Sign Up' ?
                    <p>Already have a account ? <span onClick={() => { setState('log In') }} className='text-primary underline cursor-pointer '>Login here</span> </p> :
                    <p>Create a new account ? <span onClick={() => { setState('Sign Up') }} className='text-primary underline cursor-pointer '>Click here</span> </p>}


            </div>
        </form>
    )
};

export default Login