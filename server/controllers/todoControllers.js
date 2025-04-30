import Todo from "../models/todoModel.js";

//              ✅ CRUD Controller functions
const addTodo = async (req, res) => { 
    try {
        const { title, description, status, dueDate } = req.body;
        const userId = req.userId;
        //create todo
        const todoData = new Todo({
            title,
            description,
            status,
            dueDate,
            userId
        });
        const newTodo = new Todo(todoData);
        const todo = await newTodo.save();
        res.json({ success: true, todo, message: "Todo added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const getTodos = async (req, res) => { 

    try {
        const todos = await Todo.find({ userId : req.userId });
        res.json({ success: true, todos });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const updateTodo = async (req, res) => { 
    try {
        const { id, title, description, status, dueDate } = req.body;
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.json({ success: false, message: "Todo not found" });
        }
        todo.title = title;
        todo.description = description; 
        todo.status = status;
        todo.dueDate = dueDate;
        await todo.save();
        res.json({ success: true, todo, message: "Todo updated successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

const deleteTodo = async (req, res) => { 
    try {
        const { id } = req.body;
        const todo = await Todo.findByIdAndDelete(id);
        res.json({ success: true, todo, message: "Todo deleted successfully" });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}
const changeTodoStatus = async (req, res) => {
    try {
        const { id, status } = req.body;

        if (!['complete', 'pending'].includes(status)) {
            return res.json({ success: false, message: 'Invalid status value' });
        }

        const todo = await Todo.findById(id);

        if (!todo) {
            return res.json({ success: false, message: 'Todo not found' });
        }

        todo.status = status;
        await todo.save();

        res.json({ success: true, todo, message: 'Todo Checked successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}



export {
    addTodo,
    getTodos,
    updateTodo,
    deleteTodo,
    changeTodoStatus
};