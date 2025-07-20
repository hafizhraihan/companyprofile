import { readFile, readdir } from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

async function getSingleContent(filePath) {
  const file = await readFile(filePath, 'utf8');
  return matter(file).data;
}

async function getCollectionContent(folderPath) {
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
}

export default async function Home() {
  // Hero
  const hero = await getSingleContent('content/hero.md');
  // Testimonials
  const testimonials = await getCollectionContent('content/testimonials');
  // Partners
  const partners = await getCollectionContent('content/partners');
  // Products/Services
  const products = await getCollectionContent('content/products');
  // Contact
  const contact = await getSingleContent('content/contact.md');
  // Statistics
  const statistics = await getSingleContent('content/statistics.md');

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{hero.title}</h1>
            <h2>{hero.subtitle}</h2>
            {hero.image && <img src={hero.image} alt="Hero" style={{ maxWidth: 480, margin: '0 auto 2rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} />}
            <a href={hero.cta_link} className="cta-btn">{hero.cta_text}</a>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Statistics Section */}
        <section>
          <div className="stats-grid">
            {statistics.stats && statistics.stats.map((stat, i) => (
              <div key={i} className="stat-card">
                {stat.icon && <img src={stat.icon} alt={stat.label} style={{ width: 48, height: 48, margin: '0 auto 1rem' }} />}
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Products/Services Section */}
        <section>
          <div className="section-title">
            <h2>Our Products & Services</h2>
            <p>Discover our innovative solutions designed to help your business grow and succeed in today's competitive market.</p>
          </div>
          <div className="products-grid">
            {products.map((prod, i) => (
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
            <h2>Trusted by Industry Leaders</h2>
            <p>We're proud to work with some of the most innovative companies in the industry.</p>
          </div>
          <div className="partners-grid">
            {partners.map((partner, i) => (
              <a key={i} href={partner.website} target="_blank" rel="noopener noreferrer" className="partner-card">
                {partner.logo && <img src={partner.logo} alt={partner.name} className="partner-logo" />}
                <div style={{ fontWeight: 600 }}>{partner.name}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section>
          <div className="section-title">
            <h2>What Our Clients Say</h2>
            <p>Hear from the people who trust us to deliver exceptional results for their businesses.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
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
            <h2>Get in Touch</h2>
            <p>Ready to start your next project? Let's discuss how we can help you achieve your goals.</p>
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
  );
}
