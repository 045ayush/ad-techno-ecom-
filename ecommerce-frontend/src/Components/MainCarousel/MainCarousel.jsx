import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import mainCarousalData from './MainCarousalData';

// Custom styles for dots
const dotStyle = {
  backgroundColor: '#64748B', // Slate 800
  border: '2px solid #64748B ', // Slate 800
  width: '8px', // Size of the dot
  height: '8px', // Size of the dot
  borderRadius: '50%',
  margin: '0 4px', // Space between dots
};

const activeDotStyle = {
  backgroundColor: '#1F2937', // Slate 600
  border: '2px solid #1F2937', // Slate 600
};

// Set aspect ratio (e.g., 16:9)
const ASPECT_RATIO = 563 / 1600;

// Custom styles for the carousel
const imageStyle = {
  width: '100%', // Always take full width
  height: '100%', // Height adjusts based on the container
  objectFit: 'contain', // Ensure the image doesn't crop and fits within the container
};

// MainCarousel component
const MainCarousel = () => {
  const [carouselHeight, setCarouselHeight] = useState(window.innerWidth * ASPECT_RATIO);

  // Function to adjust height based on screen width (to maintain aspect ratio)
  const updateCarouselHeight = () => {
    const screenWidth = window.innerWidth;
    setCarouselHeight(screenWidth * ASPECT_RATIO); // Height dynamically adjusts to maintain aspect ratio
  };

  // Add event listener on window resize
  useEffect(() => {
    updateCarouselHeight(); // Set initial height
    window.addEventListener('resize', updateCarouselHeight);
    return () => window.removeEventListener('resize', updateCarouselHeight); // Cleanup on unmount
  }, []);

  const items = mainCarousalData.map((image, index) => (
    <div
      key={index}
      className='carousel-item'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: `${carouselHeight}px`, // Dynamic height based on screen width
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <img
        className='cursor-pointer'
        role='presentation'
        src={image}
        alt={`Carousel Image ${index + 1}`}
        style={imageStyle}
      />
    </div>
  ));

  return (
    <div className=''>
      <AliceCarousel
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={2000}
      infinite
      renderDotsItem={({ isActive }) => (
        <div
          style={isActive ? { ...dotStyle, ...activeDotStyle } : dotStyle}
        />
      )}
    />
    </div>
  );
};

export default MainCarousel;
