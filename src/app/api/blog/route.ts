import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET — list published blog posts (or all for admin)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "true";

  try {
    const posts = await prisma.blogPost.findMany({
      where: all ? {} : { published: true },
      orderBy: { publishedAt: "desc" },
      select: { id: true, title: true, slug: true, excerpt: true, coverImage: true, tags: true, published: true, publishedAt: true, createdAt: true },
    });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

// POST — create blog post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, excerpt, content, coverImage, tags, published } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const post = await prisma.blogPost.create({
      data: {
        title, slug, excerpt, content,
        coverImage: coverImage || null,
        tags: tags || [],
        published: published || false,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("Blog create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT — update blog post
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, slug, excerpt, content, coverImage, tags, published } = body;

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title, slug, excerpt, content, coverImage, tags, published,
        publishedAt: published ? new Date() : null,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Blog update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE — delete blog post
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blog delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
