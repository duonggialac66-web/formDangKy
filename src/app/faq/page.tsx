import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ - Câu Hỏi Thường Gặp Về Bạn Đồng Hành LOOPS",
  description: "Giải đáp tất cả câu hỏi về chương trình Bạn Đồng Hành LOOPS 2026: điều kiện, quyền lợi, thời gian, cách đăng ký.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  { q: "LOOPS là gì?", a: "LOOPS là chương trình kết nối cộng đồng, tạo cơ hội cho các bạn trẻ phát triển kỹ năng mềm, kỹ năng chuyên môn và mở rộng mạng lưới quan hệ thông qua các hoạt động ý nghĩa." },
  { q: "Ai có thể đăng ký?", a: "Tất cả các bạn trẻ từ 18 tuổi trở lên, có tinh thần cống hiến và mong muốn phát triển bản thân đều có thể tham gia chương trình Bạn Đồng Hành LOOPS." },
  { q: "Chương trình kéo dài bao lâu?", a: "Chương trình Bạn Đồng Hành LOOPS 2026 kéo dài 6 tháng, bắt đầu từ tháng 6/2026. Trong thời gian này, bạn sẽ tham gia các buổi đào tạo và hoạt động cộng đồng định kỳ." },
  { q: "Chi phí tham gia là bao nhiêu?", a: "Chương trình hoàn toàn MIỄN PHÍ. LOOPS cam kết tạo cơ hội bình đẳng cho tất cả mọi người." },
  { q: "Tôi sẽ nhận được gì khi tham gia?", a: "Bạn sẽ được đào tạo kỹ năng, tham gia hoạt động cộng đồng, mở rộng mạng lưới, và nhận chứng nhận hoàn thành chương trình từ LOOPS." },
  { q: "Làm sao để đăng ký?", a: "Bạn chỉ cần truy cập trang chủ LOOPS, điền đầy đủ thông tin vào form đăng ký và nhấn 'Gửi đăng ký'. Đội ngũ LOOPS sẽ liên hệ với bạn trong vòng 3 ngày làm việc." },
];

export default function FAQPage() {
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
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">Câu Hỏi Thường Gặp</h1>
        <p className="text-lg text-gray-300 mb-16 max-w-2xl">Giải đáp những thắc mắc phổ biến về chương trình Bạn Đồng Hành LOOPS 2026.</p>
        <div className="max-w-3xl space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10">
              <h2 className="text-xl font-bold text-white mb-3">{faq.q}</h2>
              <p className="text-gray-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 max-w-3xl">
          <h2 className="text-2xl font-bold text-white mb-3">Còn câu hỏi khác?</h2>
          <p className="text-gray-300 mb-4">Hãy đăng ký và đội ngũ LOOPS sẽ liên hệ trực tiếp với bạn để giải đáp mọi thắc mắc.</p>
          <Link href="/#register" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all text-white font-medium">Đăng ký ngay</Link>
        </div>
      </main>
      <footer className="relative backdrop-blur-xl bg-white/5 border-t border-white/10 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-sm text-gray-400"><p>© 2026 LOOPS. Tất cả quyền được bảo lưu.</p></div>
      </footer>

      {/* FAQ structured data for Google rich results */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
          "@type": "Question", name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      }) }} />
    </div>
  );
}
