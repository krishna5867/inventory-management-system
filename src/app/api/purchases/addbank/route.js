import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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


// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function POST(req) {
//     try {
//         // Check if the request method is POST
//         if (req.method !== 'POST') {
//             return new Response(
//                 JSON.stringify({ message: 'Method not allowed' }),
//                 {
//                     status: 405,
//                     headers: { 'Content-Type': 'application/json' },
//                 }
//             );
//         }

//         // Log the request headers and body
//         console.log('Request Headers:', req.headers);
        
//         // Read the body as text first
//         const bodyText = await req.text();
//         console.log('Raw request body:', bodyText); // Add this line for debugging

//         // Check if the body is empty or invalid
//         if (!bodyText) {
//             return new Response(
//                 JSON.stringify({ message: 'Empty request body' }),
//                 {
//                     status: 400,
//                     headers: { 'Content-Type': 'application/json' },
//                 }
//             );
//         }

//         // Parse the body as JSON
//         let parsedBody;
//         try {
//             parsedBody = JSON.parse(bodyText);
//         } catch (error) {
//             console.error('Error parsing JSON:', error);
//             return new Response(
//                 JSON.stringify({ message: 'Invalid JSON body' }),
//                 {
//                     status: 400,
//                     headers: { 'Content-Type': 'application/json' },
//                 }
//             );
//         }

//         const { bankName, accountNumber, description } = parsedBody;

//         // Validate required fields
//         if (!bankName || !accountNumber) {
//             return new Response(
//                 JSON.stringify({ message: 'Missing required fields' }),
//                 {
//                     status: 400,
//                     headers: { 'Content-Type': 'application/json' },
//                 }
//             );
//         }

//         // Create new bank detail record
//         const bankDetail = await prisma.bankDetails.create({
//             data: {
//                 bankName,
//                 accountNumber,
//                 description,
//             },
//         });

//         // Return the newly created bank detail record
//         return new Response(JSON.stringify(bankDetail), {
//             status: 200,
//             headers: { 'Content-Type': 'application/json' },
//         });
//     } catch (error) {
//         console.error('Error creating bank detail:', error);
//         return new Response(
//             JSON.stringify({ message: 'Failed to add bank detail' }),
//             {
//                 status: 500,
//                 headers: { 'Content-Type': 'application/json' },
//             }
//         );
//     }
// }

