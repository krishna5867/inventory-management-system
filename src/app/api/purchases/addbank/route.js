import prisma from "@/lib/prisma";

export async function POST(req) {
    try {
        const body = await req.json();
        const { bankName, accountNumber, description } = body;

        if (!bankName || !accountNumber) {
            return new Response(
                JSON.stringify({ message: 'Missing required fields' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const bankDetail = await prisma.bankDetails.create({
            data: {
                bankName,
                accountNumber,
                description
            },
        });

        return new Response(JSON.stringify(bankDetail), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error creating bank detail:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to add bank detail' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } 
    finally {
        await prisma.$disconnect();
        console.log("finally");
        
    }
}


export async function GET(req) {
    try {
        const bankDetails = await prisma.bankDetails.findMany();

        return new Response(JSON.stringify(bankDetails), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching bank details:', error);
        return new Response(
            JSON.stringify({ message: 'Failed to fetch bank details' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } finally {
        await prisma.$disconnect();
    }
}