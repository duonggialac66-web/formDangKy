import type { Metadata } from "next";
import LandingPageClient from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "LOOPS - Đăng Ký Bạn Đồng Hành 2026 | Kết Nối Cộng Đồng",
  description:
    "Đăng ký trở thành Bạn Đồng Hành LOOPS 2026. Được đào tạo kỹ năng, mở rộng mạng lưới, tham gia hoạt động cộng đồng ý nghĩa. Đăng ký miễn phí ngay!",
  alternates: {
    canonical: "/",
  },
};

// SSG page — pre-rendered at build time for maximum SEO performance
export default function HomePage() {
  return (
    <>
      {/* JSON-LD Event structured data for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "LOOPS - Chương Trình Bạn Đồng Hành 2026",
            description:
              "Chương trình đào tạo và kết nối cộng đồng dành cho các bạn trẻ muốn phát triển bản thân",
            startDate: "2026-06-01",
            eventAttendanceMode:
              "https://schema.org/MixedEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            organizer: {
              "@type": "Organization",
              name: "LOOPS",
              url:
                process.env.NEXT_PUBLIC_SITE_URL ||
                "https://loops-donghanh.vn",
            },
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "VND",
              availability: "https://schema.org/InStock",
              url:
                (process.env.NEXT_PUBLIC_SITE_URL ||
                  "https://loops-donghanh.vn") + "/#register",
            },
          }),
        }}
      />
      <LandingPageClient />
    </>
  );
}
