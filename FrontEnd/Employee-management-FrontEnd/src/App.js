import './App.css';
import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from "./Component/Login.js"
import Home from "./Component/Home.js"
import Register from './Component/Register';
import ManagerBoard from './Component/ManagerBoard';
import ListEmployees from './Component/ListEmployees';
import UserDashboard from './Component/UserDashboard';
import ChangeStatus from './Component/ChangeStatus';
import ApproveLeave from './Component/ApproveLeave';
import EmployeeBoard from './Component/EmployeeBoard';
import EmployeeDashboard from './Component/EmployeeDashboard';
import EmployeeProfile from './Component/EmployeeProfile'
import UpdateProfile from './Component/UpdateProfile';
import LeaveRequest from './Component/LeaveRequest';
import ViewLeave from './Component/ViewLeave';
import AlertBoxProfile from './Component/AlertBoxProfile';
import './App.css'

function App() {
  return (
<BrowserRouter>
        <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='Login' element={<Login/>}/> 
        <Route path='Register' element={<Register/>}/> 
        <Route path='/UserDashboard/' element={<UserDashboard/>}/> 
        <Route path='/ManagerBoard/' element={<ManagerBoard/>}/> 
        <Route path='ListEmployees' element={<ListEmployees/>}/> 
        <Route path='ChangeStatus' element={<ChangeStatus/>}/> 
        <Route path='ApproveLeave' element={<ApproveLeave/>}/> 
        <Route path='/EmployeeDashboard/' element={<EmployeeDashboard/>}/> 
        <Route path='/UpdateProfile/' element={<UpdateProfile/>}/>
        <Route path='LeaveRequest' element={<LeaveRequest/>}/>
        <Route path='/ViewLeave/' element={<ViewLeave/>}/>
        <Route path='/AlertBoxProfile/' element={<AlertBoxProfile/>}/>

      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
