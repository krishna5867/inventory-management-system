import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();

    const { sku, productName, description } = body;

    if (!sku || !productName) {
      return new Response(
        JSON.stringify({ message: 'SKU and productName are required fields.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const existingSku = await prisma.skuStock.findUnique({
      where: {
        sku: sku,
      },
    });

    if (existingSku) {
      return new Response(JSON.stringify({ message: 'SKU already exists.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newSku = await prisma.skuStock.create({
      data: {
        sku,
        productName,
        description,
      },
    });

    return new Response(JSON.stringify(newSku), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating SKU:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to create SKU.',
        error: error.message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const skus = await prisma.skuStock.findMany();
    if (skus.length < 0)
      return new Response(JSON.stringify({ message: 'No Data' }));

    return new Response(JSON.stringify(skus), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching SKU entries:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch SKU.', error: error.message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
