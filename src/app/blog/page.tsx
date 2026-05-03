import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Sparkles, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog - Chia Sẻ & Kiến Thức Từ LOOPS",
  description: "Đọc các bài viết chia sẻ kiến thức, kinh nghiệm và câu chuyện từ cộng đồng Bạn Đồng Hành LOOPS.",
  alternates: { canonical: "/blog" },
};

export const revalidate = 300; // ISR: revalidate every 5 minutes

async function getPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      select: { title: true, slug: true, excerpt: true, coverImage: true, tags: true, publishedAt: true },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

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
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-purple-500/50">
            <ArrowLeft className="w-4 h-4" />Trang chủ
          </Link>
        </div>
      </header>
      <main className="relative container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">Blog</h1>
        <p className="text-lg text-gray-300 mb-16 max-w-2xl">Chia sẻ kiến thức, kinh nghiệm và câu chuyện từ cộng đồng LOOPS.</p>
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl mb-4">Chưa có bài viết nào</p>
            <p>Các bài viết sẽ sớm được đăng tải. Hãy quay lại sau nhé!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-purple-500/50 transition-all overflow-hidden">
                {post.coverImage && (
                  <div className="aspect-video overflow-hidden">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-300">{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{post.title}</h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("vi-VN") : ""}</span>
                    <span className="flex items-center gap-1 text-purple-400 group-hover:text-purple-300">Đọc thêm<ArrowRight className="w-4 h-4" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
      <footer className="relative backdrop-blur-xl bg-white/5 border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400"><p>© 2026 LOOPS. Tất cả quyền được bảo lưu.</p></div>
      </footer>
    </div>
  );
}
