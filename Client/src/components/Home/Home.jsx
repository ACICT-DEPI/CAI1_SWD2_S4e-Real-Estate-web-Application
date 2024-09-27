import React from 'react'
import image1 from '/images/house-1867187_640.jpg'
import './Home.css';


export default function Home() {
  return (
    <div className="home">
    <div className='container'>
        <div className='row '>
            <div className="col-md-5 title">

               <div className="tittle ">
               <h1>FIND YOUR DREAM PROPERTIES</h1>
               </div>

                <div className="description d-flex justify-content-center align-items-start flex-column">
                <span>  Find a variety of properties that suit you very easily </span>
                <span>Forget difficulties in finding a residence for you</span>
                </div>

               
           
            </div>

            <div className="col-md-7 image">

                <div className="image-container">
                <img src={image1} alt='state photo'/>
                </div>
            </div>

        </div>
      
    </div>
    </div>
  )
}
