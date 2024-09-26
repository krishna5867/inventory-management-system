import prisma from '@/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { warehouseLocation } = body;

    if (!warehouseLocation) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const location = await prisma.warehouseLocation.create({
      data: {
        warehouseLocation,
      },
    });
    console.log("location", location);
    

    return new Response(JSON.stringify(location), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating Warehouse Location:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to add Warehouse Location' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    await prisma.$disconnect();
    console.log('finally');
  }
}

export async function GET(req) {
  try {
    const locationDetails = await prisma.WarehouseLocation.findMany();

    return new Response(JSON.stringify(locationDetails), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching Warehouse Location:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to fetch Warehouse Location' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } finally {
    await prisma.$disconnect();
  }
}
