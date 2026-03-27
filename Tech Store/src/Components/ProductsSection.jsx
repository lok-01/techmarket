import React from 'react';
import Productcard from './Productcard';

function ProductsSection({
  searchTerm,
  SetsearchTerm,
  selectbrand,
  setselectbrand,
  allbrands,
  sort,
  setSort,
  displayProducts,
  cartItem,
  wishlist,
  addtoCart,
  addtowishlist,
  decreaseQuantity,
  removeFromCart,
  topRef
}) {
  return (
    <div className="fade-up">
      <div className='product-section'>
        <h2>Featured Products</h2>

        {/* ✅ FILTER BAR: Search + Brand Filter + Sort */}
        <div className='filter-bar'>

          {/* 🔍 Search Input */}
          <div className='search-wrapper'>
            <span className='search-icon'>🔍</span>
            <input
              type="text"
              className='search-input'
              placeholder='Search products...'
              value={searchTerm}
              onChange={(e) => SetsearchTerm(e.target.value)}
            />
          </div>

          {/* 🏷️ Brand Filter Dropdown */}
          <select
            className='filter-select'
            value={selectbrand}
            onChange={(e) => setselectbrand(e.target.value)}
          >
            <option value="All">All Brands</option>
            {allbrands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          {/* 📊 Sort Dropdown */}
          <select
            className='filter-select'
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="rating-high">Rating: High → Low</option>
            <option value="rating-low">Rating: Low → High</option>
          </select>
        </div>

        {/* ✅ Product Grid */}
        <div className="fade-up">
          <div className='product-container' ref={topRef}>
            {displayProducts.length > 0 ? (
              displayProducts.map((product) => {
                const cartProduct = cartItem.find(item => item.id === product.id);
                const cartQuantity = cartProduct ? cartProduct.quantity : 0;

                return (
                  <Productcard
                    key={product.id}
                    title={product.name}
                    price={product.price}
                    image={product.image}
                    bestSeller={product.bestSeller}
                    discount={product.discount}
                    rating={product.rating}
                    addtocart={() => addtoCart(product)}
                    addtoToggleList={() => addtowishlist(product.id)}
                    iswishListed={wishlist.includes(product.id)}
                    cartQuantity={cartQuantity}
                    onIncrease={() => addtoCart(product)}
                    onDecrease={() => decreaseQuantity(product.id)}
                    onRemove={() => removeFromCart(product.id)}
                  />
                );
              })
            ) : (
              <div className='no-products'>
                <p>😕 No products found. Try a different search or filter!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsSection;
