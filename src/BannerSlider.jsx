import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ✅ AccessibleSlide Component
function AccessibleSlide({ children, isActive }) {
  return (
    <div
      className="banner-slide"
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      inert={!isActive ? '' : undefined} // Optional if browser supports
    >
      {children}
    </div>
  );
}

// ✅ BannerSlider Component
function BannerSlider({ slides }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    accessibility: true,
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  return (
    <Slider {...settings}>
      {slides.map((slide, index) => (
        <AccessibleSlide key={index} isActive={index === currentSlide}>
          <img src={slide.image} alt={slide.title} className="slide-image" />
          <h2>{slide.title}</h2>
          <button tabIndex={index === currentSlide ? 0 : -1}>
            Learn More
          </button>
        </AccessibleSlide>
      ))}
    </Slider>
  );
}

export default BannerSlider;
