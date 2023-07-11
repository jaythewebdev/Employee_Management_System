import React from "react"
import { Link } from "react-router-dom"
import "./Home.css"

function Home(){
return(
<header class="header">
      <div class="banner">
        <h1>
          {/* Welcome <br /> */}
          Employee Management System
        </h1>
        <h2>One stop employee management platform .</h2>
        <Link className="btn-link" to="Register"><button className='banner-btn' >Register</button></Link>
        <p>If Already Registered user ?</p>
        <Link to="/Login/"> <button className='banner-btn'>Login</button></Link>
      </div>
</header>
)
}

export default Home;
