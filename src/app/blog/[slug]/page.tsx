import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Sparkles, Calendar, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true },
    });
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    if (!post) return { title: "Không tìm thấy bài viết" };
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: `/blog/${post.slug}` },
      openGraph: {
        type: "article",
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [{ url: post.coverImage }] : [],
        publishedTime: post.publishedAt?.toISOString(),
      },
    };
  } catch {
    return { title: "Blog" };
  }
}

export const revalidate = 3600; // ISR: revalidate every hour

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findUnique({ where: { slug, published: true } });
  } catch {
    return null;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-pink-500/20 rounded-full blur-[120px]" />
      </div>
      <header className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-xl">LOOPS</span>
          </div>
          <Link href="/blog" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50">
            <ArrowLeft className="w-4 h-4" />Tất cả bài viết
          </Link>
        </div>
      </header>
      <main className="relative container mx-auto px-4 py-20">
        <article className="max-w-3xl mx-auto">
          {post.coverImage && (
            <div className="aspect-video rounded-2xl overflow-hidden mb-8">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-10">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("vi-VN", { year: "numeric", month: "long", day: "numeric" }) : ""}</span>
          </div>
          <div className="prose prose-invert prose-purple max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</div>
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-3">Tham gia LOOPS ngay!</h2>
            <p className="text-gray-300 mb-4">Đăng ký trở thành Bạn Đồng Hành LOOPS 2026 và bắt đầu hành trình phát triển bản thân.</p>
            <Link href="/#register" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all text-white font-medium">Đăng ký ngay</Link>
          </div>
        </article>
      </main>
      <footer className="relative backdrop-blur-xl bg-white/5 border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400"><p>© 2026 LOOPS. Tất cả quyền được bảo lưu.</p></div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: post.title, description: post.excerpt,
        image: post.coverImage || undefined,
        datePublished: post.publishedAt?.toISOString(),
        author: { "@type": "Organization", name: "LOOPS" }
      }) }} />
    </div>
  );
}
