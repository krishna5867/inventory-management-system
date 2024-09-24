import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      vendorName,
      tds,
      rem,
      paidDate,
      paymentFrom,
      amountPaid,
      warehouseLocation,
      asset,
      assetName,
      assetValue,
      assetDescription,
      purchaseDescription,
      purchaseBill,
    } = body;

    if (!vendorName || !paidDate || !amountPaid) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const newPurchase = await prisma.purchase.create({
      data: {
        vendorName,
        tds,
        rem,
        paidDate: new Date(paidDate),
        paymentFrom,
        amountPaid: parseFloat(amountPaid),
        warehouseLocation,
        asset,
        assetName,
        assetValue: parseFloat(assetValue),
        assetDescription,
        purchaseDescription,
        purchaseBill,
      },
    });

    return new Response(JSON.stringify(newPurchase), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating purchase:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to add Purchases' }),
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
    const purchase = await prisma.purchase.findMany({});

    return new Response(JSON.stringify(purchase), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching purchase entries:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to fetch purchase entries.',
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

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ message: 'Purchase ID is required for deletion.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const deletedPurchase = await prisma.purchase.delete({
      where: { id },
    });

    return new Response(JSON.stringify(deletedPurchase), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error deleting purchases entry:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to delete purchases entry.',
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
