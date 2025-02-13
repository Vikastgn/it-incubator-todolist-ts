import {EditableSpan} from './EditableSpan';
import {action} from '@storybook/addon-actions'
import React from 'react'

export default  {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const callback = action ("Value changed")

export const EditableSpanBaseExample = () => {
return <EditableSpan title={"Start value"} onChange={callback}/>
}