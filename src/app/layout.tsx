import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://loops-donghanh.vn"),
  title: {
    default: "LOOPS - Đăng Ký Bạn Đồng Hành 2026",
    template: "%s | LOOPS Bạn Đồng Hành",
  },
  description:
    "Đăng ký trở thành Bạn Đồng Hành LOOPS 2026. Kết nối cộng đồng, phát triển kỹ năng, tham gia hoạt động ý nghĩa. Chương trình mở cửa đăng ký ngay!",
  keywords: [
    "đăng ký bạn đồng hành",
    "loops 2026",
    "loops bạn đồng hành",
    "tình nguyện viên",
    "cộng đồng",
    "kỹ năng mềm",
    "hoạt động xã hội",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "LOOPS - Bạn Đồng Hành",
    title: "LOOPS - Đăng Ký Bạn Đồng Hành 2026",
    description:
      "Cùng nhau tạo nên những trải nghiệm ý nghĩa, kết nối cộng đồng và lan tỏa giá trị tích cực.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LOOPS - Bạn Đồng Hành 2026",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

import { Toaster } from "sonner";
import { AuthProvider } from "@/components/providers/session-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LOOPS",
              description: "Chương trình Bạn Đồng Hành LOOPS 2026",
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://loops-donghanh.vn",
            }),
          }}
        />
      </head>
      <body style={{ height: "100%", margin: 0 }}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
