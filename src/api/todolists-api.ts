import axios from 'axios'
import {TodolistDomainType} from "../features/TodolistsList/todolists-reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '7c06a92d-3328-4fd3-8a18-92d13c312f1a',
    },
})

export const todolistAPI = {
    getTodolists() {
        return  instance.get<TodolistDomainType[]>('todo-lists')
    },
    createTodolist(title: string){
      return instance.post<ResponseType<{item: TodolistType}>>('todo-lists',{title})
    },
    deleteTodolist(id: string){
      return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${id}`, { title })
    },
    getTasks(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTasks(todolistId: string, taskId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTasks(todolistId: string, taskTitle: string){
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: taskTitle})
    },
    updateTasks(todolistId: string, taskId: string, model: UpdateTaskModelType){
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType){
        return instance.post<ResponseType<{userId?: number}>>('auth/login',data)
    },
    logout(){
        return instance.delete<ResponseType<{userId?: number}>>('auth/login')
    },
    me() {
        return instance.get<ResponseType<{id: number, email: string, login: number}>>('auth/me')
    }
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldErrorType[]
    data: D
}
export type FieldErrorType = {
    error: string
    field: string
}
export enum TaskStatuses {
    New = 0,
    InProgress =1,
    Completed = 2,
    Draft = 3,
}
export enum TaskPriorities {
    Low = 0,
    Middle =1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export  type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskModelType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
