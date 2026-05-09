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
    const body = await req.json();
    const { fullName, email, phone, companyName, motivation } = body;

    if (!fullName || !phone) {
      return NextResponse.json({ error: "Vui lòng nhập đầy đủ Họ tên và Số điện thoại" }, { status: 400 });
    }

    const userId = session?.user?.id ? parseInt(session.user.id) : null;

    const registration = await prisma.registration.create({
      data: { 
        fullName, 
        email, 
        phone, 
        companyName,
        motivation,
        userId: userId && !isNaN(userId) ? userId : null
      },
    });

    // Sync to Google Sheets if configured
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
