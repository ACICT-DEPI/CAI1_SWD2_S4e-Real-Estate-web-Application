import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <section className="h-wrapper">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand ms-5" href="/">Homelist</a>

          <ul className="navbar-nav mb-2 mb-lg-0 ml-auto p-3">
            <li className="nav-item">
              <NavLink className="nav-link" to="/properties">Properties</NavLink>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="mailto:ap.@gmail.com">Contact</a>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/add">Add Property</NavLink>
            </li>
            
						<NavLink to="/bookings">
							<a className="nav-link" href="#">
								Bookings
							</a>
						</NavLink>

						<NavLink to="/Favourites">
							<a className="nav-link" href="#">
								Favourites
							</a>
						</NavLink>

            <li className="nav-item">
              <button className="btn text-white" style={{ width: '100px', backgroundColor: 'rgb(87, 87, 249)', marginLeft: '20px' }}>Log in</button>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
}
