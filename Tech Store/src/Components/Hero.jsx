import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'

const Hero = ({ scrollontop }) => {
  const navigate = useNavigate();
  return (
    <div className="fade-up">
      <div className='hero-section'>
        <div className='hero-main'>
          <div className='hero-content'>
            <h1>Welcome to Tech MARKET</h1>
            <p>The Heaven of health and tech gadgets for enthusiasts everywhere.</p>
          </div>
          <div className='hero-buttons'>
            <button className='shop-now-button' onClick={() => navigate('/shop')}>Shop Now</button>
            <button className='explore-button' onClick={scrollontop}>Explore</button>
          </div>
        </div>
        <div className='hero-achievements'>
          <div className='achievement'>
            <h2>1000+</h2>
            <p>Products</p>
          </div>
          <div className='achievement'>
            <h2>5000+</h2>
            <p>Happy Customers</p>
          </div>
          <div className='achievement'>
            <h2>50+</h2>
            <p>Brands</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
