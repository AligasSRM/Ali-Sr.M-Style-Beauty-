import Link from 'next/link';

export default function StudioPage() {
  return (
    <main className="page-shell">
      <section className="section-block">
        <div className="section-header">
          <div>
            <p className="eyebrow">AI Studio</p>
            <h1>Virtual try-on dashboard</h1>
          </div>
          <Link href="/products" className="secondary-button">Shop looks</Link>
        </div>

        <div className="studio-layout">
          <div className="panel image-panel">
            <div className="image-placeholder large-placeholder">Upload photo</div>
          </div>

          <div className="panel ai-panel">
            <h3>Suggested outfits</h3>
            <div className="ai-option">
              <span>Look 01</span>
              <strong>Minimal Luxe</strong>
              <small>Soft beige + tailored silhouette</small>
            </div>
            <div className="ai-option">
              <span>Look 02</span>
              <strong>Night Edit</strong>
              <small>Deep tones + statement fit</small>
            </div>
            <div className="ai-option">
              <span>Look 03</span>
              <strong>Travel Light</strong>
              <small>Monochrome + low-maintenance finish</small>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
