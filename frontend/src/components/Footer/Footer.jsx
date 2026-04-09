import React from 'react'
import './Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <div className="footer-logo">
            <span className="footer-logo-text">
              <span className="footer-logo-first-letter">R</span>entX
            </span>
          </div>
          <p className="footer-description">
            Your trusted partner for convenient and affordable vehicle rentals. Experience premium service with affordable prices.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">f</a>
            <a href="#" className="social-icon">𝕏</a>
            <a href="#" className="social-icon">📷</a>
            <a href="#" className="social-icon">in</a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/vehicles">Browse Vehicles</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3 className="footer-heading">Services</h3>
          <ul className="footer-links">
            <li><a href="/rental">Car Rental</a></li>
            <li><a href="/insurance">Insurance Options</a></li>
            <li><a href="/delivery">Delivery Service</a></li>
            <li><a href="/support">24/7 Support</a></li>
            <li><a href="/loyalty">Loyalty Program</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="contact-info">
            <li>
              <span className="contact-icon">📞</span>
              <a href="tel:+1234567890">+1 (234) 567-890</a>
            </li>
            <li>
              <span className="contact-icon">✉️</span>
              <a href="mailto:info@rentx.com">info@rentx.com</a>
            </li>
            <li>
              <span className="contact-icon">📍</span>
              <span>123 Motor Lane, Car City, CC 12345</span>
            </li>
            <li>
              <span className="contact-icon">🕐</span>
              <span>24/7 Available</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} RentX. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/privacy">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="/terms">Terms of Service</a>
            <span className="divider">|</span>
            <a href="/cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
