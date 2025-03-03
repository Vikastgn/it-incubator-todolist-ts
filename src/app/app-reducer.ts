import {Dispatch} from "redux";
import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}
const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType }>) {
            state.status =action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: null | string }>) {
            state.error =action.payload.error
        },
        setAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean}>) {
            state.isInitialized =action.payload.isInitialized
        },
    }
})


export const appReducer = slice.reducer
// export const setAppErrorAC = slice.actions.setAppErrorAC
// export const setAppStatusAC = slice.actions.setAppStatusAC
// export const setAppInitializedAC = slice.actions.setAppInitializedAC

export const {setAppErrorAC,setAppStatusAC,setAppInitializedAC} = slice.actions

export const  initializeAppTC = () => (dispatch: Dispatch) => {
authAPI.me().then( res => {
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}))
    } else {

    }
    dispatch(setAppInitializedAC({isInitialized: true}))
})
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>


export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    //  true когда приложение проинициализировалось (проверили юзера. настройки получили и т.д.)
    isInitialized: boolean
}