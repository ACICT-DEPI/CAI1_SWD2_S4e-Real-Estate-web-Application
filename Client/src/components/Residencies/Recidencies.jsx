import React from 'react';
import './Recidencies.css';
import data from '../../utils/slider.json';

export default function Recidencies() {
  return (
    <section>
      <div className='container m-auto my-5 d-flex justify-content-between flex-wrap'>
        <div className="row">

          <div className="head">
            <span>Best Choices</span>
            <h3>Popular Residencies</h3>
          </div>

          <div className="row">
            {
              data.map((card, index) => (
                <div className="col-md-3 mb-4 d-flex align-items-stretch my-4" key={index}>
                  <div className="card " style={{ borderRadius: "10px" }}>
                    <img src={card.image} className="card-img-top w-100" alt="home" />
                    <div className="card-body d-flex flex-column">
                      <h5 className="price">
                        <span>$</span>
                        <span>{card.price}</span>
                      </h5>
                      <span className='name'>{card.name}</span>
                      <span className='detail'>{card.detail}</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          
        </div>
      </div>
    </section>
  );
}
