import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Building2, Mail, Truck, Calculator } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminSettings = () => (
  <div className="space-y-4">
    <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Store Settings</h1>

    <Tabs defaultValue="business" className="space-y-4">
      <TabsList className="bg-white border border-[#DADCE0]">
        <TabsTrigger value="business" className="text-[13px] data-[state=active]:bg-[#E8F0FE] data-[state=active]:text-[#1A73E8]">Business Info</TabsTrigger>
        <TabsTrigger value="email" className="text-[13px] data-[state=active]:bg-[#E8F0FE] data-[state=active]:text-[#1A73E8]">Email Templates</TabsTrigger>
        <TabsTrigger value="notifications" className="text-[13px] data-[state=active]:bg-[#E8F0FE] data-[state=active]:text-[#1A73E8]">Notifications</TabsTrigger>
        <TabsTrigger value="payments" className="text-[13px] data-[state=active]:bg-[#E8F0FE] data-[state=active]:text-[#1A73E8]">Payments</TabsTrigger>
      </TabsList>

      <TabsContent value="business">
        <Card className="p-6 border-[#DADCE0] space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Company Name</label>
              <Input defaultValue="BrandBazaar" className="h-9 text-[13px] border-[#DADCE0]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">GST Number</label>
              <Input placeholder="GSTIN" className="h-9 text-[13px] border-[#DADCE0]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">PAN Number</label>
              <Input placeholder="PAN" className="h-9 text-[13px] border-[#DADCE0]" />
            </div>
            <div>
              <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Contact Email</label>
              <Input placeholder="admin@brandbazaar.com" className="h-9 text-[13px] border-[#DADCE0]" />
            </div>
          </div>
          <div>
            <label className="text-[12px] font-medium text-[#5F6368] mb-1 block">Company Address</label>
            <Textarea placeholder="Full address..." className="text-[13px] border-[#DADCE0]" />
          </div>
          <Button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white text-[13px]">Save Changes</Button>
        </Card>
      </TabsContent>

      <TabsContent value="email">
        <Card className="p-6 border-[#DADCE0]">
          <p className="text-[13px] text-[#5F6368]">Email template configuration will be available after email infrastructure setup.</p>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card className="p-6 border-[#DADCE0]">
          <p className="text-[13px] text-[#5F6368]">WhatsApp and notification settings will be configured here.</p>
        </Card>
      </TabsContent>

      <TabsContent value="payments">
        <Card className="p-6 border-[#DADCE0]">
          <p className="text-[13px] text-[#5F6368]">Payment gateway configuration (Razorpay) will be set up here.</p>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
);

export default AdminSettings;
