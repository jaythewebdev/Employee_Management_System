import React from "react"
import { Link } from "react-router-dom"
import './AlertBoxProfile.css'
import EmployeeBoard from "./EmployeeBoard";

function AlertBoxProfile(){
return(
    <div>
        <EmployeeBoard/>
        <div className="whole-container">
        <div className="alert-confirm">
            <div className="alert-container">
                <div className="alert-card">
                    <div className="alert-card-header">
                        <div class="alert-icon-box">
                                <i class="material-icons">&#xE876;</i>
                        </div>
                    </div>
                    <div alert-extra>
                    <div className="alert-divs alert-h">
                        <h2>Awesome!</h2>
                    </div>
                    <div className="alert-divs">
                        <p>Your Profile has been updated. Check your profile for details.</p>
                    </div>
                    <div class="alert-card-footer alert-divs">
                        <Link to='/EmployeeDashboard/'><button class="alert-btn">OK</button></Link>
                    </div> 
                    </div> 
                </div>
            </div>  
        </div>
    </div>
</div>  
)
}

export default AlertBoxProfile;
