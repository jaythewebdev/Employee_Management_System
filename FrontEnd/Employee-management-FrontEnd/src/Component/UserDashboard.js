import React from "react"
import { Link } from "react-router-dom"
import ManagerBoard from "./ManagerBoard";
import Profile from "./Profile";


function UserDashboard(){
return(
    <div>
        <ManagerBoard/>
        <Profile/>
    </div>
)
}

export default UserDashboard;
