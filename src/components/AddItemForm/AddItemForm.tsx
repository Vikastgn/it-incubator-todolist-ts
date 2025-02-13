import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox'
import TextField from '@mui/material/TextField'

type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}
export const AddItemForm = React.memo(({addItem, disabled=false}: AddItemFormPropsType) => {
    console.log("AddItemForm is called")
    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
       if (error !== null) {
           setError(null);
       }
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            addItem(title.trim());
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    return <div>
        <TextField
            disabled={disabled}
            label="Enter a title"
            variant={'outlined'}
            className={error ? 'error' : ''}
            value={title}
            size={'small'}
            error={!!error}
            helperText={error}
            onChange={onChangeHandler}
            onKeyUp={onKeyPressHandler}
        />
        <IconButton onClick={addTask} color={'primary'} disabled={disabled}>
            <AddBoxIcon />
        </IconButton>
    </div>
})