import React, { useState, useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'

import { toast } from 'react-toastify';
import {AppContext} from '../contexts/AppContext';
import axios from 'axios';
const TodoModel = ({ modalOpen, setmodalOpen, type, updateId, todoList }) => {

    const { token, backendUrl ,getAllTodos} = useContext(AppContext);

    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('pending');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();


    const addTask = async () => {
        //check if user is logged in or not
        if (!token) {
            toast.warning('Login to add task')
            return navigate('/login')
        }
        try {
            const { data } = await axios.post(backendUrl + '/api/todo/addTodo', { title, status, description,dueDate }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getAllTodos()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    const updateTask = async (id) => {
        //check if user is logged in or not
        if (!token) {
            toast.warning('Login to add task')
            return navigate('/login')
        }
        try {
            const { data } = await axios.post(backendUrl + '/api/todo/updateTodo', {id, title, status, description,dueDate }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getAllTodos()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (type === 'update' && updateId) {
            const todo = todoList.find((t) => t.id === updateId);
            if (todo) {
                setTitle(todo.title);
                setStatus(todo.status);
                setDescription(todo.description);
                setDueDate(todo.dueDate);
            }
        }
    }, [type, updateId, todoList]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error('Title should not be empty');
            return;
        }
        if (!description.trim()) {
            toast.error('description should not be empty');
            return;
        }

        if (type === 'add') {
            addTask();
        } else if (type === 'update') {
            updateTask(updateId);
            //toast.success('Task Updated successfully');
        }

        setTitle('');
        setDescription('');
        setDueDate('');
        setStatus('incomplete');
        setmodalOpen(false);
    };

    if (!modalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative animate-fadeIn">
        
                {/* Close button */}
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                    onClick={() => setmodalOpen(false)}
                >
                    ×
                </button>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h2 className="text-2xl font-semibold text-center mb-4">{type === 'add' ? 'Add Task' : 'Update Task'}</h2>

                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-gray-700 font-medium mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="title" className="text-gray-700 font-medium mb-1">
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="status" className="text-gray-700 font-medium mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="pending">pending</option>
                            <option value="complete">Complete</option>
                        </select>
                    </div>

                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                        >
                            {type === 'add' ? 'Add Task' : 'Update Task'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setmodalOpen(false)}
                            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded-lg transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoModel