import React from 'react'
import AppWithRedux from "./AppWithRedux";
import {store} from "./state/store";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default  {
    title: 'AppWithRedux Component',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
return <AppWithRedux/>
}