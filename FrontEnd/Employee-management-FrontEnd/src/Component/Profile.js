import React from "react"
import "./Profile.css"
import { useState,useEffect } from "react";

function Profile(){
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
return(
<div>
<div class="center">
<div class="card">
  <div class="additional">
    <div class="user-card">
      <div class="points center">
        {employee.user.role}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"  width="110" height="110" viewBox="0 0 650 650" role="img" aria-labelledby="title desc" class="center">
      <defs>
        <clipPath id="circular-border">
          <circle cx="300" cy="300" r="280"></circle>
        </clipPath>
        <clipPath id="avoid-antialiasing-bugs">
          <rect width="100%" height="498" />
        </clipPath>
      </defs>
      <circle cx="300" cy="300" r="280" fill="#0074D9" clipPath="url(#avoid-antialiasing-bugs)" />
      <circle cx="300" cy="230" r="115" fill="#FFFFFF" />
      <circle cx="300" cy="550" r="205" fill="#fff" clipPath="url(#circular-border)" />
    </svg>
    </div>
    <div class="more-info">
      <h1>{employee.name}</h1>
      <div class="coords">
        <span>Employee ID</span>
        <span>{employee.id}</span>
      </div>
      <div class="coords">
        <span>  Phone</span>
        <span>{employee.phone}</span>
      </div>
      <div class="coords">
        <span>Email</span>
        <span>{employee.email}</span>
      </div>
      <div class="coords">
        <span>Passport Number</span>
        <span>{employee.passport}</span>
      </div>
      <div class="coords">
        <span>Driving License Number</span>
        <span>{employee.drivingLicenseNumber}</span>
      </div>
      <div class="stats">
        <div>
          <div class="title">Status</div>
          <i class="fa fa-trophy"></i>
          <div class="value">{employee.user.status}</div>
        </div>
        <div>
          <div class="title">Age</div>
          <i class="fa fa-gamepad"></i>
          <div class="value">{employee.age}</div>
        </div>
        <div>
          <div class="title">Gender</div>
          <i class="fa fa-group"></i>
          <div class="value">{employee.gender}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="general">
    <h1>{employee.name}</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.</p>
    <span class="more">Mouse over the card for more info</span>
  </div>
</div>
</div>
</div>
);
}

export default Profile;