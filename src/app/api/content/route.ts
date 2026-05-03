import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — get page content
export async function GET() {
  try {
    let content = await prisma.pageContent.findUnique({ where: { id: "main" } });

    if (!content) {
      content = await prisma.pageContent.create({
        data: {
          id: "main",
          heroDescription: "Cùng nhau tạo nên những trải nghiệm ý nghĩa, kết nối cộng đồng và lan tỏa giá trị tích cực",
          benefits: [
            "Được đào tạo kỹ năng mềm và kỹ năng chuyên môn",
            "Tham gia các hoạt động cộng đồng ý nghĩa",
            "Mở rộng mạng lưới quan hệ",
            "Nhận chứng nhận sau khi hoàn thành chương trình"
          ],
          formDescription: "Điền thông tin của bạn để tham gia chương trình",
        },
      });
    }

    return NextResponse.json(content);
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
}

// PUT — update page content
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { headerTitle, headerSubtitle, heroTitle, heroDescription, benefitsTitle, benefits, formTitle, formDescription } = body;

    const content = await prisma.pageContent.upsert({
      where: { id: "main" },
      update: { headerTitle, headerSubtitle, heroTitle, heroDescription, benefitsTitle, benefits, formTitle, formDescription },
      create: {
        id: "main",
        headerTitle, headerSubtitle, heroTitle, heroDescription, benefitsTitle, benefits, formTitle, formDescription,
      },
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error("Content update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
