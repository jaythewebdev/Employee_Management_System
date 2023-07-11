import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./ManagerBoard.css"
import { useState } from "react";
import './EmployeeBoard.css'

function EmployeeBoard(){

        const [isEmployeeDropdownVisible, setEmployeeDropdownVisible] = useState(false);
      
        const toggleDropdownEmployees = () => {
            setEmployeeDropdownVisible(!isEmployeeDropdownVisible);
        };
      
        const closeDropdownEmployees = (e) => {
          if (!e.target.classList.contains('dropbtn')) {
            setEmployeeDropdownVisible(false);
          }
        };

        const [isDropdownVisible, setDropdownVisible] = useState(false);
      
        const toggleDropdown = () => {
          setDropdownVisible(!isDropdownVisible);
        };
      
        const closeDropdown = (e) => {
          if (!e.target.classList.contains('dropbtn')) {
            setDropdownVisible(false);
          }
        };
        const navigate=useNavigate();
        const logout = () => {
            localStorage.removeItem("id");
            navigate("/");
        };

    return(
        <div>
            <div className="navbar">
                <div className="nav-left">
                <Link to='/EmployeeDashboard/'>Profile</Link>
                <Link to='/UpdateProfile/'>Update</Link>

            <div className="dropdown">
                <div onClick={closeDropdownEmployees}>
                    <button className="dropbtn" onClick={toggleDropdownEmployees}>
                        Employees
                    </button>
                    {isEmployeeDropdownVisible && (
                        <div id="myDropdown" className="dropdown-content show">
                         <Link to='/LeaveRequest/'>Request Leave</Link>
                         <Link to='/ViewLeave/'>View Leave</Link>
                        </div>
                    )}
                </div>
            </div>
            {/* <div className="dropdown">
                <div onClick={closeDropdown}>
                    <button className="dropbtn" onClick={toggleDropdown}>
                        Requests
                    </button>
                    {isDropdownVisible && (
                        <div id="myDropdown" className="dropdown-content show">
                            <Link >All Request</Link>
                            <Link to='/ApproveLeave/'>Approve Request</Link>
                        </div>
                    )}
                </div>
                    </div> */}
                </div>
            <div className="nav-right">
                <a onClick={logout}>Logout</a>
            </div>  
            </div>
        </div>
    );
}


export default EmployeeBoard;