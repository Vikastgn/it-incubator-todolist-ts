import React, {ChangeEvent, useCallback} from 'react'
import {FilterValuesType} from "./AppWithRedux";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch} from "react-redux";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    addTask: (title: string, todolistId: string) => void
}

export const Todolist = React.memo( (props: PropsType) =>{
    console.log("Todolist is called")
    const dispatch = useDispatch()
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback ( (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask,props.id])

    const onAllClickHandler = useCallback( () => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback( () => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback( () => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    let tasksForTodolist =  props.tasks;

    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <List>
                {
                    props.tasks.map(t => <Task
                        key={t.id}
                        task={t}
                        todolistId={props.id}/>)
                }

            </List>
            <Box sx={filterButtonsContainerSx}>
                <Button
                    variant={props.filter === 'all' ? 'outlined' : 'text'}
                    color={'inherit'}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    variant={props.filter === 'active' ? 'outlined' : 'text'}
                    color={'primary'}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    color={'secondary'}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </Box>
        </div>
    )
})
