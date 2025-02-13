import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolists-api";

export default {
    title: 'API',
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.createTodolist('SOME NEW TITLE')
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const id = 'f60cc860-5611-460b-86db-428d53738af4'
        todolistAPI.deleteTodolist(id)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = 'f13d6a67-b889-4fcd-8333-d32fd48899fe'
        todolistAPI.updateTodolist(id, 'UPDETING TITLE').then(res => {
            setState(res.data)
        })
    }, [])


    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<string>('')

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={getTasks}>get tasks</button>
        </div>
    </div>
}
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const deleteTask = () => {
        todolistAPI.deleteTasks(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }


    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')

    const createTask = () => {
        todolistAPI.createTasks(todolistId, taskTitle)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <input placeholder={"Task Title"} value={taskTitle}
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>
}

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')

    const updateTask = () => {
        todolistAPI.updateTasks(todolistId, taskId, {
            description: description,
            startDate: "",
            deadline: "",
            status: status,
            priority: priority,
            title: title
        })
            .then(res => {
                setState(res.data)
            })
}

return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={"taskId"} value={taskId}
               onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input placeholder={"todolistId"} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={"Task Title"} value={title}
               onChange={(e) => setTitle(e.currentTarget.value)}/>
        <input placeholder={"Description"} value={description}
               onChange={(e) => setDescription(e.currentTarget.value)}/>
        <input placeholder={"Status"} value={status} type="number"
               onChange={(e) => setStatus(+e.currentTarget.value)}/>
        <input placeholder={"Priority"} value={priority} type="number"
               onChange={(e) => setPriority(+e.currentTarget.value)}/>
        <button onClick={updateTask}>update task</button>
    </div>
</div>
}