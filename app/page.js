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
    <main style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 8 }}>{hero.title}</h1>
        <h2 style={{ fontWeight: 400, color: '#555', marginBottom: 24 }}>{hero.subtitle}</h2>
        {hero.image && <img src={hero.image} alt="Hero" style={{ maxWidth: 480, margin: '0 auto 1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }} />}
        <div>
          <a href={hero.cta_link} className="cta-btn">{hero.cta_text}</a>
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
        {statistics.stats && statistics.stats.map((stat, i) => (
          <div key={i} className="card" style={{ minWidth: 120, flex: '1 1 120px', textAlign: 'center', boxShadow: 'none', margin: 0 }}>
            {stat.icon && <img src={stat.icon} alt={stat.label} style={{ width: 48, height: 48, margin: '0 auto 0.5rem' }} />}
            <div style={{ fontSize: 28, fontWeight: 700 }}>{stat.value}</div>
            <div style={{ color: '#555' }}>{stat.label}</div>
          </div>
        ))}
      </section>

      {/* Products/Services Section */}
      <section>
        <h2 style={{ marginBottom: 24 }}>Our Products & Services</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {products.map((prod, i) => (
            <div key={i} className="card" style={{ width: 260 }}>
              {prod.image && <img src={prod.image} alt={prod.name} style={{ width: '100%', height: 120, objectFit: 'cover', marginBottom: 12 }} />}
              <h3 style={{ fontSize: 20 }}>{prod.name}</h3>
              <p style={{ color: '#555', fontSize: 15 }}>{prod.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section */}
      <section>
        <h2 style={{ marginBottom: 24 }}>Our Partners</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'center' }}>
          {partners.map((partner, i) => (
            <a key={i} href={partner.website} target="_blank" rel="noopener noreferrer" className="card" style={{ width: 160, textAlign: 'center', boxShadow: 'none', margin: 0, padding: 16 }}>
              {partner.logo && <img src={partner.logo} alt={partner.name} style={{ width: 100, height: 60, objectFit: 'contain', margin: '0 auto 0.5rem' }} />}
              <div style={{ fontWeight: 600 }}>{partner.name}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <h2 style={{ marginBottom: 24 }}>Testimonials</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          {testimonials.map((t, i) => (
            <div key={i} className="card" style={{ width: 300, textAlign: 'center', position: 'relative' }}>
              {t.photo && <img src={t.photo} alt={t.name} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem' }} />}
              <blockquote style={{ fontStyle: 'italic', color: '#444', margin: '0 0 1rem 0', fontSize: 16 }}>&ldquo;{t.quote}&rdquo;</blockquote>
              <div style={{ fontWeight: 600, color: '#2563eb' }}>{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <h2 style={{ marginBottom: 16 }}>Contact Us</h2>
        <div className="card" style={{ maxWidth: 400, margin: '0 auto', fontSize: 16 }}>
          <div style={{ marginBottom: 8 }}><strong>Address:</strong> {contact.address}</div>
          <div style={{ marginBottom: 8 }}><strong>Phone:</strong> {contact.phone}</div>
          <div style={{ marginBottom: 8 }}><strong>Email:</strong> {contact.email}</div>
          {contact.map_embed && <div style={{ marginTop: 16 }} dangerouslySetInnerHTML={{ __html: contact.map_embed }} />}
        </div>
      </section>
    </main>
  );
}
