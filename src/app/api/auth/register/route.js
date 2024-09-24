import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(req) {
  try {
    const { email, password, name, role } = await req.json();

    // Validate the request payload
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ message: "Email, password, and name are required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'accountant',  // Default role to 'accountant' if not provided
      },
    });

    return new Response(JSON.stringify({
      message: "User created successfully",
      user: { name: user.name, email: user.email, role: user.role },
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error registering user:", error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await prisma.$disconnect();
  }
}
