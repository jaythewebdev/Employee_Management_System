import React from "react"
import './ListEmployees.css'
import ManagerBoard from "./ManagerBoard";
import {useState,useEffect} from "react";
import ChangeStatus from "./ChangeStatus";

function ListEmployees(){
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

return(
    <div>
        <ManagerBoard/>
        <h1 className="list-head">Employee Details</h1>
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
            { users.filter((d)=>d.user .status !="Quit")
            .map((user) => (
                    <tr>
                            <td>{user.id}</td>
                            <td>{user.name}</td> 
                            <td>{user.dateOfBirth}</td>
                            <td>{user.gender}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.user.status}</td>
                    </tr>
            ))}    
    </table>
    </main>
    </div>
)
}

export default ListEmployees;
