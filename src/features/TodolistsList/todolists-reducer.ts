import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/errors-utils";
import {fetchTasksTC} from "./tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export let todolistId1 = v1();
export let todolistId2 = v1();


const initialState: TodolistDomainType [] = []

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const slice = createSlice({
    name: "todolist",
    initialState: initialState,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{id: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodolistAC (state, action: PayloadAction<{todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: "all", entityStatus: "idle"})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{id: string, title: string}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].title = action.payload.title
            }
        },
        changeTodolistFilterAC(state, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].filter = action.payload.filter
            }
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, status: RequestStatusType}>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].entityStatus = action.payload.status
            }
        },
        setTodolistsAC(state, action: PayloadAction<{todolists: TodolistType[]}>) {
            //return action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}))
            action.payload.todolists.forEach((tl) => {
                state.push({...tl, filter: "all", entityStatus: "idle"})
            })
        },
        clearTodosDataAC(state, action: PayloadAction<{}>) {
            return []
        },
    }
})

export const todolistsReducer = slice.reducer

export const {
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    changeTodolistEntityStatusAC,
    setTodolistsAC,
    clearTodosDataAC
} = slice.actions

export const fetchTodolistsTC = () => {
    return (dispatch: any) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.getTodolists()
            .then((res) => {

                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: "succeeded"}))
                return res.data
            })
            .then((todos) => {
                todos.forEach((tl) => {
                    dispatch(fetchTasksTC(tl.id))
                })
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({id:todolistId, status:'loading'}))
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC({id: todolistId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.createTodolist(title)
            .then((res) => {
                dispatch(addTodolistAC({todolist: res.data.data.item}))
            })
    }
}

export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.updateTodolist(id, title)
            .then(res => {
                dispatch(changeTodolistTitleAC({id:id, title: title}))
            })
    }
}
