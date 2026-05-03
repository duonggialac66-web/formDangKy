"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Sparkles, Mail, Lock as LockIcon, ArrowRight, Chrome } from "lucide-react";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });

      if (result?.error) {
        toast.error(result.error);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 overflow-hidden relative">
      <ParticlesBackground />
      
      {/* Background Glows */}
      <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" />

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="backdrop-blur-2xl bg-white/5 p-8 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative">
            <div className="flex flex-col items-center mb-8">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Chào mừng trở lại
              </h1>
              <p className="text-gray-400 mt-2 text-center text-sm">
                Đăng nhập để tham gia hành trình cùng LOOPS
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-black hover:bg-gray-100 py-6 rounded-2xl flex items-center justify-center gap-3 transition-all font-semibold"
              >
                <Chrome className="w-5 h-5" />
                Đăng nhập bằng Google
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-black/50 px-2 text-gray-500 backdrop-blur-sm">Hoặc dùng tài khoản</span>
                </div>
              </div>

              <form onSubmit={handleCredentialsLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@loops.vn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/5 border-white/10 pl-12 py-6 rounded-2xl focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <div className="relative">
                    <LockIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-white/5 border-white/10 pl-12 py-6 rounded-2xl focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-6 rounded-2xl shadow-lg shadow-purple-500/20 transition-all"
                >
                  {isLoading ? (
                    "Đang xử lý..."
                  ) : (
                    <span className="flex items-center gap-2">
                      Đăng nhập <ArrowRight className="w-5 h-5" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-gray-500 mt-8 text-sm"
        >
          © 2026 LOOPS. Build with passion.
        </motion.p>
      </motion.div>
    </div>
  );
}
