import React, {useState} from 'react';
import './Header.css';
import { useNavigate, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import LogoutConfirmationModal from './LogoutConfirmationModal';

export default function Header() {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleLogin = () => {
    navigate('/login');
  }

  const handleLogout = async () => {
    setAuth({});
    navigate('/');
  }

  console.log(auth);
  console.log(auth?.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(isModalOpen);

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleConfirmLogout = () => {
        handleLogout();
        setIsModalOpen(false);
    };

    const handleCancelLogout = () => {
        setIsModalOpen(false); 
    };

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
            
						<NavLink to="/bookings" className="nav-link">
								Bookings
						</NavLink>

						<NavLink className="nav-link" to="/Favourites">
								Favourites
						</NavLink>

            {auth?.user? (
                    <>
                        <li className='nav-link'>Welcome!</li> {/* Display username */}
                        <li className='nav-item'>
                            <button className="btn text-white" style={{ width: '100px', backgroundColor: 'rgb(87, 87, 249)', marginLeft: '20px' }} onClick={handleLogoutClick}>Logout</button>
                        </li>
                    </>
                ) : (
                  <li className="nav-item">
                    <button className="btn text-white" style={{ width: '100px', backgroundColor: 'rgb(87, 87, 249)', marginLeft: '20px' }} onClick={handleLogin}>Log in</button>
                  </li>
                )}
          </ul>
        </div>
        {isModalOpen && (
                    <LogoutConfirmationModal
                        onConfirm={handleConfirmLogout}
                        onCancel={handleCancelLogout}
                    />
        )}
      </nav>
    </section>
  );
}
