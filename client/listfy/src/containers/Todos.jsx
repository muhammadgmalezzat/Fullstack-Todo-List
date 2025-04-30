import React,{useState,useEffect} from 'react'
import Todo from '../components/Todo';
import TodoModel from '../components/TodoModel';

const Todos = ({ Todos }) => {

    const [filterStatus, setfilterStatus] = useState("all")
    const [todosList, settodosList] = useState(Todos);
    const [modalOpen, setmodalOpen] = useState(false);
    const [type, settype] = useState("add");
    const [updateId, setupdateId] = useState("");

    const updateFilter = (e) => {
        setfilterStatus(e.target.value)
    };
    useEffect(() => {
        if (filterStatus === "all") {
            settodosList(Todos)
        } else if (filterStatus === "complete") {
            const completedTasks = Todos.filter((todo) => todo.status === "complete")
            settodosList(completedTasks)
        } else if (filterStatus === "pending") {
            const incompleteTasks = Todos.filter((todo) => todo.status === "pending")
            settodosList(incompleteTasks)
        }
    }, [filterStatus, Todos]);

    return (
        <div className="content__wrapper mb-5 w-[100%]  flex flex-col items-center  mx-auto  flex-wrap gap-4 justify-center sm:flex-col">
            {/* to do model */}
            <TodoModel
                modalOpen={modalOpen}
                setmodalOpen={setmodalOpen}
                type={type}
                settype={settype}
                todoList={todosList}
                updateId={updateId}
            />
            {/* Create task buttom */}
            <div className='flex flex-col md:flex-row justify-between items-center gap-4 my-6'>
                <button
                    onClick={() => setmodalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-md transition">Create Todo</button>
                {/* Filter Dropdown */}
                <select
                    id="status"
                    onChange={updateFilter}
                    value={filterStatus}
                    className="border border-gray-300 rounded-md p-2 w-48 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="all">All</option>
                    <option value="complete">Completed</option>
                    <option value="pending">pending</option>
                </select>
            </div>
            {/* Todos List */}
            <div className="flex flex-col items-center mt-5 w-full">
                <h1 className="mb-2 text-[#646ff0] text-3xl">Todos</h1>
                <div className="flex flex-col items-center w-[100%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
                    {todosList.length < 1 && <h4 className="mb-1 text-[#585858]">No todos available</h4>}
                    {todosList && todosList.map((todo, index) => (
                        <Todo
                            key={index}
                            todo={todo}
                            settype={settype}
                            setmodalOpen={setmodalOpen}
                            setupdateId={setupdateId}
                        />
                    ))}
                    
                </div>
            </div>
        </div>
    )
};

export default Todos