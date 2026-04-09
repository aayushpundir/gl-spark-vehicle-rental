import React from 'react'
import './ContactPage.css'

const ContactPage = () => {
  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="contact-overlay"></div>
        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>We’re here to help you 24/7 🚗</p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section container">
        <div className="contact-wrapper">

          {/* LEFT INFO */}
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>
              Have questions or need assistance? Reach out to us anytime.
              Our support team is always ready to help you.
            </p>

            <div className="contact-details">
              <div className="contact-card">
                <span>📍</span>
                <div>
                  <h4>Location</h4>
                  <p>New Delhi, India</p>
                </div>
              </div>

              <div className="contact-card">
                <span>📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>+91 98765 43210</p>
                </div>
              </div>

              <div className="contact-card">
                <span>📧</span>
                <div>
                  <h4>Email</h4>
                  <p>support@rentx.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="contact-form">
            <h2>Send a Message</h2>

            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Subject" />
              <textarea placeholder="Your Message" rows="5"></textarea>

              <button type="submit">Send Message</button>
            </form>
          </div>

        </div>
      </section>

      {/* MAP SECTION */}
      <section className="contact-map">
        <iframe
          title="map"
          src="https://maps.google.com/maps?q=Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
        ></iframe>
      </section>

      {/* CTA */}
      <section className="contact-cta">
        <h2>Need Help Booking?</h2>
        <p>Our team is ready to assist you anytime</p>
        <button>Book a Car</button>
      </section>

    </div>
  )
}

export default ContactPage