import React, {useCallback, useState} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import {
    addTodolistAC,
    changeTodolistTFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC} from "./state/tasks-reducer";

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log("App is called")
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const dispatch = useDispatch()
    const todolists=useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

    const tasks=useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const changeFilter = useCallback( (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistTFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

    const  addTask =  useCallback((title: string, todolistId: string) => {
        dispatch((addTaskAC(title, todolistId)))
    }, [dispatch])

    const removeTodolist = useCallback( (todolistId: string) => {
        const action  = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback( (id: string, newTitle: string) => {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback( (title: string)=>  {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#ef6c00',
            },
        },
    })
    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{ mb: '30px' }}>
                <Toolbar  sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container  sx={{ mb: '30px' }}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map((tl) => {

                        return (
                            <Grid key={tl.id}>
                                <Paper sx={{ p: '0 20px 20px 20px' }}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
                                        addTask={addTask}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default AppWithRedux