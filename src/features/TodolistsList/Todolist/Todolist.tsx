import React, {useCallback, useEffect} from 'react'
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Box, Button, IconButton, List} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {filterButtonsContainerSx} from "./Todolist.styles";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType, TodolistDomainType} from "../todolists-reducer";

type PropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
}

export const Todolist = React.memo( ({demo = false, ...props}: PropsType) =>{
    console.log("Todolist is called")

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id)
    }
    const changeTodolistTitle = useCallback ( (newTitle: string) => {
        props.changeTodolistTitle(props.todolist.id, newTitle)
    }, [props.changeTodolistTitle, props.todolist.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask,props.todolist.id])

    const onAllClickHandler = useCallback( () => props.changeFilter("all", props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onActiveClickHandler = useCallback( () => props.changeFilter("active", props.todolist.id), [props.changeFilter, props.todolist.id]);
    const onCompletedClickHandler = useCallback( () => props.changeFilter("completed", props.todolist.id), [props.changeFilter, props.todolist.id]);

    let tasksForTodolist =  props.tasks;

    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    return (
        <div>
            <h3><EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === "loading"}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === "loading"}/>
            <List>
                {
                    tasksForTodolist.map(t => <Task
                        key={t.id}
                        task={t}
                        todolistId={props.todolist.id}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                    />)
                }

            </List>
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </Box>
        </div>
    )
})
