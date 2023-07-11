import React, { useState } from "react";
import "./EmployeeProfile.css"
import { Link } from "react-router-dom";
import image from '../Images/emp-profile.jpg';
import { useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.css'

const EmployeeProfile = () => {
    const[employee,setEmployee]=useState(
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
        }
      )
      const[profile,setProfile]=useState({
          "userId":localStorage.getItem('id')
      });
  
      useEffect(()=>{
        fetch("http://localhost:5201/api/User/action/View_Profile",{
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
                setEmployee(myData);
            }
        })
        .catch((err)=>{
            console.log(err.error)
        })
      });
  
    return (
    <div className="form-container-prof" >
        <div className="image-container">
        <img src= {image}  className="form-image" />
        </div>
        <div>
            <div className="profileEmp">
                <h3>Name:</h3>
                <p>{employee.name}</p>
            </div>

            <div  className="profileEmp">
            <h3>Date of Birth:</h3>
            <p>{employee.dateOfBirth}</p>
            </div>

            <div  className="profileEmp">
            <h3>Age:</h3>
            <p>{employee.age}</p>
            </div>

            <div className="profileEmp">
            <h3>Address:</h3>
            <p>{employee.address}</p>
            </div>

            <div  className="profileEmp">
            <h3>Gender:</h3>
            <p>{employee.gender}</p>
            </div>

            <div  className="profileEmp">
            <h3>Email:</h3>
            <p>{employee.email}</p>
            </div>

            <div  className="profileEmp">
            <h3>Passport:</h3>
            <p>{employee.passport}</p>
            </div>

            <div  className="profileEmp">
            <h3>Phone Number:</h3>
            <p>{employee.phone}</p>
            </div>

            <div  className="profileEmp">
            <h3>DL Number:</h3>
            <p>{employee.drivingLicenseNumber}</p>
            </div>
            <div  className="profileEmp">
            <h3>Passport Number:</h3>
            <p>{employee.passport}</p>
            </div>
            
        </div>
        <div className="profile-foot-btn">
            <Link to="/UpdateProfile/">
                <button>Edit Profile</button>
            </Link>
        </div>

    </div>

    );
  };
  
  export default EmployeeProfile;