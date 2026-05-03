import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Target, Heart, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Về LOOPS - Tổ Chức Kết Nối Cộng Đồng",
  description: "Tìm hiểu về LOOPS - tổ chức kết nối cộng đồng, đào tạo kỹ năng và lan tỏa giá trị tích cực cho giới trẻ Việt Nam.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const sections = [
    { icon: Target, title: "Sứ mệnh", desc: "Kết nối và phát triển thế hệ trẻ Việt Nam thông qua các chương trình đào tạo và hoạt động cộng đồng ý nghĩa." },
    { icon: Heart, title: "Giá trị cốt lõi", desc: "Tận tâm, sáng tạo, kết nối và lan tỏa. Mỗi thành viên LOOPS đều là một đại sứ của giá trị tích cực." },
    { icon: Globe, title: "Tầm nhìn", desc: "Trở thành cộng đồng bạn đồng hành lớn nhất Việt Nam, nơi mỗi cá nhân đều có cơ hội phát triển toàn diện." },
  ];

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
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">Về LOOPS</h1>
        <p className="text-lg text-gray-300 mb-16 max-w-2xl">LOOPS là cộng đồng kết nối những người trẻ có chung đam mê cống hiến và phát triển bản thân. Chúng tôi tin rằng mỗi cá nhân đều có khả năng tạo nên sự thay đổi tích cực.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {sections.map((s, i) => (
            <div key={i} className="p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6"><s.icon className="w-7 h-7 text-white" /></div>
              <h2 className="text-2xl font-bold text-white mb-3">{s.title}</h2>
              <p className="text-gray-300 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>
      <footer className="relative backdrop-blur-xl bg-white/5 border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400"><p>© 2026 LOOPS. Tất cả quyền được bảo lưu.</p></div>
      </footer>
    </div>
  );
}
