"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Sparkles, Rocket, Users, Award, ArrowRight, LogIn, LogOut, LayoutDashboard, Lock as LockIcon, Info } from "lucide-react";
import Scene3D from "@/components/Scene3D";
import ParticlesBackground from "@/components/ParticlesBackground";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PageContent {
  headerTitle: string;
  headerSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  benefitsTitle: string;
  benefits: string[];
  formTitle: string;
  formDescription: string;
}

const defaultContent: PageContent = {
  headerTitle: "LOOPS",
  headerSubtitle: "Hành trình cùng bạn",
  heroTitle: "Trở thành Bạn đồng hành của LOOPS",
  heroDescription: "Cùng nhau tạo nên những trải nghiệm ý nghĩa, kết nối cộng đồng và lan tỏa giá trị tích cực",
  benefitsTitle: "Lợi ích khi tham gia",
  benefits: [
    "Được đào tạo kỹ năng mềm và kỹ năng chuyên môn",
    "Tham gia các hoạt động cộng đồng ý nghĩa",
    "Mở rộng mạng lưới quan hệ",
    "Nhận chứng nhận sau khi hoàn thành chương trình"
  ],
  formTitle: "Đăng ký ngay",
  formDescription: "Điền thông tin của bạn để tham gia chương trình"
};

export default function LandingPageClient() {
  const { data: session } = useSession();
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        fullName: session.user.name || prev.fullName,
        email: session.user.email || prev.email,
      }));
    }
  }, [session]);

  useEffect(() => {
    // Load page content from API (server database)
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.headerTitle) {
          setContent(data);
        }
      })
      .catch(() => {
        // Use default content on error
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowSuccessDialog(true);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
        });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } catch {
      toast.error("Không thể kết nối. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefitIcons = [Sparkles, Rocket, Users, Award];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticlesBackground />

      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-pink-500/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Glass Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 text-xl">
                  {content.headerTitle}
                </span>
                <p className="text-xs text-gray-400">{content.headerSubtitle}</p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="https://www.loops.vn/vi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors hidden md:flex items-center gap-2 group"
              >
                <Info className="w-4 h-4 group-hover:text-purple-400 transition-colors" />
                <span>Về chúng tôi</span>
              </a>
              {session ? (
                <>
                  {session.user.isAdmin && (
                    <Link
                      href="/admin"
                      className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin
                    </Link>
                  )}
                  <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <img 
                      src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}&background=random`} 
                      alt={session.user.name || "Avatar"} 
                      className="w-6 h-6 rounded-full border border-white/20"
                    />
                    <span className="text-xs text-gray-300 font-medium max-w-[100px] truncate">
                      {session.user.name}
                    </span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-gray-400 hover:text-white transition-all text-sm"
                  >
                    Đăng nhập
                  </Link>
                  <button
                    onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 text-white font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] text-sm"
                  >
                    Đăng ký ngay
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section with 3D */}
      <section className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
            >
              <span className="text-sm bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ✨ Chương trình mở cửa 2026
              </span>
            </motion.div>

            <h1 className="mb-6 text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                {content.heroTitle}
              </span>
            </h1>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {content.heroDescription}
            </p>

            <motion.button
              onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all shadow-lg shadow-purple-500/50 text-white font-bold"
            >
              <span>Đăng ký ngay</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative h-[400px] lg:h-[500px]"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <Scene3D />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative max-w-7xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          {content.benefitsTitle}
        </motion.h2>

        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index % benefitIcons.length];
            return (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-purple-500/50 transition-all"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-200 group-hover:text-white transition-colors">
                    {benefit}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="relative max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-xl relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20" />

          <div className="relative backdrop-blur-xl bg-white/10 p-8 rounded-3xl border border-white/20">
            <h2 className="mb-2 text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {content.formTitle}
            </h2>
            <p className="mb-8 text-gray-300">{content.formDescription}</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="fullName" className="text-gray-200">Họ và tên *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  required
                  placeholder="Nguyễn Văn A"
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-gray-200">Email (Không bắt buộc)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@example.com"
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-gray-200">Số điện thoại *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  placeholder="0912345678"
                  className="mt-2 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-600 hover:from-purple-500 hover:via-fuchsia-400 hover:to-pink-500 text-white py-7 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 font-bold text-lg"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isSubmitting ? "Đang xử lý..." : "Xác nhận đăng ký"}
                    <ArrowRight className="w-6 h-6" />
                  </span>
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md backdrop-blur-2xl bg-black/90 border-white/20 text-white rounded-3xl">
          <DialogHeader className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <DialogTitle className="text-2xl font-bold text-center text-white">Đăng ký thành công!</DialogTitle>
            <DialogDescription className="text-gray-300 text-center text-lg mt-4 leading-relaxed">
              LOOPS sẽ nhanh chóng liên hệ lại với bạn. Vui lòng kiểm tra điện thoại để nhận thông báo từ LOOPS nhé!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-6">
            <Button 
              onClick={() => setShowSuccessDialog(false)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-10 py-6 rounded-2xl font-bold"
            >
              Đã hiểu
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="relative backdrop-blur-xl bg-white/5 border-t border-white/10 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          <p>© 2026 LOOPS. Tất cả quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}
