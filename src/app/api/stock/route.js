import prisma from '@/lib/prisma';

export async function POST(req) {
    try {
        const body = await req.json();
        const { warehouseLocation, orderDescription, items } = body;

        if (!items || items.length === 0) {
            return new Response(
                JSON.stringify({
                    message: 'Items array is required and should not be empty.',
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        if (!warehouseLocation || !orderDescription) {
            return new Response(
                JSON.stringify({
                    message: 'Fields are required.',
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const stock = await prisma.stock.create({
            data: {
                warehouseLocation,
                orderDescription,
                items: {
                    create: items.map((item) => ({
                        skuId: parseInt(item.skuId, 10),
                        stockQuantity: parseInt(item.stockQuantity, 10),
                    })),
                },
            },
            include: {
                items: true,
            },
        });

        return new Response(
            JSON.stringify({ message: 'Stock order created successfully!', stock }),
            {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            }
        );
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
                items: { 
                    include: {
                        sku: true, 
                    },
                },
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

export async function DELETE(request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return new Response(
                JSON.stringify({ message: 'Stock ID is required for deletion.' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const deletedStock = await prisma.stock.delete({
            where: { id },
        });

        return new Response(JSON.stringify(deletedStock), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error deleting stock entry:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to delete stock entry.', error: error.message }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}