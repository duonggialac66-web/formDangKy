import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — list all registrations
export async function GET() {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(registrations);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// POST — create new registration
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Vui lòng đăng nhập để thực hiện đăng ký" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, companyName, email, phone, motivation } = body;

    if (!fullName || !email || !phone || !motivation) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const registration = await prisma.registration.create({
      data: { 
        fullName, 
        companyName,
        email, 
        phone, 
        motivation,
        userId: parseInt(session.user.id)
      },
    });

    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — remove a registration by id
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    await prisma.registration.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
