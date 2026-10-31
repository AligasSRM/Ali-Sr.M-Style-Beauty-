# Project scaffold for Ali Sr.M MVP

This repository now includes an initial functional MVP scaffold for the Ali Sr.M platform.

## Included

- Next.js app with homepage, catalog, cart, AI studio, and style center
- Product data and mock storefront logic
- Cart context with localStorage persistence
- Prisma schema for users, products, orders, items, and wishlist data
- Seed file and environment example

## Local setup

1. Install dependencies:
   npm install
2. Copy env file:
   cp .env.example .env
3. Generate Prisma client:
   npm run db:generate
4. Start development server:
   npm run dev

## Useful scripts

- `npm run build` — production build
- `npm run db:seed` — seed sample data
- `npm run db:push` — sync Prisma schema to database

## Notes

The current scaffold models the production product strategy while keeping the initial implementation lightweight and runnable. The storefront is front-end ready, and Prisma is prepared for real database integration when the backend is expanded.
