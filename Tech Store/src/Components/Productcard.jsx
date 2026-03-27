import './Productcard.css';
import '../App.css'

export default function Productcard({
  title,
  price,
  image,
  bestSeller,
  discount,
  iswishListed,
  addtoToggleList,
  addtocart,
  rating,
  brand, // Make sure to accept brand as a prop if we want to display it
  cartQuantity,
  onIncrease,
  onDecrease,
  onRemove
}) {


  const hasdiscount = discount && discount > 0;

  const discountedPrice = hasdiscount ? price - (price * discount) / 100 : price;

  return (
    <div className="product-card">

      {/* 🔥 Discount Badge (Top) */}
      {hasdiscount && (
        <span className="discount-badge">{discount}% OFF</span>
      )}

      <button
        className={`wishlist ${iswishListed ? "active" : ""}`}
        onClick={addtoToggleList}
        title={iswishListed ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        {iswishListed ? "❤️" : "🤍"}
      </button>

      <img src={image} alt={title} className="product-image" />

      <div className="product-header">
        <h2 className="product-title" title={title}>{title}</h2>
        {brand && <p className="product-brand">{brand}</p>}

        {/* ⭐ Rating Section */}
        <div className="rating-container">
          <span className="rater">
            {"⭐".repeat(Math.floor(rating))}
            <span className="rater">{"☆".repeat(5 - Math.floor(rating))}</span>
          </span>
          <span className="rating-number">({rating})</span>
          {/* ⭐ Best Seller Badge Moved Inside Rating row or next to it */}
          {bestSeller && (
            <span className="best-seller">Best Seller</span>
          )}
        </div>

        {/* 💰 Price Section */}
        <div className="price-row">
          <span className="final-price">₹{discountedPrice.toFixed(0)}</span>
          {hasdiscount && (
            <span className="original-price">₹{price}</span>
          )}
        </div>
        <>
          {cartQuantity > 0 ?
            <div className="cart-item-controls">
              {/* ➖ Decrease quantity */}
              <button className="qty-btn" onClick={onDecrease}>−</button>
              <span className="qty-display">{cartQuantity}</span>
              {/* ➕ Increase quantity */}
              <button className="qty-btn" onClick={onIncrease}>+</button>
              {/* 🗑️ Remove entirely */}
              <button className="remove-btn" onClick={onRemove}>🗑️</button>
            </div> :
            <button className="add-to-cart-button" onClick={addtocart}>Add to Cart</button>}
        </>
      </div>
    </div>
  );
}