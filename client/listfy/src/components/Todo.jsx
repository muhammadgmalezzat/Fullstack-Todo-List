import React, { useEffect, useState ,useContext} from 'react';
//import { format } from 'date-fns';
//import { motion } from 'framer-motion';
import { FaTrash, FaEdit } from 'react-icons/fa'; // بدل MUI Icons
import { IoMdCheckmarkCircleOutline, IoMdRadioButtonOff } from "react-icons/io";
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../contexts/AppContext';
const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Todo = ({ todo, settype, setmodalOpen, setupdateId }) => {
    const [checked, setChecked] = useState(false);
    const { backendUrl, getAllTodos, token } = useContext(AppContext);
    const handleUpdate = (id) => {
        settype("update");
        setmodalOpen(true);
        setupdateId(id);
    }
    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(backendUrl + '/api/todo/deleteTodo', { id }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getAllTodos()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    const checkHandle = async (id) => {
        const status = checked ? 'pending' : 'complete'; // Toggle 
        try {
            const { data } = await axios.post(backendUrl + '/api/todo/changeTodoStatus', { id, status }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getAllTodos()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    useEffect(() => {
        setChecked(todo.status === 'complete');
    }, [todo.status]);

    return (
        <div
            variants={child}
            className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg mb-4 transition hover:shadow-lg duration-300 ease-in-out w-[90%] sm:w-[80%] md:w-[100%] lg:w-[100%] "
        >
            {/* Left side: Checkbox + Text */}
            <div className="flex items-center gap-3">
                {/* Check Button */}
                <button onClick={() => checkHandle(todo._id)} className="text-indigo-600 text-2xl focus:outline-none">
                    {checked ? <IoMdCheckmarkCircleOutline /> : <IoMdRadioButtonOff />}
                </button>
                {/* Task Text */}
                <div>
                    <p className={`font-semibold text-lg ${checked ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                        {todo.title}
                    </p>
                    <p>
                        {todo.description && <span className="text-gray-500"> - {todo.description}</span>}
                    </p>
                </div>
            </div>
            {/* Right side: Actions */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-red-500 hover:text-red-700 text-xl focus:outline-none"
                >
                    <FaTrash />
                </button>
                <button
                    onClick={() => handleUpdate(todo._id)}
                    className="text-blue-500 hover:text-blue-700 text-xl focus:outline-none"
                >
                    <FaEdit />
                </button>
            </div>
        </div>
    );
};

export default Todo;
