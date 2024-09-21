import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

    console.log(body);

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
      }
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
