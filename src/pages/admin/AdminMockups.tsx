import { Card } from "@/components/ui/card";
import { Layers, Image as ImageIcon } from "lucide-react";

const AdminMockups = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Mockup Manager</h1>
    <Card className="p-8 border-[#DADCE0] text-center">
      <Layers className="w-12 h-12 text-[#DADCE0] mx-auto mb-3" />
      <p className="text-[14px] font-medium text-[#202124]">Mockup Management</p>
      <p className="text-[13px] text-[#9AA0A6] mt-1">Upload mockups for orders, track client approvals, and manage revision history.</p>
    </Card>
  </div>
);

export default AdminMockups;
