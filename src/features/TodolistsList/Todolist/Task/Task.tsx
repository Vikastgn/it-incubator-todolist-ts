import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {getListItemSx} from "../Todolist.styles";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material"
import {TaskStatuses, TaskType} from "../../../../api/todolists-api";

type  TaskPropsType = {
    task: TaskType
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("Task change status")
        const newStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        props.changeTaskStatus(props.task.id, newStatus, props.todolistId);
    }

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId])

    return <ListItem
        key={props.task.id}
        sx={getListItemSx (props.task.status === TaskStatuses.Completed)}>
        <div>
            <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeStatusHandler}/>
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        </div>
        <IconButton onClick={onRemoveHandler}>
            <Delete/>
        </IconButton>
    </ListItem>
})