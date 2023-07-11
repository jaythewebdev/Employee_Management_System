import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ApproveLeave.css';
import ManagerBoard from './ManagerBoard';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ApproveLeave() {
  const [loggedItems, setLoggedItems] = useState([]);
  const [managerId, setManagerId] = useState(localStorage.getItem('id'));


  const getEmployeesByManagerId = () => {
    axios.get(`http://localhost:5002/api/Leave/GetEmployeesByManagerId/${managerId}`)
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


  const handleClick = async (leaveId) => {
    // Call the back-end API to update the approval status
    const response = await approveLeaveRequest(leaveId);
    // if (response) {
    //   setApprovalStatus(true);
    // }
  };

  const approveLeaveRequest = async (leaveId) => {
    try {
      const response = await fetch(`http://localhost:5002/api/Leave/ApproveLeaveRequest/${leaveId}`, {
        method: 'POST',
        body: JSON.stringify({ leaveId }),
        headers: {
          'accept':'*/*'
        }
      });
      if (response.ok) {
        const data = await response.json();
        getEmployeesByManagerId();
        console.log(data);
        return data;
      } else {
        throw new Error('Failed to approve leave request');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  return (
    <div className="Admin">
        <ManagerBoard/>
      <div className='approve-head'>
        <h1>Leave Request Details</h1>
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
                  <button
                    className={`statusButton ${'green'}`}
                    onClick={() => handleClick(item.leaveId)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ApproveLeave;