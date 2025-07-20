import { readFile, readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Navbar from './components/Navbar';
import PartnersCarouselWrapper from './components/PartnersCarouselWrapper';
import TestimonialSlider from './components/TestimonialSlider';
import React from 'react'; // Added missing import for React

// Add Oswald font import to the head (for demo, you may want to move this to _document.js or globals.css in a real app)
if (typeof window !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

async function getSingleContent(filePath) {
  try {
    const file = await readFile(filePath, 'utf8');
    return matter(file).data;
  } catch {
    return {};
  }
}

async function getCollectionContent(folderPath) {
  try {
    const files = await readdir(folderPath);
    const items = [];
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(folderPath, file);
        const fileContent = await readFile(filePath, 'utf8');
        items.push(matter(fileContent).data);
      }
    }
    return items;
  } catch {
    return [];
  }
}

// Social icon SVGs
const socialIcons = {
  linkedin: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg>
  ),
  youtube: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112c-1.863-.502-9.386-.502-9.386-.502s-7.523 0-9.386.502a2.994 2.994 0 0 0-2.112 2.112c-.502 1.863-.502 5.754-.502 5.754s0 3.891.502 5.754a2.994 2.994 0 0 0 2.112 2.112c1.863.502 9.386.502 9.386.502s7.523 0 9.386-.502a2.994 2.994 0 0 0 2.112-2.112c.502-1.863.502-5.754.502-5.754s0-3.891-.502-5.754zm-13.498 9.754v-7l6.5 3.5-6.5 3.5z"/></svg>
  ),
  facebook: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.326v21.348c0 .733.592 1.326 1.325 1.326h11.495v-9.294h-3.128v-3.622h3.128v-2.672c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.733 0 1.325-.593 1.325-1.326v-21.349c0-.734-.592-1.326-1.325-1.326z"/></svg>
  ),
  instagram: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881zm-6.406 2.845a4.162 4.162 0 1 0 0 8.324 4.162 4.162 0 0 0 0-8.324z"/></svg>
  ),
  tiktok: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.004 2c2.21 0 4.004 1.794 4.004 4.004v7.992c0 2.21-1.794 4.004-4.004 4.004s-4.004-1.794-4.004-4.004v-7.992c0-2.21 1.794-4.004 4.004-4.004zm0-2c-3.313 0-6.004 2.691-6.004 6.004v7.992c0 3.313 2.691 6.004 6.004 6.004s6.004-2.691 6.004-6.004v-7.992c0-3.313-2.691-6.004-6.004-6.004zm7.996 8.004c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2zm-2 4c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12-4c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2zm-2 4c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2z"/></svg>
  ),
  x: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 2.47a.75.75 0 0 1 1.06 1.06l-5.47 5.47 5.47 5.47a.75.75 0 1 1-1.06 1.06l-5.47-5.47-5.47 5.47a.75.75 0 1 1-1.06-1.06l5.47-5.47-5.47-5.47a.75.75 0 1 1 1.06-1.06l5.47 5.47 5.47-5.47z"/></svg>
  ),
  whatsapp: (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48a12.07 12.07 0 0 0-17.04 0c-4.7 4.7-4.7 12.34 0 17.04a12.07 12.07 0 0 0 17.04 0c4.7-4.7 4.7-12.34 0-17.04zm-8.52 17.02c-1.7 0-3.36-.33-4.92-.98l-5.13 1.35 1.36-5.13c-.65-1.56-.98-3.22-.98-4.92 0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm4.29-7.29c-.13-.13-.31-.2-.5-.2s-.37.07-.5.2l-2.29 2.29-2.29-2.29a.71.71 0 0 0-1 1l2.29 2.29-2.29 2.29a.71.71 0 0 0 1 1l2.29-2.29 2.29 2.29a.71.71 0 0 0 1-1l-2.29-2.29 2.29-2.29a.71.71 0 0 0 0-1z"/></svg>
  ),
};

function getSocialIcon(name) {
  if (!name) return null;
  const key = name.toLowerCase().replace(/\s/g, '');
  if (socialIcons[key]) return socialIcons[key];
  return (
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e5e7eb" /><path d="M8 12h8M12 8v8" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" /></svg>
  );
}

