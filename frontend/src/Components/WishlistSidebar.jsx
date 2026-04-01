import React from 'react';

function WishlistSidebar({
  isWishlistOpen,
  setIsWishlistOpen,
  wishlist,
  wishlistedItems,
  addtoCart,
  addtowishlist
}) {
  return (
    <>
      {/* Overlay for inner wishlist sidebar */}
      {isWishlistOpen && (
        <div className="cart-overlay" onClick={() => setIsWishlistOpen(false)}></div>
      )}

      {/* Wishlist Sidebar panel */}
      <div className={`cart-sidebar wishlist-sidebar ${isWishlistOpen ? "open" : ""}`}>
        <div className="cart-sidebar-header">
          <h3>❤️ Your Wishlist</h3>
          <button className="cart-close-btn" onClick={() => setIsWishlistOpen(false)}>✕</button>
        </div>

        {wishlist.length === 0 ? (
          <div className="cart-empty">
            <p>🤍 Your wishlist is empty</p>
            <p>Save items you love!</p>
          </div>
        ) : (
          <div className="cart-items-list">
            {wishlistedItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.name}</p>
                  <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
                  <div className="wishlist-actions">
                    <button
                      className="wishlist-add-cart-btn"
                      onClick={() => {
                        addtoCart(item);
                        // Optional: remove from wishlist after adding to cart
                        // addtowishlist(item.id); 
                      }}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => addtowishlist(item.id)}
                      title="Remove from Wishlist"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default WishlistSidebar;
