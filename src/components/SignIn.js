import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className=" d-flex flex-column justify-content-center align-content-center fade-in"
      style={{
        backgroundImage: 'url(/images/landing-background.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <h1 id="header-text">DESTINATION GUIDES</h1>
      <Button type="button" size="lg" className="copy-btn" onClick={signIn} id="skeo-button">
        SIGN IN
      </Button>
    </div>
  );
}

export default Signin;
