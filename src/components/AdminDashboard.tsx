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
import * as XLSX from "xlsx";
import { Download } from "lucide-react";

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

  const handleExport = () => {
    const dataToExport = registrations.map((reg) => ({
      "Họ và tên": reg.fullName,
      "Email": reg.email || "Không có",
      "Số điện thoại": reg.phone,
      "Thời gian đăng ký": formatDate(reg.createdAt)
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");
    XLSX.writeFile(workbook, `LOOPS_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
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
        className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5">
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
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <Tabs defaultValue="registrations" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-white/5 backdrop-blur-2xl border border-white/10 p-1.5 rounded-2xl h-14">
            <TabsTrigger 
              value="registrations" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 transition-all duration-300"
            >
              <Users className="w-4 h-4 mr-2" />
              <span className="font-bold">Đăng ký</span>
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-purple-500/30 transition-all duration-300"
            >
              <FileText className="w-4 h-4 mr-2" />
              <span className="font-bold">Nội dung trang</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="registrations" className="space-y-4">
            <Card className="backdrop-blur-xl bg-white/5 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">Danh sách đăng ký</CardTitle>
                  <CardDescription className="text-gray-400">Tổng số: {registrations.length} đăng ký</CardDescription>
                </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleExport}
                      className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 hover:border-emerald-400 text-emerald-100 flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(5,150,105,0.3)] backdrop-blur-sm"
                    >
                      <Download className="w-4 h-4 text-emerald-400" />
                      Xuất Excel
                    </Button>
                  </div>
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
                            <TableCell className="text-right space-x-3">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="bg-white/5 border-white/10 hover:bg-white/20 hover:border-white/30 text-gray-300 hover:text-white rounded-lg px-4 transition-all"
                                onClick={() => { setSelectedRegistration(reg); setShowDetail(true); }}
                              >
                                Chi tiết
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/50 text-red-400 rounded-lg px-4 transition-all"
                                onClick={() => deleteRegistration(reg.id)}
                              >
                                Xóa
                              </Button>
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
        <DialogContent className="max-w-2xl backdrop-blur-3xl bg-black/80 border-white/10 text-white rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500" />
          <DialogHeader className="pb-4 border-b border-white/5">
            <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Chi tiết đăng ký
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Thông tin chi tiết được gửi vào {selectedRegistration ? formatDate(selectedRegistration.createdAt) : ""}
            </DialogDescription>
          </DialogHeader>

          {selectedRegistration && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">Họ và tên</p>
                <p className="text-xl font-medium text-white">{selectedRegistration.fullName}</p>
              </div>
              <div className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs font-bold text-pink-400 uppercase tracking-wider">Số điện thoại</p>
                <p className="text-xl font-medium text-white">{selectedRegistration.phone}</p>
              </div>
              <div className="md:col-span-2 space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Địa chỉ Email</p>
                <p className="text-xl font-medium text-white">{selectedRegistration.email || "Chưa cung cấp"}</p>
              </div>
              <div className="md:col-span-2 space-y-2 p-4 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-white/5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Lý do tham gia / Lời nhắn</p>
                <p className="text-white leading-relaxed italic">
                  "{selectedRegistration.motivation || "Không có lời nhắn đi kèm"}"
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-end pt-2">
            <Button 
              onClick={() => setShowDetail(false)}
              className="px-8 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-all"
            >
              Đóng cửa sổ
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
