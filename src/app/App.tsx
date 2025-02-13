import React, {useCallback, useEffect, useState} from 'react'
import './App.css'
import {AppBar, CircularProgress, Container, IconButton, LinearProgress, Switch, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "../MenuButton";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {TaskType} from "../api/todolists-api";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
import {Outlet} from "react-router-dom";
import {logoutTC} from "../features/Login/auth-reducer";

type ThemeMode = 'dark' | 'light'

type PropsType = {
    demo?: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App({demo = false}: PropsType) {
    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)


    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC())
        }
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: "fixed", top: "30%", textAlign: "center", width: "100%"}}>
            <CircularProgress/>
        </div>

    }
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
            <CssBaseline/>
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        {isLoggedIn && <MenuButton onClick={logoutHandler}>Logout</MenuButton>}
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Outlet/>
            </Container>
        </ThemeProvider>
    )
}


export default App