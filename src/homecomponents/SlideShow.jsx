import React from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';
import '../styles/slideShow.css';

const SlideShow = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: true,
    pauseOnHover: true,
  };

  const slides = [
    {
      image: "/slide1.jpg",
      title: "Organic Avarampoo Tea",
      description: "Boost immunity with premium turmeric",
      button: "Shop Avarampoo Powder",
      link: "/products/8",
      category: "Herbs",
      badge: "20% OFF",
      color: "#fff8e1",
      buttonColor: "#ffca28"

    },
    {
      image: "/slide2.jpg",
      title: "Fresh Hibiscus Tea",
      description: "Rich in antioxidants and flavor",
      button: "Explore Hibiscus",
      link: "/products/2",
      category: "Tea",
      badge: "NEW",
      color: "#fff8e1",
buttonColor: "#ffca28"

    },
    {
      
  image: "/slide3.jpg",
  title: "Organic Turmeric Powder",
  description: "High-quality turmeric powder for health and flavor.",
  button: "Shop Now",
  link: "/products/9",
  category: "Spices & Herbs",
  badge: "Best Seller",
  color: "#fff8e1",
  buttonColor: "#ffca28"
     
},

    {
      image: "/slide4.jpg",
      title: "Moringa Powder",
      description: "Loaded with antioxidants & vitamins",
      button: "Order Now",
      link: "/products/4",
      category: "Herbs",
      badge: "HOT",
      color: "#fff8e1",
buttonColor: "#ffca28"

    }
  ];

  return (
    <div className="banner-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div className="banner-slide" key={index}>
            <img src={slide.image} alt={slide.title} />
            <div className="badge-top-left">{slide.category}</div>
            <div className="badge-top-right">{slide.badge}</div>
            <div className="banner-overlay">
              <h2 style={{ color: slide.color }}>{slide.title}</h2>
              <p>{slide.description}</p>
              {slide.button && (
                <button
                  onClick={() => navigate(slide.link)}
                  style={{ backgroundColor: slide.buttonColor }}
                >
                  {slide.button}
                </button>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideShow;
