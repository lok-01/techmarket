import React from 'react';

function About() {
  return (
    <div className="fade-up" style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-color)' }}>
      {/* Hero Section for About */}
      <div style={{ 
        height: '400px', 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '10px' }}>Tech MARKET</h1>
          <p style={{ fontSize: '1.5rem', fontWeight: '300' }}>Heaven of world for Tech Enthusiasts</p>
        </div>
      </div>

      <div className='about-content-wrapper'>
        <div className='about-grid'>
          <div className='about-text-content'>
            <h2 className='about-section-title'>Our Quality Promise</h2>
            <p className='about-paragraph'>
              At <strong>Tech MARKET</strong>, we don't just sell gadgets; we provide high-performance tech solutions 
              crafted for the modern world. Every product in our catalog undergoes rigorous quality testing 
              to ensure it meets the highest standards of durability and performance.
            </p>
            <p className='about-paragraph'>
              Whether you are looking for the latest flagship smartphones, crystal-clear professional audio, 
              or high-speed computing hardware, we bring you the world's most trusted brands all in one place.
            </p>
          </div>
          <div className='about-image-container'>
            <img 
              src="https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Quality Tech" 
              className='about-img' 
            />
          </div>
        </div>

        <div className='about-services-section'>
          <h2 className='about-section-title centered'>What We Provide</h2>
          <div className='services-grid'>
            <div className='service-card'>
              <div className='service-icon'>📱</div>
              <h3>Premium Smartphones</h3>
              <p>The latest flagships from top global brands with full warranty.</p>
            </div>
            <div className='service-card'>
              <div className='service-icon'>🎧</div>
              <h3>Audio Excellence</h3>
              <p>Professional grade headphones and speakers for the audiophile in you.</p>
            </div>
            <div className='service-card'>
              <div className='service-icon'>💻</div>
              <h3>Computing Power</h3>
              <p>Laptops and desktops configured for speed and heavy-duty productivity.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
