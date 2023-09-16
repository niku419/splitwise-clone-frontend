import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import GroupUsers from './GroupUsers';
import GroupExpenses from './GroupExpenses';

export default function Home() {
    return (
        <Routes>
            <Route path='/signin' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/splitwise' element={<Dashboard />} />
            <Route path='/expenses' element={<GroupExpenses />} />
            <Route path='/users' element={<GroupUsers />} />
        </Routes>
    )
}
