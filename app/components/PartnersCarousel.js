"use client";
import React from "react";

export default function PartnersCarousel({ logos }) {
  // Duplicate logos for seamless loop (at least 4x for smoothness)
  const allLogos = Array.isArray(logos) ? [...logos, ...logos, ...logos, ...logos] : [];

  return (
    <div className="partners-carousel-fade-wrapper">
      <div className="partners-carousel-wrapper">
        <div className="partners-carousel seamless-carousel">
          {Array.isArray(allLogos) && allLogos.map((logo, idx) => (
            <div className="carousel-logo" key={idx}>
              <img src={logo} alt="Partner logo" />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-fade carousel-fade-left" />
      <div className="carousel-fade carousel-fade-right" />
      <style jsx>{`
        .partners-carousel-fade-wrapper {
          position: relative;
          width: 100%;
          background: #fff;
          padding: 1.5rem 0;
        }
        .partners-carousel-wrapper {
          overflow: hidden;
          width: 100%;
        }
        .partners-carousel {
          display: flex;
          gap: 3rem;
          width: max-content;
          min-width: 100%;
          align-items: center;
        }
        .seamless-carousel {
          animation: seamless-scroll 15s linear infinite;
        }
        @keyframes seamless-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
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
        .carousel-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          pointer-events: none;
          z-index: 2;
        }
        .carousel-fade-left {
          left: 0;
          background: linear-gradient(to right, #fff 80%, transparent 100%);
        }
        .carousel-fade-right {
          right: 0;
          background: linear-gradient(to left, #fff 80%, transparent 100%);
        }
        @media (max-width: 700px) {
          .partners-carousel {
            gap: 1.5rem;
          }
          .carousel-logo img {
            width: 70px;
            height: 40px;
          }
          .carousel-fade {
            width: 30px;
          }
        }
      `}</style>
    </div>
  );
} 