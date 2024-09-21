import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const body = await req.json();

        const { skuId, stockQuantity, warehouseLocation, orderDescription } = body;

        if (!skuId || stockQuantity == null || !warehouseLocation) {
            return new Response(
                JSON.stringify({
                    message: 'skuId, stockQuantity, and warehouseLocation are required fields.',
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const existingSku = await prisma.sku.findUnique({
            where: {
                id: skuId,
            },
        });

        if (!existingSku) {
            return new Response(
                JSON.stringify({ message: 'SKU does not exist.' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const existingStock = await prisma.stock.findUnique({
            where: {
                skuId_warehouseLocation: {
                    skuId,
                    warehouseLocation,
                },
            },
        });

        if (existingStock) {
            return new Response(
                JSON.stringify({ message: 'Stock entry already exists for this SKU and warehouse.' }),
                {
                    status: 409,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const newStock = await prisma.stock.create({
            data: {
                skuId,
                stockQuantity: parseInt(stockQuantity, 10),
                warehouseLocation,
                orderDescription,
            },
        });

        return new Response(JSON.stringify(newStock), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating stock entry:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to create stock entry.', error: error.message }),
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
        const stocks = await prisma.stock.findMany({
            include: {
                sku: true,
            },
        });

        return new Response(JSON.stringify(stocks), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching stock entries:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to fetch stock entries.', error: error.message }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}
