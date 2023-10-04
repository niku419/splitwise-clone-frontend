import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import GroupUsers from './GroupUsers';
import GroupExpenses from './GroupExpenses';
import CreateGroup from './CreateGroup';
import Navbar from './Navbar';
import UserExpenses from './UserExpenses';
import Main from './Main';

export default function Home() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/signin' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/splitwise' element={<Dashboard />} />
                <Route path='/:id/expenses' element={<GroupExpenses />} />
                <Route path='/:id/users' element={<GroupUsers />} />
                <Route path='/createGroup' element={<CreateGroup />} />
                <Route path='user/:id/expenses' element={<UserExpenses />} />
            </Routes>
        </div>
        
    )
}
