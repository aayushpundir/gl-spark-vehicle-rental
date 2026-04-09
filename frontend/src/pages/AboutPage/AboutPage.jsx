import React from 'react'
import './AboutPage.css'

const AboutPage = () => {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-overlay"></div>
        <div className="about-hero-content">
          <h1>About RentX</h1>
          <p>Your journey, your car, your freedom 🚗</p>
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="about-intro container">
        <div className="about-intro-wrapper">

          {/* IMAGE */}
          <div className="about-intro-image"></div>

          {/* CONTENT */}
          <div className="about-intro-content">
            <h2>Who We Are</h2>
            <p className="about-description">
              RentX is a next-generation self-drive car rental platform designed to give you complete freedom.
              Whether it's a weekend getaway, daily commute, or long road trip — we provide flexible, affordable,
              and hassle-free mobility solutions across India.
            </p>

            <div className="about-highlights">
              <div className="highlight-card">
                <span>🚗</span>
                <div>
                  <h4>30,000+ Cars</h4>
                  <p>Wide variety across all categories</p>
                </div>
              </div>

              <div className="highlight-card">
                <span>⚡</span>
                <div>
                  <h4>Instant Booking</h4>
                  <p>Book your ride in seconds</p>
                </div>
              </div>

              <div className="highlight-card">
                <span>🛡️</span>
                <div>
                  <h4>Safe & Secure</h4>
                  <p>100% trip protection</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="about-mission">
        <div className="container mission-grid">
          <div className="mission-card">
            <h3>🚀 Our Mission</h3>
            <p>
              To revolutionize mobility by offering convenient, affordable, and reliable car rentals
              for everyone.
            </p>
          </div>

          <div className="mission-card">
            <h3>🌍 Our Vision</h3>
            <p>
              To become India’s most trusted self-drive platform, empowering millions to travel freely.
            </p>
          </div>

          <div className="mission-card">
            <h3>💡 Our Values</h3>
            <p>
              Customer-first approach, transparency, innovation, and safety in every journey.
            </p>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="about-why container">
        <h2>Why Choose RentX?</h2>

        <div className="about-why-grid">
          <div className="about-card">
            <span>🚗</span>
            <h3>Wide Car Selection</h3>
            <p>From hatchbacks to SUVs & EVs</p>
          </div>

          <div className="about-card">
            <span>⚡</span>
            <h3>Instant Booking</h3>
            <p>Fast & seamless booking experience</p>
          </div>

          <div className="about-card">
            <span>🛡️</span>
            <h3>Safe & Secure</h3>
            <p>100% trip protection guaranteed</p>
          </div>

          <div className="about-card">
            <span>📍</span>
            <h3>Multiple Cities</h3>
            <p>Available across India</p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="about-stats">
        <div className="container stats-grid">
          <div>
            <h2>30,000+</h2>
            <p>Cars Available</p>
          </div>
          <div>
            <h2>50+</h2>
            <p>Cities Covered</p>
          </div>
          <div>
            <h2>1M+</h2>
            <p>Happy Customers</p>
          </div>
          <div>
            <h2>24/7</h2>
            <p>Support</p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="about-team container">
        <h2>Meet Our Team</h2>

        <div className="team-grid">
          <div className="team-card">
            <div className="avatar">👨‍💼</div>
            <h4>Ayush Pundir</h4>
            <p>Founder & CEO</p>
          </div>

          <div className="team-card">
            <div className="avatar">👨‍💻</div>
            <h4>Priyanshu</h4>
            <p>Product Head</p>
          </div>

          <div className="team-card">
            <div className="avatar">👨‍🔧</div>
            <h4>Aditya Verma</h4>
            <p>Operations Lead</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <h2>Start Your Journey Today</h2>
        <p>Book your ride now and experience the freedom of driving</p>
        <button>Book Now</button>
      </section>

    </div>
  )
}

export default AboutPage