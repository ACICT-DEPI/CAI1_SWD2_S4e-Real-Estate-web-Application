import './Recidencies.css';
import data from '../../utils/slider.json';
import { Link } from 'react-router-dom';

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
            {data.map((card, index) => (
              <div className="col-md-3 mb-4 d-flex align-items-stretch my-4" key={index}>
                <Link to={`/properties/${card._id}`} className="card" style={{ textDecoration: 'none', borderRadius: "10px" }}>
                  <img src={card.image} className="card-img-top w-100" alt="home" />
                  <div className="card-body d-flex flex-column">
                    <h5 className="price">
                      <span>$</span>
                      <span>{card.price}</span>
                    </h5>
                    <span className='name'>{card.title}</span>
                    <span className='detail'>{card.address} {card.city} {card.country}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
