export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  badge: string;
  features: string[];
};

const products: Product[] = [
  {
    id: 'p-1',
    name: 'Velvet Studio Set',
    category: 'Fashion',
    price: 129,
    rating: 4.8,
    badge: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    description: 'A premium styling set designed for elevated everyday looks and social-ready elegance.',
    features: ['Tailored fit', 'Premium fabric', 'Ready for events'],
  },
  {
    id: 'p-2',
    name: 'Aura Glow Kit',
    category: 'Beauty',
    price: 89,
    rating: 4.7,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    description: 'Glow-focused essentials featuring hydration, finish, and a radiant finish for all skin tones.',
    features: ['Hydrating', 'Skin tone friendly', 'Travel ready'],
  },
  {
    id: 'p-3',
    name: 'Sculpt Street Sneaker',
    category: 'Accessories',
    price: 149,
    rating: 4.6,
    badge: 'Trending',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    description: 'Comfort and street-edge look in a modern silhouette for everyday styling.',
    features: ['Cushioned sole', 'Everyday wear', 'Modern finish'],
  },
  {
    id: 'p-4',
    name: 'Luna Tailor Canvas',
    category: 'AI Design',
    price: 199,
    rating: 4.9,
    badge: 'AI Pick',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    description: 'A digital design concept pack for personalized outfit generation and tailored styling ideas.',
    features: ['Personalized look', 'AI recommendations', 'Style library'],
  },
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default products;
