import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, UserCog } from "lucide-react";

const AdminStaff = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Staff Accounts</h1>
      <Button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white gap-2 text-[13px]"><Plus className="w-4 h-4" /> Add Staff</Button>
    </div>
    <Card className="p-8 border-[#DADCE0] text-center">
      <UserCog className="w-12 h-12 text-[#DADCE0] mx-auto mb-3" />
      <p className="text-[14px] font-medium text-[#202124]">Staff Management</p>
      <p className="text-[13px] text-[#9AA0A6] mt-1">Create and manage staff accounts with role-based access control.</p>
    </Card>
  </div>
);

export default AdminStaff;
