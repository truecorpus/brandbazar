import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { User, Building2, Shield, Bell } from "lucide-react";

const ProfileSettings = () => {
  const { user, profile, role } = useAuth();
  const isCorporate = role === "corporate_client";

  const [personal, setPersonal] = useState({ full_name: "", phone: "" });
  const [company, setCompany] = useState({ company_name: "", gst_number: "", designation: "" });
  const [passwords, setPasswords] = useState({ current: "", newPw: "", confirm: "" });
  const [notifications, setNotifications] = useState({ email_orders: true, email_promos: false, sms_orders: true });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) {
      setPersonal({ full_name: profile.full_name || "", phone: profile.phone || "" });
      setCompany({ company_name: profile.company_name || "", gst_number: profile.gst_number || "", designation: profile.designation || "" });
    }
  }, [profile]);

  const savePersonal = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(personal).eq("user_id", user.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Changes saved successfully");
  };

  const saveCompany = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(company).eq("user_id", user.id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Changes saved successfully");
  };

  const changePassword = async () => {
    if (passwords.newPw !== passwords.confirm) { toast.error("Passwords don't match"); return; }
    if (passwords.newPw.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password: passwords.newPw });
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Password updated");
    setPasswords({ current: "", newPw: "", confirm: "" });
  };

  return (
    <div className="max-w-[700px] space-y-6">
      <h1 className="text-[22px] font-heading font-semibold text-foreground">Profile Settings</h1>

      <Tabs defaultValue="personal">
        <TabsList className="bg-secondary">
          <TabsTrigger value="personal" className="gap-2"><User size={14} /> Personal</TabsTrigger>
          {isCorporate && <TabsTrigger value="company" className="gap-2"><Building2 size={14} /> Company</TabsTrigger>}
          <TabsTrigger value="security" className="gap-2"><Shield size={14} /> Security</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell size={14} /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <div className="bg-background rounded-2xl border border-border p-6 space-y-4" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="space-y-1.5">
              <Label>Full name</Label>
              <Input value={personal.full_name} onChange={(e) => setPersonal((p) => ({ ...p, full_name: e.target.value }))} />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled className="bg-secondary/50" />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input value={personal.phone} onChange={(e) => setPersonal((p) => ({ ...p, phone: e.target.value }))} />
            </div>
            <Button onClick={savePersonal} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
          </div>
        </TabsContent>

        {isCorporate && (
          <TabsContent value="company" className="mt-6">
            <div className="bg-background rounded-2xl border border-border p-6 space-y-4" style={{ boxShadow: "var(--shadow-sm)" }}>
              <div className="space-y-1.5"><Label>Company name</Label><Input value={company.company_name} onChange={(e) => setCompany((p) => ({ ...p, company_name: e.target.value }))} /></div>
              <div className="space-y-1.5"><Label>GST number</Label><Input value={company.gst_number} onChange={(e) => setCompany((p) => ({ ...p, gst_number: e.target.value }))} /></div>
              <div className="space-y-1.5"><Label>Designation</Label><Input value={company.designation} onChange={(e) => setCompany((p) => ({ ...p, designation: e.target.value }))} /></div>
              <Button onClick={saveCompany} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
            </div>
          </TabsContent>
        )}

        <TabsContent value="security" className="mt-6">
          <div className="bg-background rounded-2xl border border-border p-6 space-y-4" style={{ boxShadow: "var(--shadow-sm)" }}>
            <h3 className="text-sm font-heading font-semibold text-foreground">Change Password</h3>
            <div className="space-y-1.5"><Label>New password</Label><Input type="password" value={passwords.newPw} onChange={(e) => setPasswords((p) => ({ ...p, newPw: e.target.value }))} /></div>
            <div className="space-y-1.5"><Label>Confirm new password</Label><Input type="password" value={passwords.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} /></div>
            <Button onClick={changePassword} disabled={saving}>{saving ? "Updating..." : "Update Password"}</Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="bg-background rounded-2xl border border-border p-6 space-y-5" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-foreground">Order updates via email</p><p className="text-xs text-muted-foreground">Get notified when your order status changes</p></div>
              <Switch checked={notifications.email_orders} onCheckedChange={(c) => setNotifications((p) => ({ ...p, email_orders: c }))} />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-foreground">Promotional emails</p><p className="text-xs text-muted-foreground">Receive offers and new product updates</p></div>
              <Switch checked={notifications.email_promos} onCheckedChange={(c) => setNotifications((p) => ({ ...p, email_promos: c }))} />
            </div>
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-medium text-foreground">SMS notifications</p><p className="text-xs text-muted-foreground">Get order updates via SMS</p></div>
              <Switch checked={notifications.sms_orders} onCheckedChange={(c) => setNotifications((p) => ({ ...p, sms_orders: c }))} />
            </div>
            <Button onClick={() => toast.success("Notification preferences saved")}>Save Preferences</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileSettings;
