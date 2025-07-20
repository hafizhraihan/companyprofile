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
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#2563eb' }}>{stat.value}</div>
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
      <section style={{ background: '#2563eb', color: '#fff', padding: '2rem 0', textAlign: 'center', marginTop: 48 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 24, fontWeight: 600 }}>Ready to talk to us?</div>
          <a href={`https://wa.me/${contact.phone ? contact.phone.replace(/\D/g, '') : ''}`} target="_blank" rel="noopener noreferrer" style={{ background: '#fff', color: '#2563eb', fontWeight: 700, fontSize: 18, borderRadius: 8, padding: '0.75rem 2rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'inline-block', marginTop: 8 }}>Chat on WhatsApp</a>
        </div>
      </section>
      {/* Footer */}
      <footer style={{ background: '#1a1a1a', color: '#fff', padding: '2rem 0', marginTop: 0 }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {navbarLogo && <img src={navbarLogo} alt="Logo" style={{ height: 36, marginBottom: 12, borderRadius: 0 }} />}
          <div style={{ fontWeight: 600, fontSize: 18, letterSpacing: 1 }}>© {new Date().getFullYear()} {site.company || 'Your Company Name'}. All rights reserved.</div>
          <div style={{ marginTop: 16, color: '#e5e7eb', fontSize: 15, textAlign: 'center' }}>
            <div><strong>Address:</strong> {contact.address}</div>
            <div><strong>Phone:</strong> {contact.phone}</div>
            <div><strong>Email:</strong> {contact.email}</div>
          </div>
        </div>
      </footer>
    </>
  );
}
