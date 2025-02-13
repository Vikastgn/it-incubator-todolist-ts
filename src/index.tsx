import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from "react-redux";
import {store} from "./app/store";
import App from "./app/App";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {TodolistsList} from "./features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <Navigate to="/404"/>,
        children: [
            {
                index: true,
                element: <Navigate to="/todolists"/>
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/todolists",
                element: <TodolistsList/>,
            },
        ],
    },
    {
        path: "/404",
        element: <ErrorSnackbar/>
    },
]);

ReactDOM.render(
    <Provider store={store}>
            <RouterProvider router={router}/>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
