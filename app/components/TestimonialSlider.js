"use client";
import React, { useState, useEffect, useRef } from "react";

function truncate(text, maxLength = 140) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '... ' : text;
}

export default function TestimonialSlider({ testimonials }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [showModal, setShowModal] = useState(false);
  const [modalTestimonial, setModalTestimonial] = useState(null);
  const timerRef = useRef();
  const count = Array.isArray(testimonials) ? testimonials.length : 0;

  useEffect(() => {
    if (count < 2) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % count);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [count]);

  const goTo = (i, dir = 1) => {
    setDirection(dir);
    setIndex(i);
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const prev = () => goTo((index - 1 + count) % count, -1);
  const next = () => goTo((index + 1) % count, 1);

  if (!Array.isArray(testimonials) || testimonials.length === 0) return null;
  const t = testimonials[index];
  const maxLength = 140;
  const isTruncated = t.quote && t.quote.length > maxLength;

  return (
    <div className="testimonial-slider">
      <div className="testimonial-slider-inner">
        <button className="slider-arrow left" onClick={prev} aria-label="Previous testimonial">{'<'}</button>
        <div className={`testimonial-slide slide-${direction === 1 ? 'right' : 'left'}`} key={index}>
          <div className="testimonial-card-modern">
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Oswald, Arial, sans-serif', fontWeight: 700, fontSize: '2.5rem', color: '#2563eb', lineHeight: 1, position: 'relative', top: '-0.5em' }}>,,</span>
              <blockquote className="testimonial-quote-block">
                {isTruncated ? (
                  <>
                    {truncate(t.quote, maxLength)}
                    <button className="view-more-btn" onClick={() => { setShowModal(true); setModalTestimonial(t); }} style={{ color: '#2563eb', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', padding: 0 }}>View more</button>
                  </>
                ) : t.quote}
              </blockquote>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18, justifyContent: 'center' }}>
              {t.photo && <img src={t.photo} alt={t.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ fontWeight: 600, color: '#2563eb', fontSize: 16 }}>{t.name}</div>
                {t.position && <div style={{ color: '#6b7280', fontSize: 14, marginTop: 0 }}>{t.position}</div>}
              </div>
            </div>
          </div>
        </div>
        <button className="slider-arrow right" onClick={next} aria-label="Next testimonial">{'>'}</button>
      </div>
      <div className="slider-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`slider-dot${i === index ? " active" : ""}`}
            onClick={() => goTo(i, i > index ? 1 : -1)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
      {showModal && modalTestimonial && (
        <div className="testimonial-modal-overlay" onClick={() => { setShowModal(false); setModalTestimonial(null); }}>
          <div className="testimonial-modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              {modalTestimonial.photo && <img src={modalTestimonial.photo} alt={modalTestimonial.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
                <div style={{ fontWeight: 700, color: '#2563eb', fontSize: 20 }}>{modalTestimonial.name}</div>
                {modalTestimonial.position && <div style={{ color: '#6b7280', fontSize: 16, marginTop: 0 }}>{modalTestimonial.position}</div>}
              </div>
            </div>
            <blockquote style={{ fontSize: '1.15rem', fontWeight: 400, color: '#222', borderLeft: '3px solid #2563eb', paddingLeft: 12, margin: 0, background: 'none', borderRadius: 0, fontStyle: 'italic', lineHeight: 1.7, textAlign: 'left' }}>{modalTestimonial.quote}</blockquote>
            <button onClick={() => { setShowModal(false); setModalTestimonial(null); }} style={{ marginTop: 24, background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, padding: '0.5rem 1.5rem', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Close</button>
          </div>
        </div>
      )}
      <style jsx>{`
        .testimonial-slider {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .testimonial-slider-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          gap: 0.5rem;
          position: relative;
        }
        .testimonial-slide {
          min-width: 0;
          flex: 1 1 0;
          max-width: 340px;
          margin: 0 0.5rem;
          transition: transform 0.5s cubic-bezier(.77,0,.18,1), opacity 0.5s;
          opacity: 1;
        }
        .slide-right {
          animation: slideInRight 0.5s;
        }
        .slide-left {
          animation: slideInLeft 0.5s;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .testimonial-card-modern {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(40,60,90,0.08);
          padding: 1.3rem 1.1rem 1.1rem 1.1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 220px;
          min-height: 120px;
          max-width: 340px;
          width: 100%;
          overflow: hidden;
          justify-content: center;
        }
        .testimonial-card-modern blockquote {
          font-size: 1.08rem;
          font-weight: 400;
          color: #222;
          border-left: 3px solid #2563eb;
          padding-left: 12px;
          margin: 0;
          background: none;
          border-radius: 0;
          font-style: italic;
          line-height: 1.6;
          text-align: left;
          flex: 1;
        }
        .testimonial-card-modern img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }
        .testimonial-card-modern div[style*='font-size: 16'] {
          font-size: 15px !important;
          font-weight: 600;
        }
        .testimonial-card-modern div[style*='font-size: 20'] {
          font-size: 13px !important;
          color: #6b7280;
        }
        .slider-arrow {
          background: #fff;
          border: 2px solid #2563eb;
          color: #2563eb;
          font-size: 1rem;
          border-radius: 50%;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
          z-index: 2;
        }
        .slider-arrow:hover {
          background: #e0e7ef;
        }
        .slider-arrow.left {
          margin-right: 0.5rem;
          position: absolute;
          left: -24px;
          top: 50%;
          transform: translateY(-50%);
        }
        .slider-arrow.right {
          margin-left: 0.5rem;
          position: absolute;
          right: -24px;
          top: 50%;
          transform: translateY(-50%);
        }
        .slider-dots {
          display: flex;
          gap: 0.3rem;
          margin-top: 0.7rem;
        }
        .slider-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e5e7eb;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }
        .slider-dot.active {
          background: #2563eb;
        }
        .view-more-btn {
          color: #2563eb;
          background: none;
          border: none;
          font-weight: 600;
          cursor: pointer;
          font-size: 1rem;
          padding: 0;
        }
        .testimonial-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.25);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testimonial-modal {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 2px 24px rgba(0,0,0,0.18);
          padding: 2.5rem 2rem 2rem 2rem;
          max-width: 700px;
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        @media (max-width: 700px) {
         .testimonial-slider-inner {
           flex-direction: row;
           gap: 0.5rem;
         }
         .testimonial-slide {
           max-width: 98vw;
           margin: 0;
         }
         .testimonial-card-modern {
           width: 96vw;
           min-width: 0;
           max-width: 98vw;
           padding: 0.7rem 0.3rem;
           min-height: 90px;
           max-height: none;
           border-radius: 12px;
           box-shadow: 0 2px 8px rgba(40,60,90,0.08);
         }
         .testimonial-card-modern blockquote {
           font-size: 0.85rem;
           border-left: 2px solid #2563eb;
           padding-left: 8px;
         }
         .testimonial-card-modern img {
           width: 24px;
           height: 24px;
         }
         .testimonial-card-modern div[style*='font-size: 16'] {
           font-size: 13px !important;
         }
         .testimonial-card-modern div[style*='font-size: 20'] {
           font-size: 11px !important;
         }
        }
      `}</style>
    </div>
  );
} 