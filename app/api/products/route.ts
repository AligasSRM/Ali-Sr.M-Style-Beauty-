import products from '@/lib/products';

export async function GET() {
  return Response.json({
    success: true,
    data: products,
  });
}
