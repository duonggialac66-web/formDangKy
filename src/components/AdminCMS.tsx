"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

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

export default function AdminCMS() {
  const [content, setContent] = useState<PageContent>(defaultContent);
  const [newBenefit, setNewBenefit] = useState("");

  useEffect(() => {
    fetch("/api/content").then(r => r.json()).then(data => {
      if (data && data.headerTitle) setContent(data);
    }).catch(() => {});
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) toast.success("Đã lưu thay đổi!");
      else toast.error("Có lỗi khi lưu.");
    } catch { toast.error("Không thể kết nối server."); }
  };

  const handleReset = async () => {
    if (confirm("Bạn có chắc muốn khôi phục nội dung mặc định?")) {
      setContent(defaultContent);
      try {
        await fetch("/api/content", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(defaultContent),
        });
        toast.success("Đã khôi phục nội dung mặc định!");
      } catch { toast.error("Không thể kết nối server."); }
    }
  };

  const addBenefit = () => {
    if (newBenefit.trim()) {
      setContent({ ...content, benefits: [...content.benefits, newBenefit.trim()] });
      setNewBenefit("");
    }
  };

  const removeBenefit = (index: number) => {
    setContent({ ...content, benefits: content.benefits.filter((_, i) => i !== index) });
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...content.benefits];
    newBenefits[index] = value;
    setContent({ ...content, benefits: newBenefits });
  };

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur-xl bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Header</CardTitle>
          <CardDescription className="text-gray-400">Chỉnh sửa tiêu đề và slogan trang</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="headerTitle" className="text-gray-200">Tiêu đề</Label>
            <Input id="headerTitle" value={content.headerTitle} onChange={(e) => setContent({...content, headerTitle: e.target.value})} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
          </div>
          <div>
            <Label htmlFor="headerSubtitle" className="text-gray-200">Slogan</Label>
            <Input id="headerSubtitle" value={content.headerSubtitle} onChange={(e) => setContent({...content, headerSubtitle: e.target.value})} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="backdrop-blur-xl bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Hero Section</CardTitle>
          <CardDescription className="text-gray-400">Phần giới thiệu chính</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="heroTitle" className="text-gray-200">Tiêu đề chính</Label>
            <Input id="heroTitle" value={content.heroTitle} onChange={(e) => setContent({...content, heroTitle: e.target.value})} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
          </div>
          <div>
            <Label htmlFor="heroDescription" className="text-gray-200">Mô tả</Label>
            <Textarea id="heroDescription" value={content.heroDescription} onChange={(e) => setContent({...content, heroDescription: e.target.value})} rows={3} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
          </div>
        </CardContent>
      </Card>
      <Card className="backdrop-blur-xl bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Lợi ích</CardTitle>
          <CardDescription className="text-gray-400">Các lợi ích khi tham gia chương trình</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="benefitsTitle" className="text-gray-200">Tiêu đề phần lợi ích</Label>
            <Input id="benefitsTitle" value={content.benefitsTitle} onChange={(e) => setContent({...content, benefitsTitle: e.target.value})} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
          </div>
          <div className="space-y-3">
            <Label className="text-gray-200">Danh sách lợi ích</Label>
            {content.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <Input value={benefit} onChange={(e) => updateBenefit(index, e.target.value)} placeholder={`Lợi ích ${index + 1}`} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
                <Button variant="destructive" size="icon" onClick={() => removeBenefit(index)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input value={newBenefit} onChange={(e) => setNewBenefit(e.target.value)} placeholder="Thêm lợi ích mới..." onKeyPress={(e) => e.key === "Enter" && addBenefit()} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
              <Button onClick={addBenefit} size="icon" className="bg-purple-600 hover:bg-purple-700"><Plus className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="backdrop-blur-xl bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Form đăng ký</CardTitle>
          <CardDescription className="text-gray-400">Tiêu đề và mô tả form</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="formTitle" className="text-gray-200">Tiêu đề form</Label>
            <Input id="formTitle" value={content.formTitle} onChange={(e) => setContent({...content, formTitle: e.target.value})} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
          </div>
          <div>
            <Label htmlFor="formDescription" className="text-gray-200">Mô tả form</Label>
            <Textarea id="formDescription" value={content.formDescription} onChange={(e) => setContent({...content, formDescription: e.target.value})} rows={2} className="bg-white/5 border-white/10 text-white placeholder:text-gray-500" />
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-3">
        <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500">Lưu thay đổi</Button>
        <Button onClick={handleReset} variant="outline" className="border-white/20 text-white hover:bg-white/10">Khôi phục mặc định</Button>
      </div>
    </div>
  );
}
