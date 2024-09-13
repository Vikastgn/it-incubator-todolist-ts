import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {getListItemSx} from "./Todolist.styles";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type  TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const onRemoveHandler = () => {
        dispatch(removeTaskAC(props.task.id, props.todolistId))
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId))
    }
    const onChangeTitleHandler = useCallback ((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
    }, [props.task.id, props.todolistId])

    return <ListItem
        key={props.task.id}
        sx={getListItemSx (props.task.isDone)}>
        <div>
            <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        </div>
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </ListItem>
})