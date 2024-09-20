import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.setHeader('Allow', ['POST']).status(405).json({ message: `Method ${req.method} not allowed` });
  }
  try {
    const {
      vendorName,
      tds,
      rem,
      paidDate,
      bankAccounts, 
      amountPaid,
      warehouseLocation,
      asset,
      assetName,
      assetValue,
      assetDescription,
      purchaseDescription,
      purchaseBill,
    } = req.body;

    if (!vendorName || !paidDate || !amountPaid) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const paidDateObj = new Date(paidDate);
    const amountPaidNum = parseFloat(amountPaid);
    const assetValueNum = assetValue ? parseFloat(assetValue) : null;

    const newPurchase = await prisma.purchase.create({
      data: {
        vendorName,
        tds,
        rem,
        paidDate: paidDateObj,
        amountPaid: amountPaidNum,
        warehouseLocation,
        asset,
        assetName,
        assetValue: assetValueNum,
        assetDescription,
        purchaseDescription,
        purchaseBill,
        bankAccounts: {
          create: bankAccounts.map((account) => ({
            bankName: account.bankName,
          })),
        },
      },
      include: {
        bankAccounts: true,
      },
    });

    return res.status(201).json(newPurchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    return res.status(500).json({ message: 'Failed to add purchase' });
  } finally {
    await prisma.$disconnect(); 
  }
}
