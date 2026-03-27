import React from 'react';

function CartSidebar({ 
  isCartOpen, 
  setIsCartOpen, 
  cartItem, 
  decreaseQuantity, 
  addtoCart, 
  removeFromCart, 
  cartcount, 
  cartsum 
}) {
  return (
    <>
      {/* Overlay — dark background behind sidebar, clicking it closes the cart */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      )}

      {/* Sidebar — the actual cart panel */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-sidebar-header">
          <h3>🛒 Your Cart</h3>
          <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        {cartItem.length === 0 ? (
          <div className="cart-empty">
            <p>🛒 Your cart is empty</p>
            <p>Add some products!</p>
          </div>
        ) : (
          <>
            {/* ✅ Cart items list — .map() to render each item */}
            <div className="cart-items-list">
              {cartItem.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                    <div className="cart-item-controls">
                      {/* ➖ Decrease quantity */}
                      <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>−</button>
                      <span className="qty-display">{item.quantity}</span>
                      {/* ➕ Increase quantity — reuses addtoCart! */}
                      <button className="qty-btn" onClick={() => addtoCart(item)}>+</button>
                      {/* 🗑️ Remove entirely */}
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                    </div>
                  </div>
                  <p className="cart-item-subtotal">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            {/* ✅ Cart summary — total and pay button */}
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Total Items:</span>
                <span>{cartcount}</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>Total Price:</span>
                <span>₹{cartsum.toLocaleString()}</span>
              </div>
              <button className="proceed-btn">Proceed to Pay →</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartSidebar;
