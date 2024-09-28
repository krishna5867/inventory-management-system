import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const formData = await req.formData();

    const vendorName = formData.get('vendorName');
    const paidDate = formData.get('paidDate');
    const amountPaid = formData.get('amountPaid');
    const paymentFrom = formData.get('paymentFrom');
    const purchaseBill = formData.get('purchaseBill');
    const rem = formData.get('rem');
    const tds = formData.get('tds');
    const warehouseLocation = formData.get('warehouseLocation');
    const asset = formData.get('asset');
    const assetName = formData.get('assetName');
    const assetValue = formData.get('assetValue');
    const assetDescription = formData.get('assetDescription');
    const purchaseDescription = formData.get('purchaseDescription');

    if (!vendorName || !paidDate || !amountPaid) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let purchaseBillBuffer = null;
    if (purchaseBill) {
      purchaseBillBuffer = Buffer.from(await purchaseBill.arrayBuffer());
    }

    const newPurchase = await prisma.purchase.create({
      data: {
        vendorName,
        paidDate: new Date(paidDate),
        amountPaid: parseFloat(amountPaid),
        paymentFrom,
        purchaseBill: purchaseBillBuffer,
        rem,
        tds,
        warehouseLocation,
        asset,
        assetName,
        assetValue: parseFloat(assetValue),
        assetDescription,
        purchaseDescription,
      },
    });

    console.log("data", newPurchase);
    

    const responsePurchase = {
      ...newPurchase,
      purchaseBill: newPurchase.purchaseBill
        ? newPurchase.purchaseBill.toString('base64')
        : null,
    };

    return new Response(JSON.stringify(responsePurchase), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating purchase:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to add Purchases' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function GET() {
  try {
    const purchases = await prisma.purchase.findMany();

    const purchasesWithBase64 = purchases.map((purchase) => {
      return {
        ...purchase,
        purchaseBill: purchase.purchaseBill
          ? purchase.purchaseBill.toString('base64')
          : null,
      };
    });

    return new Response(JSON.stringify(purchasesWithBase64), {
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
