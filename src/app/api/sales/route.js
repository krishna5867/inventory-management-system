import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { customer, product, price, tax, date, paymentStatus } = body;

    if (!customer || !product || !price || !tax || !date) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const sale = await prisma.sales.create({
      data: {
        customer,
        product,
        price: parseFloat(price),
        tax: parseFloat(tax),
        date: new Date(date),
        paymentStatus: paymentStatus || 'pending',
      },
    });

    return new Response(JSON.stringify(sale), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating sale:', error);

    return new Response(JSON.stringify({ message: 'Failed to create sale' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  try {
    const sales = await prisma.sales.findMany();

    return new Response(JSON.stringify(sales), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching sales:', error);

    return new Response(JSON.stringify({ error: 'Failed to fetch sales' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ message: 'Sales ID is required for deletion.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const deletedSales = await prisma.sales.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedSales), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting sales entry:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to delete sales entry.',
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
