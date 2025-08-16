import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/layout/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Register from '../pages/login/Register';
import Dashboard from '../pages/dashboard/Dashboard';

export const router = createBrowserRouter([

    {
        path: '/',
        element: <Layout></Layout>,
        children:[
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>,
               
            }
        ]
    },

]);