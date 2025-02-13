import React, {useCallback, useEffect} from "react";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./todolists-reducer";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../app/App";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {
    const dispatch = useAppDispatch()
    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    console.log(todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }

        dispatch(fetchTodolistsTC())
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        const thunk = removeTaskTC(id, todolistId);
        dispatch(thunk);
    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk)
    }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId);
        dispatch(thunk);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId);
        dispatch(thunk);
    }, []);

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC({id: todolistId, filter: value})
        dispatch(action)
    }, [dispatch])

    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)
    }, [])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(id, newTitle)
        dispatch(thunk)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [dispatch])


    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }


    return (<>
        <Grid container style={{padding: "40px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>

        <Grid container spacing={3} style={{gap: "20px"}}>
            {todolists.map((tl) => {
                let allTodolistTasks = tasks[tl.id];
                return (
                    <Grid key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </Grid>
    </>)
}