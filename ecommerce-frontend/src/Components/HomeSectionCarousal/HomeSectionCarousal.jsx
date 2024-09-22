import React, { useRef, useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
// import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

export const HomeSectionCarousal = ({data,sectionName}) => {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(4); // Default for desktop
  const [isMobile, setIsMobile] = useState(false);
  const [itemHeight, setItemHeight] = useState("350px"); // Set default height

  const totalItems = data.length;

  const items = data.map((item, index) => (  
    <div
      key={index}
      style={{
        paddingRight:"10px",
        paddingLeft:"10px",
        padding: "10px", // Set equal padding for top and bottom
        height: itemHeight, 
        display: "flex", 
        alignItems: "center", // Center vertically
      }}
      className="carousel-item"

    >
      <ProductCard product={item} />
    </div>
  ));

  // Determine responsiveness and mobile state
  useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setItemsPerSlide(1.3);
        setItemHeight("350px"); // Increase height for mobile
        setIsMobile(true);
      } else if (width >= 480 && width < 720) {
        setItemsPerSlide(2.3);
        setItemHeight("350px"); // Medium height for small tablets
        setIsMobile(false);
      } else if (width >= 720 && width < 1024) {
        setItemsPerSlide(3.3);
        setItemHeight("350px"); // Adjust height for larger tablets
        setIsMobile(false);
      } else {
        setItemsPerSlide(4);
        setItemHeight("350px"); // Default height for desktops and laptops
        setIsMobile(false);
      }
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);

    return () => {
      window.removeEventListener("resize", updateItemsPerSlide);
    };
  }, []);

  const slidePrev = () => {
    if (carouselRef.current && activeIndex > 0) {
      carouselRef.current.slidePrev();
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const slideNext = () => {
    if (carouselRef.current && activeIndex < totalItems - itemsPerSlide) {
      carouselRef.current.slideNext();
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const onSlideChanged = (e) => {
    setActiveIndex(e.item);
  };

  return (
    <div className="relative">
      
      <div
        className=" py-5 border rounded-lg bg-slate-50"
        style={{
          overflow: "hidden",
        }}
      >
        <h2 className="text-2xl font-extrabold text-slate-800 pl-6 pt-3 pb-2">{sectionName}</h2>
        <AliceCarousel
          items={items}
          responsive={{
            0: { items: itemsPerSlide },
            480: { items: itemsPerSlide },
            720: { items: itemsPerSlide },
            1024: { items: 5 },
          }}
          disableDotsControls
          activeIndex={activeIndex}
          onSlideChanged={onSlideChanged}
          ref={carouselRef}
          mouseTracking
          touchTracking
          disableButtonsControls
        />

        {!isMobile && activeIndex > 0 && (
          <Button
            variant="contained"
            onClick={slidePrev}
            className="z-40 bg-white"
            sx={{
              position: "absolute",
              top: "50%",
              left: "0rem",
              transform: "translateX(-50%) translateY(-50%) rotate(-90deg)",
              bgcolor: "white",
              '&:hover': {
                bgcolor: 'slate-500',  // Hover color
              },
              '&:active': {
                bgcolor: 'slate-500',  // Active color
              },
            }}
            aria-label="prev"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}

        {!isMobile && activeIndex < totalItems - Math.floor(itemsPerSlide) && (
          <Button
            variant="contained"
            onClick={slideNext}
            className="z-40 bg-white"
            sx={{
              position: "absolute",
              top: "50%",
              right: "0rem",
              transform: "translateX(50%) translateY(-50%) rotate(90deg)",
              bgcolor: "white",
              '&:hover': {
                bgcolor: 'slate-500',  // Hover color
              },
              '&:active': {
                bgcolor: 'slate-500',  // Active color
              },
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousal;
