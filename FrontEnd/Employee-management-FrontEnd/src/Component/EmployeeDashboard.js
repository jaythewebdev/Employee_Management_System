import React from "react"
import EmployeeBoard from "./EmployeeBoard";
import EmployeeProfile from "./EmployeeProfile"
import ManagerBoard from "./ManagerBoard";
import {Link} from 'react-router-dom';

function EmployeeDashboard(){
return(
    <div>
        <EmployeeBoard/>
        <EmployeeProfile/>
    </div>
)
}

export default EmployeeDashboard;