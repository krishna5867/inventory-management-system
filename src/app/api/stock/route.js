import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export async function POST(req) {
//     try {
//         const body = await req.json();

//         const { skuId, stockQuantity, warehouseLocation, orderDescription } = body;

//         if (!skuId || stockQuantity || !warehouseLocation) {
//             return new Response(
//                 JSON.stringify({
//                     message: 'skuId, stockQuantity, and warehouseLocation are required fields.',
//                 }),
//                 {
//                     status: 400,
//                     headers: { 'Content-Type': 'application/json' },
//                 }
//             );
//         }

//         const existingSku = await prisma.s.findUnique({
//             where: {
//                 id: skuId,
//             },
//         });

//         if (!existingSku) {
//             return new Response(
//                 JSON.stringify({ message: 'SKU does not exist.' }),
//                 {
//                     status: 404,
//                     headers: { 'Content-Type': 'application/json' },
//                 }
//             );
//         }

//         const existingStock = await prisma.stock.findUnique({
//             where: {
//                 skuId_warehouseLocation: {
//                     skuId,
//                     warehouseLocation,
//                 },
//             },
//         });

//         if (existingStock) {
//             return new Response(
//                 JSON.stringify({ message: 'Stock entry already exists for this SKU and warehouse.' }),
//                 {
//                     status: 409,
//                     headers: { 'Content-Type': 'application/json' },
//                 }
//             );
//         }

//         const newStock = await prisma.stock.create({
//             data: {
//                 skuId,
//                 stockQuantity: parseInt(stockQuantity, 10),
//                 warehouseLocation,
//                 orderDescription,
//             },
//         });

//         return new Response(JSON.stringify(newStock), {
//             status: 201,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error('Error creating stock entry:', error);
//         return new Response(
//             JSON.stringify({ message: 'Failed to create stock entry.', error: error.message }),
//             {
//                 status: 500,
//                 headers: { 'Content-Type': 'application/json' },
//             }
//         );
//     } finally {
//         await prisma.$disconnect();
//     }
// }


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
                    message: 'warehouseLocation and orderDescription are required fields.',
                }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        // Iterate over each item in the items array and process them
        for (const item of items) {
            const { skuId, stockQuantity } = item;

            if (!skuId || !stockQuantity) {
                return new Response(
                    JSON.stringify({
                        message: 'skuId and stockQuantity are required fields for each item.',
                    }),
                    {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }

            // Check if the SKU exists
            const existingSku = await prisma.stock.findUnique({
                where: {
                    id: skuId,
                },
            });

            if (!existingSku) {
                return new Response(
                    JSON.stringify({ message: `SKU with id ${skuId} does not exist.` }),
                    {
                        status: 404,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }

            // Check if the stock entry already exists
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
                    JSON.stringify({
                        message: `Stock entry already exists for SKU ${skuId} and warehouse ${warehouseLocation}.`,
                    }),
                    {
                        status: 409,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }

            // Create new stock entry
            await prisma.stock.create({
                data: {
                    skuId,
                    stockQuantity: parseInt(stockQuantity, 10),
                    warehouseLocation,
                    orderDescription,
                },
            });
        }

        return new Response(
            JSON.stringify({ message: 'Stock order created successfully!' }),
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
