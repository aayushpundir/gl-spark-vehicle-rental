import React, { useState, useEffect } from 'react'
import './HomePage.css'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [currentCarSlide, setCurrentCarSlide] = useState(0)
  const [currentCitySlide, setCurrentCitySlide] = useState(0)
  const [tripType, setTripType] = useState('daily')
  const [selectedCity, setSelectedCity] = useState('Bangalore')
  const [startDate, setStartDate] = useState('2026-04-08')
  const [endDate, setEndDate] = useState('2026-04-08')
  const [startTime, setStartTime] = useState('12:00')
  const [endTime, setEndTime] = useState('16:00')
  const [delivery, setDelivery] = useState(false)
  const navigate = useNavigate();

  const slides = [
    {
      id: 1,
      title: 'Drive Anytime, Anywhere',
      subtitle: 'Self-drive car rentals with unlimited freedom',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&h=600&fit=crop&crop=faces',
      color: '#ff8c00'
    },
    {
      id: 2,
      title: '31,000+ High Quality Cars',
      subtitle: 'Choose your perfect ride from our extensive fleet',
      image: 'https://images.unsplash.com/photo-1628947733273-cdae71c9bfd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      color: '#ff6b35'
    },
    {
      id: 3,
      title: 'Unlimited Kilometers',
      subtitle: 'No restrictions, drive as much as you want',
      image: 'https://images.unsplash.com/photo-1449034446853-66c86144b0ad?w=1200&h=600&fit=crop',
      color: '#f7931e'
    },
    {
      id: 4,
      title: '100% Trip Protection',
      subtitle: 'Safe, secure, and hassle-free drives guaranteed',
      image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&h=600&fit=crop',
      color: '#e67e22'
    }
  ]

  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoPlay])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setAutoPlay(false)
  }

  const nextCarSlide = () => {
    setCurrentCarSlide((prev) => (prev + 3) % topCars.length)
  }

  const prevCarSlide = () => {
    setCurrentCarSlide((prev) => (prev - 3 + topCars.length) % topCars.length)
  }

  const topCars = [
    { id: 1, name: 'Toyota Innova', year: 2024, type: 'Manual', fuel: 'Petrol', seats: 7, rating: 4.8, price: '₹349/hr', image: 'https://images.unsplash.com/photo-1748215210939-ad8b6c8c086d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: 'Maruti Swift', year: 2024, type: 'Automatic', fuel: 'Petrol', seats: 5, rating: 4.9, price: '₹189/hr', image: 'https://images.unsplash.com/photo-1732812606620-76b62e4f263e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: 'Hyundai Creta', year: 2024, type: 'Manual', fuel: 'Diesel', seats: 5, rating: 4.7, price: '₹279/hr', image: 'https://images.unsplash.com/photo-1748214547184-d994bfe53322?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'Honda City', year: 2023, type: 'Automatic', fuel: 'Petrol', seats: 5, rating: 4.6, price: '₹229/hr', image: 'https://images.unsplash.com/photo-1614152204567-04903fff36b0?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, name: 'Tata Nexon EV', year: 2024, type: 'Automatic', fuel: 'Electric', seats: 5, rating: 4.9, price: '₹249/hr', image: 'https://images.unsplash.com/photo-1629367121610-34e15c4c1f25?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 6, name: 'MG Hector', year: 2024, type: 'Manual', fuel: 'Petrol', seats: 7, rating: 4.8, price: '₹369/hr', image: 'https://images.unsplash.com/photo-1707381115267-24242c2462fd?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ]

  const categories = [
    { name: 'Sedans', image: '🚗', link: '/sedans' },
    { name: 'SUVs', image: '🏎️', link: '/suvs' },
    { name: 'Hatchbacks', image: '🚙', link: '/hatchbacks' },
    { name: 'Electric', image: '⚡', link: '/electric' },
  ]

  const useCases = [
    {
      title: 'Local Attractions',
      desc: 'Explore popular destinations and attractions',
      image: '🗺️'
    },
    {
      title: 'Business Travel',
      desc: 'Reliable transport for business meetings',
      image: '💼'
    },
    {
      title: 'Airport Transfers',
      desc: 'Comfortable rides to and from airport',
      image: '✈️'
    }
  ]

  const bookingSteps = [
    { step: 1, title: 'Visit Website', desc: 'Visit our website' },
    { step: 2, title: 'Search Cars', desc: 'Find and book your desired vehicle' },
    { step: 3, title: 'Verify Profile', desc: 'Complete KYC verification' },
    { step: 4, title: 'Ready to Drive', desc: 'Pick up car and start your journey' },
  ]

  const whyChoose = [
    { title: 'Hassle-Free & Secure', icon: '🛡️', desc: 'Safe and protected trips' },
    { title: '30,000+ Quality Cars', icon: '🚗', desc: 'Wide selection available' },
    { title: 'Delivery Anywhere', icon: '📍', desc: 'Flexible pickup locations' },
    { title: 'Pay Per Hour', icon: '⏰', desc: 'Drive without commitments' },
  ]

  const cities = [
    { name: 'Bangalore', image: 'https://images.unsplash.com/photo-1697130383976-38f28c444292?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Jaipur', image: 'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Kolkata', image: 'https://images.unsplash.com/photo-1626198226928-617fc6c6203e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Mumbai', image: 'https://images.unsplash.com/photo-1660145416818-b9a2b1a1f193?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Delhi', image: 'https://images.unsplash.com/photo-1678966432189-d58296e45ad2?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { name: 'Pune', image: 'https://images.unsplash.com/photo-1601039913996-d74e58095333?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ]

  const nextCitySlide = () => {
    setCurrentCitySlide((prev) => (prev + 1) % cities.length)
  }

  const prevCitySlide = () => {
    setCurrentCitySlide((prev) => (prev - 1 + cities.length) % cities.length)
  }

  const handleBookNowButton = () => {
  const token = localStorage.getItem("token");

  // Check if token exists and isn't just an empty string
  if (!token || token === "") {
    toast.info("Please login to book a vehicle");
    navigate("/login");
  } else {
    // Already logged in, go to the fleet
    navigate("/vehicles");
  }
};

  return (
    <div className="home-page">
      {/* Hero Slider Section with Sticky Booking Form */}
      <section className="hero-slider">
        {/* Sticky Booking Form */}
        <div className="sticky-booking-form">
          <div className="booking-form-header">
            <h3>Find Your Perfect Ride</h3>
          </div>

          {/* Trip Type Tabs */}
          <div className="trip-type-tabs">
            <button 
              className={`tab-btn ${tripType === 'daily' ? 'active' : ''}`}
              onClick={() => setTripType('daily')}
            >
              Daily
            </button>
            <button 
              className={`tab-btn ${tripType === 'subscription' ? 'active' : ''}`}
              onClick={() => setTripType('subscription')}
            >
              Subscribe
            </button>
            <button 
              className={`tab-btn ${tripType === 'weekday' ? 'active' : ''}`}
              onClick={() => setTripType('weekday')}
            >
              Weekday
            </button>
          </div>

          {/* Booking Form Inputs */}
          <div className="booking-form-content">
            {/* City Selection */}
            <div className="form-group">
              <select 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option>Bangalore</option>
                <option>Delhi</option>
                <option>Mumbai</option>
                <option>Pune</option>
                <option>Hyderabad</option>
                <option>Chennai</option>
              </select>
            </div>

            {/* Trip Start & End Date Row */}
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* Trip Start & End Time Row */}
            <div className="form-row">
              <div className="form-group">
                <input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            {/* Delivery Checkbox */}
            <div className="form-group checkbox-group">
              <input 
                type="checkbox" 
                id="delivery" 
                checked={delivery}
                onChange={(e) => setDelivery(e.target.checked)}
              />
              <label htmlFor="delivery">Delivery available</label>
            </div>

            {/* Search Button */}
            <button className="booking-search-btn">Search</button>
          </div>
        </div>

        <div className="slider-container">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="slide-content">
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-subtitle">{slide.subtitle}</p>
                <button className="cta-button" onClick={handleBookNowButton}>Book Now</button>
              </div>
              <div className="slide-overlay"></div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button className="slider-btn prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="slider-btn next" onClick={nextSlide}>
          &#10095;
        </button>

        {/* Slider Indicators */}
        <div className="slider-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            ></button>
          ))}
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-container">
          <h2>Plan Your Next Ride</h2>
          <div className="search-form">
            <input type="text" placeholder="Pick location" />
            <input type="date" />
            <input type="time" />
            <button className="search-btn">Search Cars</button>
          </div>
        </div>
      </section>

      {/* Top Cars Section */}
      <section className="top-cars-section">
        <div className="container">
          <div className="section-header">
            <h2>Top Cars in Your City</h2>
            <a href="/cars" className="browse-all">Browse All →</a>
          </div>
          
          {/* Cars Slider */}
          <div className="cars-slider-wrapper">
            <div className="cars-slider">
              {topCars.map((car, index) => (
                <div 
                  key={car.id} 
                  className={`car-card ${index >= currentCarSlide && index < currentCarSlide + 3 ? 'visible' : 'hidden'}`}
                  style={{ 
                    transform: `translateX(calc(-${currentCarSlide * (100/3)}%))`,
                    opacity: index >= currentCarSlide && index < currentCarSlide + 3 ? 1 : 0,
                    pointerEvents: index >= currentCarSlide && index < currentCarSlide + 3 ? 'auto' : 'none'
                  }}
                >
                  <div className="car-image">
                    <img src={car.image} alt={car.name} />
                  </div>
                  <div className="car-info">
                    <h3>{car.name}</h3>
                    <div className="car-specs">
                      <span className="spec">{car.year}</span>
                      <span className="spec">{car.type}</span>
                      <span className="spec">{car.fuel}</span>
                      <span className="spec">{car.seats} Seats</span>
                    </div>
                    <div className="car-footer">
                      <div className="rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating-value">{car.rating}</span>
                      </div>
                      <div className="price">{car.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Controls */}
            <button className="car-slider-btn prev" onClick={prevCarSlide}>
              &#10094;
            </button>
            <button className="car-slider-btn next" onClick={nextCarSlide}>
              &#10095;
            </button>

            {/* Slider Indicators */}
            <div className="car-slider-indicators">
              {[...Array(Math.ceil(topCars.length / 3))].map((_, idx) => (
                <button
                  key={idx}
                  className={`indicator ${currentCarSlide === idx * 3 ? 'active' : ''}`}
                  onClick={() => setCurrentCarSlide(idx * 3)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <div className="container">
          <h2 className="section-title">Why Choose RentX?</h2>
          <div className="why-choose-grid">
            {whyChoose.map((item, idx) => (
              <div key={idx} className="why-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="why-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Top Categories</h2>
          <div className="categories-grid">
            {categories.map((cat, idx) => (
              <div key={idx} className="category-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="category-icon">{cat.image}</div>
                <h3>{cat.name}</h3>
                <a href={cat.link} className="category-link">Explore →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Steps Section */}
      <section className="booking-steps-section">
        <div className="container">
          <h2 className="section-title">How to Book a Car on RentX</h2>
          <div className="steps-grid">
            {bookingSteps.map((item, idx) => (
              <div key={idx} className="step-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="step-number">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="usecases-section">
        <div className="container">
          <h2 className="section-title">Perfect for Every Journey</h2>
          <div className="usecases-grid">
            {useCases.map((item, idx) => (
              <div key={idx} className="usecase-card" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="usecase-icon">{item.image}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Hit the Road?</h2>
          <p>Join thousands of happy customers and start your journey with RentX today</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Book Now</button>
            <button className="cta-btn secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card" style={{ animationDelay: '0.1s' }}>
              <div className="testimonial-header">
                <div className="avatar">👨‍💼</div>
                <div>
                  <h4>Rajesh Kumar</h4>
                  <p className="stars">★★★★★</p>
                </div>
              </div>
              <p className="testimonial-text">
                Excellent service! The car was in perfect condition and booking was super easy. Highly recommend!
              </p>
            </div>
            <div className="testimonial-card" style={{ animationDelay: '0.2s' }}>
              <div className="testimonial-header">
                <div className="avatar">👩‍💼</div>
                <div>
                  <h4>Priya Singh</h4>
                  <p className="stars">★★★★★</p>
                </div>
              </div>
              <p className="testimonial-text">
                Amazing experience! Customer support is 24/7 and very responsive. Best rental service ever!
              </p>
            </div>
            <div className="testimonial-card" style={{ animationDelay: '0.3s' }}>
              <div className="testimonial-header">
                <div className="avatar">👨‍🔧</div>
                <div>
                  <h4>Vikram Patel</h4>
                  <p className="stars">★★★★★</p>
                </div>
              </div>
              <p className="testimonial-text">
                Loved the variety of cars. Found the perfect SUV for my family trip. Will definitely book again!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="cities-section">
        <div className="container">
          <h2 className="section-title">RentX Around All Over India</h2>
          
          {/* Cities Carousel */}
          <div className="cities-carousel-wrapper">
            <div className="cities-carousel">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className={`city-carousel-card ${index >= currentCitySlide && index < currentCitySlide + 3 ? 'visible' : 'hidden'}`}
                  style={{
                    backgroundImage: `url(${city.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="city-overlay"></div>
                  <h3 className="city-name">{city.name}</h3>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <button className="city-carousel-btn prev" onClick={prevCitySlide}>
              &#10094;
            </button>
            <button className="city-carousel-btn next" onClick={nextCitySlide}>
              &#10095;
            </button>

            {/* Carousel Indicators */}
            <div className="city-carousel-indicators">
              {[...Array(Math.ceil(cities.length / 3))].map((_, idx) => (
                <button
                  key={idx}
                  className={`city-indicator ${currentCitySlide === idx * 3 ? 'active' : ''}`}
                  onClick={() => setCurrentCitySlide(idx * 3)}
                ></button>
              ))}
            </div>
          </div>  
        </div>
      </section>
    </div>
  )
}

export default HomePage
