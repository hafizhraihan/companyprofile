"use client";
import React, { useRef, useEffect } from "react";

export default function PartnersCarousel({ logos }) {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    let animationId;
    let scrollAmount = 0.5;
    function animate() {
      if (carousel) {
        carousel.scrollLeft += scrollAmount;
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    }
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate logos for seamless loop
  const allLogos = Array.isArray(logos) ? [...logos, ...logos] : [];

  return (
    <div className="partners-carousel-wrapper">
      <div className="partners-carousel" ref={carouselRef}>
        {Array.isArray(allLogos) && allLogos.map((logo, idx) => (
          <div className="carousel-logo" key={idx}>
            <img src={logo} alt="Partner logo" />
          </div>
        ))}
      </div>
      <style jsx>{`
        .partners-carousel-wrapper {
          overflow: hidden;
          width: 100%;
          background: #fff;
          padding: 1.5rem 0;
        }
        .partners-carousel {
          display: flex;
          gap: 3rem;
          width: max-content;
          min-width: 100%;
          align-items: center;
          scroll-behavior: auto;
        }
        .carousel-logo {
          flex: 0 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 60px;
        }
        .carousel-logo img {
          width: 100px;
          height: 60px;
          object-fit: contain;
          filter: grayscale(0.2) contrast(1.1);
          opacity: 0.85;
          transition: opacity 0.2s;
        }
        .carousel-logo img:hover {
          opacity: 1;
        }
        @media (max-width: 700px) {
          .partners-carousel {
            gap: 1.5rem;
          }
          .carousel-logo img {
            width: 70px;
            height: 40px;
          }
        }
      `}</style>
    </div>
  );
} 