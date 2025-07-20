"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar({ logo, items }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          {logo ? <img src={logo} alt="Logo" style={{ height: 40, borderRadius: 0 }} /> : <span>Logo</span>}
        </Link>
        <ul className="navbar-menu">
          {Array.isArray(items) && items
            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
            .map((item, idx) => (
              <li
                key={idx}
                className={`navbar-item${Array.isArray(item.dropdown) && item.dropdown.length ? " has-dropdown" : ""}`}
                onMouseEnter={() => setOpenDropdown(idx)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.link ? (
                  <Link href={item.link} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {item.label}
                    {Array.isArray(item.dropdown) && item.dropdown.length > 0 && <span style={{ fontSize: 14, marginLeft: 2 }}>&#709;</span>}
                  </Link>
                ) : (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {item.label}
                    {Array.isArray(item.dropdown) && item.dropdown.length > 0 && <span style={{ fontSize: 14, marginLeft: 2 }}>&#709;</span>}
                  </span>
                )}
                {Array.isArray(item.dropdown) && item.dropdown.length > 0 && (
                  <ul className={`navbar-dropdown${openDropdown === idx ? " open" : ""}`}>
                    {item.dropdown.map((sub, subIdx) => (
                      <li key={subIdx} className="navbar-dropdown-item">
                        <Link href={sub.link}>{sub.label}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </div>
      <style jsx>{`
        .navbar {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 1.5rem;
        }
        .navbar-logo img {
          height: 40px;
          border-radius: 0;
        }
        .navbar-menu {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .navbar-item {
          position: relative;
        }
        .navbar-item > a, .navbar-item > span {
          color: #1a1a1a;
          font-weight: 500;
          text-decoration: none;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          transition: background 0.2s;
        }
        .navbar-item > a:hover, .navbar-item > span:hover {
          background: #f3f4f6;
        }
        .navbar-dropdown {
          display: none;
          position: absolute;
          left: 0;
          top: 100%;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          min-width: 180px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          z-index: 10;
          padding: 0.5rem 0;
        }
        .navbar-dropdown.open {
          display: block;
        }
        .navbar-dropdown-item a {
          display: block;
          padding: 0.75rem 1rem;
          color: #1a1a1a;
          text-decoration: none;
          transition: background 0.2s;
        }
        .navbar-dropdown-item a:hover {
          background: #f3f4f6;
        }
        @media (max-width: 700px) {
          .navbar-container {
            flex-direction: column;
            align-items: flex-start;
          }
          .navbar-menu {
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
} 