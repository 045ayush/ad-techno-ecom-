import React from 'react';
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

// Custom styles for the carousel
const carouselItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '400px', // Default height for desktop
  width: '100%',
  overflow: 'hidden',
  position: 'relative', // Ensure proper positioning for responsive adjustments
};

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover', // Ensure the image covers the container without distortion
};

// Media query for responsive adjustments
const responsiveStyles = `
  @media (max-width: 768px) {
    .carousel-item {
      height: 250px; // Adjust height for tablets and mobile devices
    }
  }

  @media (max-width: 480px) {
    .carousel-item {
      height: 200px; // Further adjust height for small mobile devices
    }
  }
`;

const items = mainCarousalData.map((image, index) => (
  <div
    style={carouselItemStyle}
    key={index}
    className='carousel-item'
  >
    <img
      className='cursor-pointer'
      role='presentation'
      src={image}
      alt={`Carousal Image ${index + 1}`}
      style={imageStyle}
    />
  </div>
));

const MainCarousel = () => (
  <>
    <style>{responsiveStyles}</style>
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
  </>
);

export default MainCarousel;


