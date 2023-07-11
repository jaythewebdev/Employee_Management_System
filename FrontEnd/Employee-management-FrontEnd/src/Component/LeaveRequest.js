import React, { useState } from 'react';
import './UpdateProfile';
import EmployeeBoard from './EmployeeBoard';
import { useNavigate } from 'react-router-dom';


function LeaveRequest() {
  const [leave, setLeave] = useState({
   "empId": 0,
    "managerId": 0,
    "startDate": new Date(),
    "endDate": new Date(),
    "noOfDays": 0,
    "reason": "",
    "approvalStatus": true,
    "approvedDate": new Date()
  });

  const navigate=useNavigate();

  const apply = () => {
    console.log(leave);
    fetch('http://localhost:5002/api/Leave/CreateLeaveRequest', {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...leave, Leave: {} }),
    })
      .then(async (data) => {
        if (data.status === 200) {
          var myData = await data.json();
          console.log(myData);
          alert('Leave applied successfully');
          navigate('/EmployeeDashboard/');
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
  };

  return (
    <div>
        <EmployeeBoard/>
        <div className='approve-head'>
            <h1>Request Leave</h1>
        </div>
<div className="form-container-update">
         <div className="up-prof">
          {/* <label htmlFor="fromDate">Emp Id</label> */}
          <input
            type="number"
            id="fromDate"
            className="up-prof-input"            
            placeholder="Employee Id"
            onChange={(event) => {
              setLeave({ ...leave, "empId": event.target.value });
            }}
          />
        </div>
        <div className="up-prof">
          {/* <label htmlFor="fromDate">Manager Id</label> */}
          <input
            type="number"
            id="fromDate"
            className="up-prof-input"            
            placeholder="Manager Id"
            onChange={(event) => {
              setLeave({ ...leave, "managerId": event.target.value });
            }}
          />
        </div>
        <div className="up-prof">
          {/* <label htmlFor="duration">Start Date</label> */}
          <input
            type="datetime-local"
            id="duration"
            className="up-prof-input"            
            placeholder="Start Date"
            onChange={(event) => {
              setLeave({ ...leave, "startDate": event.target.value });
            }}
          />
        </div>
        <div className="up-prof">
          {/* <label htmlFor="duration">End Date</label> */}
          <input
            type="datetime-local"
            id="duration"
            className="up-prof-input"            
            placeholder="End Date"
            onChange={(event) => {
              setLeave({ ...leave, "endDate": event.target.value });
            }}
          />
        </div>
        <div className="up-prof">
          {/* <label htmlFor="duration">Reason</label> */}
          <input
            type="text"
            id="duration"
            className="up-prof-input"            
            placeholder="Reason"
            onChange={(event) => {
              setLeave({ ...leave, "reason": event.target.value });
            }}
          />
        </div>
        <div className="prof-btn">
          <button type="submit" className="up-prof-btn" onClick={apply}>
            Apply
          </button>
        </div>
      </div>
    </div>
      
  );
}

export default LeaveRequest;