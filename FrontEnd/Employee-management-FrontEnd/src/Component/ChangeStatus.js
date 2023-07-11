import React from "react"
import './ListEmployees.css'
import ManagerBoard from "./ManagerBoard";
import {useState,useEffect} from "react";
// import ChangeStatus from "./ChangeStatus";

function ChangeStatus(){
    const[users,setUsers]=useState([
        {
                "id": 0,
                "user": {
                  "userId": 0,
                  "passwordHash": "",
                  "passwordKey": "",
                  "role": "",
                  "status": ""
                },
                "managerId":0 ,
                "name": "",
                "dateOfBirth": "",
                "age": 0,
                "gender": "",
                "phone": "",
                "email": "",
                "address": "",
                "passport": "",
                "drivingLicenseNumber": ""
        }]
    );
    const[profile,setProfile]=useState({
        "userId":localStorage.getItem('id')
    });

    const[user,setUser]=useState(
        {
            "id": 0,
            "status":''
        }
    );

    const viewEmployees=()=>{
        fetch("http://localhost:5201/api/User/action/List_All_Employees",{
            "method":"POST",
            headers:{
                "accept":"text/plain",
                "Content-Type":"application/json",
            },
            "body":JSON.stringify({...profile,"profile":{} })
        })
        .then(async (data)=>{
            if(data.status >= 200 && data.status<=300){
                var myData = await data.json();
                console.log(myData);
                setUsers(myData);
            }
        })
        .catch((err)=>{
            console.log(err.error)
        })
    };

    useEffect(() => {
        viewEmployees();
      }, []);

      const changeStatus=(myData)=>{
        fetch("http://localhost:5201/api/User/action/Update_User_Status",{
            "method":"PUT",
            headers:{
                "accept":"text/plain",
                "Content-Type":"application/json",
            },
            "body":JSON.stringify(myData)
        })
        .then(async (data)=>{
            if(data.status >= 200 && data.status<=300){
                var myData = await data.json();
                console.log(myData);
                viewEmployees();
                // navigate("/UserDashboard/");
            }
        })
        .catch((err)=>{
            console.log(err.error)
        })
    }
return(
    <div>
        <ManagerBoard/>
        <h1 className="list-head">Change Employee Status</h1>
    <main>
    <table>
            <tr>
            <th>UserId</th>
            <th>Name</th>
            <th>D.O.B</th>
            <th>Gender</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Status</th>
            </tr>
            { users.filter((d)=>d.user.status !="Quit")
            .map((user) => (
                    <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.dateOfBirth}</td>
                            <td>{user.gender}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>
                            <select value={user.user.status} onChange={(e)=>{
                                changeStatus({
                                        "id":user.id,
                                        "status":e.target.value
                                }
                                )
                            }
                            }>
                                <option value="">Select an option..</option>
                                <option value="Active">Active</option>
                                <option value="InActive">InActive</option>
                                <option value="Quit">Quit</option>
                            </select>
                            </td>
                    </tr>
            ))}    
    </table>
    </main>
    </div>
)
}

export default ChangeStatus;
