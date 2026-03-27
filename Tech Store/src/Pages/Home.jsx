// src/Pages/Home.jsx
import React from 'react';
import Hero from '../Components/Hero';

function Home({ scrollontop }) {
    return (
        <div>
            <Hero scrollontop={scrollontop} />
        </div>
    );
}

export default Home;
