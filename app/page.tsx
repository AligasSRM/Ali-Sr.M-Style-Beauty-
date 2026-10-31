body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f7f3ee;
  color: #1c1b1a;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
  border: none;
}

img {
  max-width: 100%;
  display: block;
}

.page-shell {
  max-width: 1180px;
  margin: 0 auto;
  padding: 32px 20px 80px;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(14px);
  background: rgba(247, 243, 238, 0.88);
  border-bottom: 1px solid rgba(28, 27, 26, 0.06);
}

.topbar-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.brand {
  font-size: 1.1rem;
  letter-spacing: 0.18rem;
  font-weight: 700;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 0.96rem;
}

.cart-pill {
  background: #1c1b1a;
  color: white;
  padding: 10px 16px;
  border-radius: 999px;
  font-weight: 600;
}

.hero-section {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr;
  gap: 28px;
  align-items: center;
  padding: 52px 0 28px;
}

.hero-section h1 {
  font-size: clamp(2.5rem, 4vw, 4.2rem);
  margin: 8px 0 18px;
  line-height: 1.04;
}

.lead {
  max-width: 620px;
  font-size: 1.05rem;
  color: #4a403b;
}

.hero-actions,
.product-actions,
.card-actions,
.admin-actions,
.inline-actions,
.product-detail-meta,
.product-price-row {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.primary-button,
.secondary-button,
.ghost-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 18px;
  border-radius: 999px;
  font-weight: 600;
  transition: 0.2s ease;
}

.primary-button {
  background: #1c1b1a;
  color: white;
}

.secondary-button {
  background: #efe7df;
  color: #1c1b1a;
}

.ghost-button {
  background: transparent;
  color: #7b5f50;
  border: 1px solid rgba(28, 27, 26, 0.12);
}

.small-button {
  padding: 10px 14px;
  font-size: 0.88rem;
}

.section-block {
  margin-top: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 22px;
}

.section-header h1,
.section-header h2,
.product-card h3,
.product-detail-content h1,
.admin-card h1 {
  margin: 0;
}

.eyebrow {
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.12rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #7b5f50;
}

.panel {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(28, 27, 26, 0.06);
  box-shadow: 0 12px 30px rgba(28, 27, 26, 0.04);
  border-radius: 24px;
}

.stats-card {
  display: grid;
  gap: 18px;
  padding: 24px;
}

.stats-card div {
  display: flex;
  justify-content: space-between;
  gap: 14px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.product-card {
  overflow: hidden;
}

.product-thumb {
  width: 100%;
  height: 260px;
  object-fit: cover;
}

.product-card-body {
  padding: 18px;
}

.product-topline,
.product-footer,
.checkout-total,
.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.product-card h3 {
  margin: 10px 0 8px;
  font-size: 1.4rem;
}

.product-card p,
.product-detail-content p,
.empty-cart p {
  color: #4a403b;
  line-height: 1.6;
}

.badge,
.rating-pill,
.mini {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
}

.badge,
.rating-pill {
  background: #efe7df;
  color: #1c1b1a;
  padding: 7px 10px;
}

.product-detail-card {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 26px;
  padding: 24px;
}

.product-detail-image {
  width: 100%;
  height: 100%;
  min-height: 480px;
  object-fit: cover;
  border-radius: 18px;
}

.product-detail-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.product-price-row {
  justify-content: flex-start;
  font-size: 1.2rem;
}

.cart-page {
  display: grid;
  grid-template-columns: 1.5fr 0.8fr;
  gap: 28px;
}

.cart-list,
.checkout-panel,
.admin-card,
.admin-sidebar,
.empty-cart {
  padding: 24px;
}

.cart-item {
  padding: 18px 0;
  border-bottom: 1px solid rgba(28, 27, 26, 0.08);
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-thumb {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 12px;
}

.cart-copy {
  flex: 1;
}

.cart-copy h3 {
  margin: 0 0 6px;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-controls button {
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: #efe7df;
}

.checkout-panel {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.checkout-panel label,
.admin-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 600;
}

.checkout-panel input,
.checkout-panel textarea,
.admin-form input,
.admin-form textarea {
  border: 1px solid rgba(28, 27, 26, 0.12);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  padding: 12px 14px;
}

.admin-layout {
  display: grid;
  grid-template-columns: 230px 1fr;
  gap: 24px;
}

.admin-sidebar {
  align-self: start;
}

.admin-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 20px;
}

.stat-box {
  background: #f5efe9;
  border-radius: 16px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.admin-form {
  margin-bottom: 28px;
}

.admin-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.full-width {
  grid-column: 1 / -1;
}

.admin-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.admin-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border: 1px solid rgba(28, 27, 26, 0.08);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.55);
}

.admin-item > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.empty-cart {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}

@media (max-width: 900px) {
  .product-grid,
  .cart-page,
  .admin-layout,
  .product-detail-card,
  .hero-section {
    grid-template-columns: 1fr;
  }

  .admin-grid {
    grid-template-columns: 1fr;
  }
}
