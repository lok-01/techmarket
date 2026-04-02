import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Createcontext';
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
  const { user, isLoggedIn, isAdmin, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
          {isAdmin && <Link to="/admin" className="admin-nav-link">Dashboard</Link>}
        </div>

        <div className='nav-actions'>
          {/* Auth buttons: show Login/Signup OR User info + Logout */}
          {!isLoggedIn ? (
            <>
              <Link to="/login"><button className='login-button'>Login</button></Link>
              <Link to="/signup"><button className='signup-button'>Sign Up</button></Link>
            </>
          ) : (
            <div className='nav-user-info'>
              <span className='nav-username'>
                {isAdmin ? "👑" : "👤"} {user?.username}
              </span>
              <button className='logout-button' onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

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