export default async function Home() {
  // Site settings
  const site = (await getSingleContent('content/site.md')) || {};
  // Navbar
  let navbarItems = (await getCollectionContent('content/navbar')) || [];
  // Hero
  const hero = (await getSingleContent('content/hero.md')) || {};
  // Section settings
  const statisticsSection = (await getSingleContent('content/statistics.md')) || {};
  const productsSection = (await getSingleContent('content/products_section.md')) || {};
  const partnersSection = (await getSingleContent('content/partners_section.md')) || {};
  const testimonialsSection = (await getSingleContent('content/testimonials_section.md')) || {};
  const contactSection = (await getSingleContent('content/contact_section.md')) || {};
  // Content collections
  const testimonials = (await getCollectionContent('content/testimonials')) || [];
  const partners = (await getCollectionContent('content/partners')) || [];
  const products = (await getCollectionContent('content/products')) || [];
  const contact = (await getSingleContent('content/contact.md')) || {};
  const statistics = (await getSingleContent('content/statistics.md')) || {};
  const footerSections = (await getCollectionContent('content/footer_sections')) || [];

  // Partner logos for carousel
  const partnerLogos = Array.isArray(partners) ? partners.map(p => p.logo).filter(Boolean) : [];
  // Navbar logo (use site logo if available)
  const navbarLogo = site.logo || '';
  // Defensive array checks
  const stats = Array.isArray(statistics.stats) ? statistics.stats : [];
  const productsArr = Array.isArray(products) ? products : [];
  const testimonialsArr = Array.isArray(testimonials) ? testimonials : [];

  return (
    <>
      <Navbar logo={navbarLogo} items={Array.isArray(navbarItems) ? navbarItems : []} />
      <main>
        {/* Hero Section as background */}
        <section
          className="hero"
          style={{
            backgroundImage: hero.image ? `url(${hero.image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff',
            position: 'relative',
          }}
        >
          <div className="container hero-content" style={{ position: 'relative', zIndex: 2 }}>
            <h1>{hero.title}</h1>
            <h2>{hero.subtitle}</h2>
            <a href={hero.cta_link} className="cta-btn" style={{ background: '#fff', color: '#2563eb' }}>{hero.cta_text}</a>
          </div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #667eea99 0%, #764ba299 100%)', zIndex: 1 }} />
        </section>

        <div className="container">
          {/* Statistics Section */}
          <section>
            <div className="section-title">
              <h2>{statisticsSection.section_title}</h2>
              <p>{statisticsSection.section_description}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}>
              {stats.map((stat, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <div style={{ width: 1, height: 36, background: '#e5e7eb', margin: '0 2rem' }} />}
                  <div style={{ textAlign: 'center', minWidth: 80 }}>
                    <div style={{ fontSize: 38, fontWeight: 800, color: '#2563eb', letterSpacing: 1 }}>{stat.value}</div>
                    <div style={{ color: '#6b7280', fontWeight: 500, fontSize: 15 }}>{stat.label}</div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Products/Services Section */}
          <section>
            <div className="section-title">
              <h2>{productsSection.section_title}</h2>
              <p>{productsSection.section_description}</p>
            </div>
            <div className="products-grid">
              {productsArr.map((prod, i) => (
                <div key={i} className="product-card">
                  {prod.image && <img src={prod.image} alt={prod.name} className="product-image" />}
                  <div className="product-content">
                    <h3>{prod.name}</h3>
                    <p>{prod.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Partners Section */}
          <section>
            <div className="section-title">
              <h2>{partnersSection.section_title}</h2>
              <p>{partnersSection.section_description}</p>
            </div>
            <PartnersCarouselWrapper logos={partnerLogos} />
          </section>

          {/* Testimonials Section */}
          <section>
            <div className="section-title">
              <h2>{testimonialsSection.section_title}</h2>
              <p>{testimonialsSection.section_description}</p>
            </div>
            <TestimonialSlider testimonials={testimonialsArr} />
          </section>
        </div>
      </main>
      {/* WhatsApp CTA */}
      <section style={{ background: '#2563eb', color: '#fff', padding: '2rem 0', textAlign: 'center', marginTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 600 }}>Ready to talk to us?</div>
          <a href={`https://wa.me/${contact.phone ? contact.phone.replace(/\D/g, '') : ''}`} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: '#2563eb', fontWeight: 700, fontSize: 18, borderRadius: 8, padding: '0.75rem 2rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'inline-block', marginTop: 8 }}>Chat on WhatsApp</a>
        </div>
      </section>
      {/* Footer */}
      <footer style={{ background: '#1a1a1a', color: '#fff', padding: '2.5rem 0 0 0', marginTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, marginBottom: 24 }}>
          {/* Contact & Social (first section) */}
          <div style={{ flex: '1 1 180px', minWidth: 180 }}>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Contact</div>
            <div style={{ color: '#e5e7eb', fontSize: 15, marginBottom: 8 }}>{contact.address}</div>
            <div style={{ color: '#e5e7eb', fontSize: 15, marginBottom: 8 }}>{contact.phone}</div>
            <div style={{ color: '#e5e7eb', fontSize: 15, marginBottom: 16 }}>{contact.email}</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Social</div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
              {footerSections.filter(s => s.title && s.title.toLowerCase().includes('social')).flatMap(section =>
                Array.isArray(section.links) ? section.links.map((link, i) => (
                  <a key={i} href={link.ref} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: 20, display: 'flex', alignItems: 'center' }}>
                    {getSocialIcon(link.name)}
                  </a>
                )) : []
              )}
            </div>
          </div>
          {/* Admin-editable footer sections */}
          {footerSections.filter(s => s.title && s.title.toLowerCase().includes('social')).map((section, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {Array.isArray(section.links) && section.links.map((link, i) => (
                <a key={i} href={link.ref} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
                  {getSocialIcon(link.name)}
                  {link.name}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #2d2d2d', marginTop: 24, padding: '1.2rem 0 0 0', textAlign: 'center', color: '#e5e7eb', fontSize: 15 }}>
          © {new Date().getFullYear()} {site.company || 'Your Company Name'}. All rights reserved.
        </div>
      </footer>
    </>
  );
}
