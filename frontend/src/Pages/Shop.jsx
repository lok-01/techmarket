// src/Pages/Shop.jsx
import React from 'react';
import ProductsSection from '../Components/ProductsSection';

function Shop({
    searchTerm, SetsearchTerm, selectbrand, setselectbrand, allbrands, sort, setSort,
    displayProducts, cartItem, wishlist, addtoCart, addtowishlist, decreaseQuantity,
    removeFromCart, topRef
}) {
    return (
        <div>
            <ProductsSection
                searchTerm={searchTerm} SetsearchTerm={SetsearchTerm}
                selectbrand={selectbrand} setselectbrand={setselectbrand}
                allbrands={allbrands} sort={sort} setSort={setSort}
                displayProducts={displayProducts} cartItem={cartItem} wishlist={wishlist}
                addtoCart={addtoCart} addtowishlist={addtowishlist}
                decreaseQuantity={decreaseQuantity} removeFromCart={removeFromCart} topRef={topRef}
            />
        </div>
    );
}

export default Shop;
