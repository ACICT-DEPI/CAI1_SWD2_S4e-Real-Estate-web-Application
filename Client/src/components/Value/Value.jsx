import React from 'react'
import {Accordion , AccordionItem , AccordionItemHeading , AccordionItemButton , AccordionItemPanel , AccordionItemState}
from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import './Value.css'
import data from '../../utils/Accordion'
import img1 from'../../../public/images/valueImage.png'

export default function Value() {
  return (
    <section style={{background:"rgb(217, 215, 215)"}}>
        <div className="container ">
            <div className="row">
            <h1 className='text-center' style={{color:"#1f3e72" , marginTop:"80px"}}>Why Choose Us</h1>
            <p style={{color:"gray" , textAlign:'center'}}>We provide full service at every step</p>


                <div className="col-md-6 my-4">

                    <Accordion allowMultipleExpanded={false} preExpanded={[0]}
                    className='accordion'
                    >
                        {
                            data.map((item , index) =>{
                                return(
                                    <AccordionItem className='accordionItem'  key={index} uuid={index}>
                                        <AccordionItemHeading>
                                            <AccordionItemButton >
                                              
                                                <span style={{marginLeft:"20px" , color:"#1f3e72"}}>{item.heading}</span>
                                                <div className="icon">
                                                    {/* <MdOutlineArrowDropDown size={20}/> */}
                                                </div>
                                                
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            <p style={{color:"gray"}}>
                                                {item.detail}
                                            </p>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                )
                            })


                    }

                    </Accordion>
 
                </div>

                <div className="col-md-6 my-4">
                    <img src={img1} alt='house' className='imageV'/>
                  
                </div>

            </div>
        </div>
      
    </section>
  )
}
