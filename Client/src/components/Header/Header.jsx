import React from 'react'
import './Header.css'
import {  NavLink } from 'react-router-dom'


export default function Header() {
  return (
   <section className='h-wrapper'>

<nav class="navbar navbar-expand-lg bg-light p-4  navbar-dark bg-dark fixed-top" >
  <div class="container-fluid ">
    
    <a className="navbar-brand ms-5 " href="#">Homelist</a>
   
   
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav  mb-2 mb-lg-0 ml-auto">

        <NavLink to="/properties"><a className="nav-link" href="#">Properties</a></NavLink>
        <a className="nav-link" href="mailto:ap.@gmail.comm">Contact</a>
        <NavLink to="/add"> <a className="nav-link" href="#">Add Property</a></NavLink>
        <button className='btn  text-white ' style={{ width:"100px" , backgroundColor:"rgb(87, 87, 249)" , marginLeft:"20px"}}>Log in</button>




      {/* <a class="nav-link" href="#">Properties</a>
        <a class="nav-link" href="#">Contact</a>
        <a class="nav-link" href="#">Add Property</a>
        <button className='btn  text-white ' style={{ width:"100px" , backgroundColor:"rgb(87, 87, 249)" , marginLeft:"20px"}}>Log in</button>
       */}
      </ul>
      
    </div>
  </div>
</nav>


    
    {/* <nav class="navbar navbar-expand-lg bg-light p-4  navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">GNMJ</a>
   
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

      <div class="navbar-nav ml-auto">
        <a class="nav-link" href="#">Properties</a>
        <a class="nav-link" href="#">Contact</a>
        <a class="nav-link" href="#">Add Property</a>
        <button className='btn btn-info'>Log in</button>
        
      </div>
    </div>
  </div>
</nav> */}

  
   </section>
  )
}
