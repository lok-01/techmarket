import React from 'react';
import { Link } from 'react-router-dom';
import User from './User'
import '../App.css'

const MyNavbar = ({
  cartcount,
  cartsum,
  wishlistLength,
  isDarkMode,
  setIsDarkMode,
  setIsCartOpen,
  setIsWishlistOpen
}) => {
  return (
    <div className='Nav-bar'>
      <div className='nav-brand-wrapper'>
        <span className='logo'>📱 <span className='logo-txt'>TECH MARKET</span></span>

        {/* ✅ Mobile-only Action Icons (Top Bar) */}
        <div className='nav-mobile-top-actions'>
          <span className='nav-icon' onClick={() => setIsCartOpen(true)}>
            🛒{cartcount > 0 && <span className='badge mini-badge'>{cartcount}</span>}
          </span>
          <span className='nav-icon' onClick={() => setIsWishlistOpen(true)}>
            ❤️{wishlistLength > 0 && <span className='badge mini-badge pink'>{wishlistLength}</span>}
          </span>
          <label htmlFor="menu-toggle" className="menu-icon">☰</label>
        </div>
      </div>

      <input type="checkbox" id="menu-toggle" />

      <div className='nav-menu'>
        {/* ✅ Close button for mobile sidebar */}
        <label htmlFor="menu-toggle" className="close-menu-icon">&times;</label>

        <div className='nav-links'>
          <Link to="/">Home</Link>
          <Link to="/shop">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className='nav-actions'>
          <button className='login-button'>Login</button>
          <button className='signup-button'>Sign Up</button>
          <User />

          {/* ✅ Desktop-only icons (hidden on mobile drawer) */}
          <div className='nav-desktop-actions'>
            <span className='cart-icon' onClick={() => setIsCartOpen(true)}>
              🛒
              {cartcount > 0 && <span className='badge'>{cartcount}</span>}
              {cartsum > 0 && <span className='cart-total'>₹{cartsum.toLocaleString()}</span>}
            </span>

            <span className='cart-icon' onClick={() => setIsWishlistOpen(true)}>
              ❤️
              {wishlistLength > 0 && <span className='badge wishlist-badge'>{wishlistLength}</span>}
            </span>
          </div>

          <button className='theme-toggle-btn' onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyNavbar;
