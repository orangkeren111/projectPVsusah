import React, { useState, useEffect } from "react";
import "./corousel.css";

const ShowSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      src: "https://i.ytimg.com/vi/0MfA3xOmwRM/maxresdefault.jpg",
      caption: "Coming Soon ",
    },
    {
      src: "https://i.ytimg.com/vi/rSaDBNovkhs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCnzbcZhreIAGYOh2_6NANt6dor_g.jpg",
      caption:"Coming Soon ",
    },
    {
      src: "https://i.ytimg.com/vi/c4QVQlcPzxU/maxresdefault.jpg",
      caption:"Coming Soon ",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 2000);

    return () => clearInterval(interval); 
  }, [slides.length]);

  return (
    <div className="slideshow-container" style={{backgroundColor:"white", overflowX:"hidden", overflowY:"hidden"}}>
      {slides.map((slide, index) => (
        <div
          key={index} 
          className={`mySlide ${index === currentSlide ? "active" : ""}`}
          style={{ display: index === currentSlide ? "block" : "none", width:"100vw",height:"42vw", overflowx:"hidden", position:"relative"}}
        >
          <img src={slide.src} alt={`Slide ${index + 1}` } style={{width:"100%", height:"100%", objectFit:"fill"}}/>
          <div style={{marginLeft:"80rem", fontSize:"32px", color:"yellow", position:"absolute"}}className="text">{slide.caption}</div>
        </div>
      ))}
    </div>
  );
};

export default ShowSlides;
