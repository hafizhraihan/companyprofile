import { readFile, readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import Navbar from './components/Navbar';
import PartnersCarouselWrapper from './components/PartnersCarouselWrapper';

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
            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div key={i} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
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
            <div className="testimonials-grid">
              {testimonialsArr.map((t, i) => (
                <div key={i} className="testimonial-card">
                  <div className="testimonial-content">
                    <blockquote className="testimonial-quote">{t.quote}</blockquote>
                    <div className="testimonial-author">
                      {t.photo && <img src={t.photo} alt={t.name} className="author-photo" />}
                      <div className="author-info">
                        <h4>{t.name}</h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="contact-section">
            <div className="section-title">
              <h2>{contactSection.section_title}</h2>
              <p>{contactSection.section_description}</p>
            </div>
            <div className="contact-card">
              <div className="contact-info">
                <div className="contact-item">
                  <strong>Address:</strong>
                  <span>{contact.address}</span>
                </div>
                <div className="contact-item">
                  <strong>Phone:</strong>
                  <span>{contact.phone}</span>
                </div>
                <div className="contact-item">
                  <strong>Email:</strong>
                  <span>{contact.email}</span>
                </div>
              </div>
              {contact.map_embed && <div style={{ marginTop: 16 }} dangerouslySetInnerHTML={{ __html: contact.map_embed }} />}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
