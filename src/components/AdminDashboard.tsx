"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { Users, FileText, Sparkles, ArrowLeft } from "lucide-react";
import AdminCMS from "@/components/AdminCMS";
import ParticlesBackground from "@/components/ParticlesBackground";
import { Toaster } from "@/components/ui/sonner";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  motivation: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => { loadRegistrations(); }, []);

  const loadRegistrations = async () => {
    try {
      const res = await fetch("/api/register");
      const data = await res.json();
      setRegistrations(data.sort((a: Registration, b: Registration) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch { /* silent */ }
  };

  const deleteRegistration = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa đăng ký này?")) {
      try {
        await fetch(`/api/register?id=${id}`, { method: "DELETE" });
        setRegistrations(registrations.filter(r => r.id !== id));
      } catch { /* silent */ }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticlesBackground />
      <Toaster />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-pink-500/20 rounded-full blur-[120px]" />
      </div>
      <motion.header initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">LOOPS Admin</h1>
                <p className="text-xs text-gray-400">Quản lý hệ thống</p>
              </div>
            </div>
            <a href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 hover:border-purple-500/50">
              <ArrowLeft className="w-4 h-4" />Về trang chủ
            </a>
          </div>
        </div>
      </motion.header>
      <div className="relative container mx-auto px-4 py-8">
        <Tabs defaultValue="registrations" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10">
            <TabsTrigger value="registrations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
              <Users className="w-4 h-4 mr-2" />Đăng ký
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600">
              <FileText className="w-4 h-4 mr-2" />Nội dung trang
            </TabsTrigger>
          </TabsList>
          <TabsContent value="registrations" className="space-y-4">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Danh sách đăng ký</CardTitle>
                <CardDescription className="text-gray-400">Tổng số: {registrations.length} đăng ký</CardDescription>
              </CardHeader>
              <CardContent>
                {registrations.length === 0 ? (
                  <div className="text-center py-12 text-gray-400"><p>Chưa có đăng ký nào</p></div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-white/10 hover:bg-white/5">
                          <TableHead className="text-gray-300">Họ tên</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Số điện thoại</TableHead>
                          <TableHead className="text-gray-300">Thời gian</TableHead>
                          <TableHead className="text-right text-gray-300">Hành động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {registrations.map((reg) => (
                          <TableRow key={reg.id} className="border-white/10 hover:bg-white/5">
                            <TableCell className="text-white">{reg.fullName}</TableCell>
                            <TableCell className="text-gray-300">{reg.email}</TableCell>
                            <TableCell className="text-gray-300">{reg.phone}</TableCell>
                            <TableCell className="text-sm text-gray-400">{formatDate(reg.createdAt)}</TableCell>
                            <TableCell className="text-right space-x-2">
                              <Button size="sm" variant="outline" className="border-white/20 hover:bg-white/10 text-white"
                                onClick={() => { setSelectedRegistration(reg); setShowDetail(true); }}>Chi tiết</Button>
                              <Button size="sm" variant="destructive" onClick={() => deleteRegistration(reg.id)}>Xóa</Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="content"><AdminCMS /></TabsContent>
        </Tabs>
      </div>
      <Dialog open={showDetail} onOpenChange={setShowDetail}>
        <DialogContent className="max-w-2xl backdrop-blur-xl bg-black/90 border-white/20 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Chi tiết đăng ký</DialogTitle>
            <DialogDescription className="text-gray-400">Thông tin chi tiết của người đăng ký</DialogDescription>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-4">
              <div><p className="text-sm text-gray-400 mb-1">Họ và tên</p><p className="text-white">{selectedRegistration.fullName}</p></div>
              <div><p className="text-sm text-gray-400 mb-1">Email</p><p className="text-white">{selectedRegistration.email}</p></div>
              <div><p className="text-sm text-gray-400 mb-1">Số điện thoại</p><p className="text-white">{selectedRegistration.phone}</p></div>
              <div><p className="text-sm text-gray-400 mb-1">Lý do tham gia</p><p className="whitespace-pre-wrap text-white">{selectedRegistration.motivation}</p></div>
              <div><p className="text-sm text-gray-400 mb-1">Thời gian đăng ký</p>
                <Badge variant="secondary" className="bg-purple-600/20 text-purple-300 border-purple-500/30">{formatDate(selectedRegistration.createdAt)}</Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
