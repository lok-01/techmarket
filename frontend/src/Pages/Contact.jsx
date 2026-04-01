import React from 'react';

function Contact() {
  return (
    <div className="fade-up" style={{ padding: '80px 40px', textAlign: 'center', minHeight: '60vh' }}>
      <h1>Contact Us</h1>
      <p style={{ marginBottom: '40px' }}>Have questions? We'd love to hear from you!</p>

      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Name</label>
            <input type="text" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Your Name" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Email</label>
            <input type="email" style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} placeholder="Your Email" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label>Message</label>
            <textarea style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '150px' }} placeholder="Your Message"></textarea>
          </div>
          <button type="submit" style={{
            padding: '12px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Send Message
          </button>
        </form>
      </div>

      <div style={{ marginTop: '60px' }}>
        <p>📍 Heaven of world</p>
        <p>📞 9493223996</p>
        <p>✉️ lokesh06.dev@gmail.com</p>
      </div>
    </div>
  );
}

export default Contact;
