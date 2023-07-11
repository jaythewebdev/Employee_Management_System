import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeBoard from './EmployeeBoard';
import './ViewLeave.css';

function ViewLeave() {
    const [loggedItems, setLoggedItems] = useState([]);
    const[managerId,setManagerId]=useState(
        localStorage.getItem('id')
    )
  
    const getEmployeesByManagerId = () => {
      axios.get(`http://localhost:5002/api/Leave/GetLeaveRequestsByEmployeeId/${managerId}`)
        .then((response) => {
          setLoggedItems(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    useEffect(() => {
      getEmployeesByManagerId();
    }, []);


  return (
    <div>
        <EmployeeBoard/>
<div className="Admin">
    <div className='leave-head'>
        <h1>Leave Details</h1>
    </div>
      <div id="loggedItems">
        <table id="table">
          <thead>
            <tr>
              <th>Leave Id</th>
              <th>Emp Id</th>
              <th>Manager Id</th>
              <th>Start Date</th>
              <th>End date</th>
              <th>Reason</th>
              <th>NoOfDays</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loggedItems.map((item) => (
              <tr key={item.leaveId}>
                <td>{item.leaveId}</td>
                <td>{item.empId}</td>
                <td>{item.managerId}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.reason}</td>
                <td>{item.noOfDays}</td>
                <td>
                 {
                    item.approvalStatus ? 'Approved' : 'Not Approved'
                 }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
</div>
    
  );
}

export default ViewLeave;