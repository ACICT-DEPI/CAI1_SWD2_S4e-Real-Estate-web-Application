import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import '../Footer/Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="text-center " style={{marginTop:"50px"}}>
            <h3>Do You Need Help With Anything?</h3>
            <p>
              Receive updates, hot deals, tutorials, discounts sent straight to
              your inbox every month.
            </p>
          </div>
        </div>
      </div>
      <div className="icons text-center ">
        <a href="https://www.facebook.com">
          <FaFacebook size={30} />
        </a>
        <a href="https://www.twitter.com">
          <FaTwitter size={30} />
        </a>
        <a href="mailto:your-email@gmail.com">
          <SiGmail size={30} />
        </a>
        <a href="https://www.linkedin.com">
          <FaLinkedin size={30} />
        </a>
      </div>
    </footer>
  );
}
