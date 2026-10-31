import Link from 'next/link';

export default function StylePage() {
  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="eyebrow">Style Center</p>
            <h1>AI outfit coordination</h1>
          </div>
          <Link href="/studio" className="secondary-button">Open studio</Link>
        </div>

        <div className="style-grid">
          <div className="panel">
            <h3>Current mood</h3>
            <ul className="tag-list">
              <li>Luxury</li>
              <li>Evening</li>
              <li>Minimal</li>
            </ul>
          </div>
          <div className="panel">
            <h3>Palette</h3>
            <div className="palette-row">
              <span className="swatch warm" />
              <span className="swatch nude" />
              <span className="swatch dark" />
            </div>
          </div>
          <div className="panel">
            <h3>Recommended pairing</h3>
            <p>Soft ivory knitwear with structured trench and sculpted leather accessories.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
