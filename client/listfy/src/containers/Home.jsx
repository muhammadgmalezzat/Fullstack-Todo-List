import React,{useState,useEffect,useContext} from 'react'
import Details from '../components/Details';
import Todos from './Todos';
import Search from '../components/Search';
import { AppContext } from '../contexts/AppContext';

const Home = () => {

    const { todos } = useContext(AppContext);
    const [completedTasksNum, setcompletedTasksNum] = useState(0)
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTasks, setFilteredTasks] = useState(todos);

    //search Functionality
    const filtered = todos.filter((todo) =>
        todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    useEffect(() => {
        setFilteredTasks(filtered);
    }, [searchQuery, todos]);

    //count Fumctionality
    useEffect(() => {
        let completedNum = 0
        todos.map((todo) => {
            if (todo.status === "complete") {
                completedNum++;
            }
        })
        setcompletedTasksNum(completedNum);
    }, [todos]);

    return (
        <div className='flex flex-col min-h-screen w-min-[300px] items-center justify-center '>
            <Details completedNum={completedTasksNum} allTasksNum={todos.length} />
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Todos
                Todos={filteredTasks}
            />
        </div>
    )
};

export default Home;