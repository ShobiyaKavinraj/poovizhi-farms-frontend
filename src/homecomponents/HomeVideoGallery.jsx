import React, { useState, useRef, useEffect } from 'react';
import '../styles/videoStyle.css';

import video1 from '../assets/videos/video1.mp4';
import video2 from '../assets/videos/video2.mp4';
import video3 from '../assets/videos/video3.mp4';
import video4 from '../assets/videos/video4.mp4';
import video5 from '../assets/videos/video5.mp4';
import video6 from '../assets/videos/video6.mp4';

const videos = [
  { src: video1, title: 'From Flower to Tea: The Hibiscus Journey' },
  { src: video5, title: 'Golden Goodness: Crafting Turmeric Powder' },
  { src: video3, title: 'Avarampoo Wonders: Nature’s Skincare Secret' },
  { src: video4, title: 'Turmeric Farming: Rooted in Tradition' },
  { src: video2, title: 'Coconuts Uncovered: From Tree to Table' },
  { src: video6, title: 'Moringa Magic: One Tree, Endless Benefits' },
];

const HomeVideoGallery = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [volume, setVolume] = useState(1);
  const videoRefs = useRef([]);
  const scrollRef = useRef();
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleVideoClick = (index) => {
    if (activeIndex !== index) {
      videoRefs.current.forEach((video) => video && (video.muted = true));
      const video = videoRefs.current[index];
      if (video) {
        video.muted = false;
        video.volume = volume;
        video.play();
      }
      setActiveIndex(index);
    } else {
      const video = videoRefs.current[index];
      if (video) {
        video.pause();
        video.muted = true;
      }
      setActiveIndex(null);
    }
  };

  const handleCloseClick = () => {
    const video = videoRefs.current[activeIndex];
    if (video) {
      video.pause();
      video.muted = true;
    }
    setActiveIndex(null);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    if (activeIndex !== null) {
      const video = videoRefs.current[activeIndex];
      if (video) video.volume = e.target.value;
    }
  };

  // Drag to scroll (desktop & mobile)
  useEffect(() => {
    const container = scrollRef.current;

    const mouseDownHandler = (e) => {
      isDragging.current = true;
      startX.current = e.pageX - container.offsetLeft;
      scrollLeft.current = container.scrollLeft;
      container.classList.add('dragging');
    };

    const mouseMoveHandler = (e) => {
      if (!isDragging.current) return;
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      container.scrollLeft = scrollLeft.current - walk;
    };

    const mouseUpHandler = () => {
      isDragging.current = false;
      container.classList.remove('dragging');
    };

    container.addEventListener('mousedown', mouseDownHandler);
    container.addEventListener('mousemove', mouseMoveHandler);
    container.addEventListener('mouseup', mouseUpHandler);
    container.addEventListener('mouseleave', mouseUpHandler);

    return () => {
      container.removeEventListener('mousedown', mouseDownHandler);
      container.removeEventListener('mousemove', mouseMoveHandler);
      container.removeEventListener('mouseup', mouseUpHandler);
      container.removeEventListener('mouseleave', mouseUpHandler);
    };
  }, []);

  return (
    <div className="home-container">
      <div className="video-center">
        <h1 className="video-heading">Explore Our Natural Products</h1>
      </div>
      <div ref={scrollRef} className="video-scroll-container">
        {videos.map((video, index) => (
          <div className="video-wrapper" key={index}>
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className={`video ${activeIndex === index ? 'active' : ''}`}
              muted
              loop
              playsInline
              preload="metadata"
              onMouseEnter={() => videoRefs.current[index]?.play()}
              onMouseLeave={() => {
                if (videoRefs.current[index] && activeIndex !== index) {
                  videoRefs.current[index].pause();
                  videoRefs.current[index].currentTime = 0;
                }
              }}
              onClick={() => handleVideoClick(index)}
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p className="video-title">{video.title}</p>
            {activeIndex === index && (
              <>
                <button className="video-close-btn" onClick={handleCloseClick}>X</button>
                <div className="volume-control">
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={volume}
                    onChange={handleVolumeChange}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeVideoGallery;
