import {TasksStateType} from "../../app/App";
import {
    addTodolistAC, removeTodolistAC, setTodolistsAC
} from "./todolists-reducer";
import {TaskType, todolistAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import { setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errors-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: TasksStateType = {}

const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        removeTaskAC (state, action: PayloadAction<{taskId: string, todolistId: string }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{task: TaskType}>) {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task);
        },
        updateTaskAC(state, action: PayloadAction<{
            taskId: string,
            model: UpdateDomainTaskModelType,
            todolistId: string
        }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        },
        setTaskAC(state, action: PayloadAction<{tasks: TaskType[], todolistId: string}>) {
            state[action.payload.todolistId] = action.payload.tasks
        },
        clearTasksDataAC(state, action: PayloadAction<{}>) {
            return{}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = [];
            });
        });

    }
})

export const tasksReducer = slice.reducer
export const {removeTaskAC,
    addTaskAC,
    updateTaskAC,
    setTaskAC,
    clearTasksDataAC
}= slice.actions


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTaskAC({tasks: res.data.items, todolistId: todolistId}))
            dispatch(setAppStatusAC({status:"succeeded"}))
        })
}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTasks(todolistId, taskId)
        .then((res) => {
            const action = removeTaskAC({taskId:taskId, todolistId: todolistId})
            dispatch(action)
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistAPI.createTasks(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === 0)
                {
                    const task = res.data.data.item;
                    const action = addTaskAC({task: task})
                    dispatch(action)
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                handleServerAppError(res.data, dispatch)
                }
        })
        .catch((error)=>{
            handleServerNetworkError(error, dispatch)
        })
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        console.log('Status thunk');
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId);
        if (!task) {
            // throw new Error('task not found');
            console.warn('task not found');
            return
        }
        const apiModel: UpdateTaskModelType = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todolistAPI.updateTasks(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC({taskId: taskId, model: domainModel, todolistId: todolistId})
                    dispatch(action)
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error)=>{
                handleServerNetworkError(error, dispatch)
            })
    }


export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}