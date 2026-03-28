import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Users, Mail, UserPlus, Shield, Eye, ShoppingBag, X } from "lucide-react";

type Member = {
  id: string;
  user_id: string;
  is_primary_contact: boolean;
  profile?: { full_name: string | null; phone: string | null };
  email?: string;
};

const roleLabels: Record<string, { label: string; icon: any; color: string }> = {
  primary: { label: "Admin", icon: Shield, color: "bg-primary/10 text-primary" },
  member: { label: "Order Placer", icon: ShoppingBag, color: "bg-green-50 text-green-700" },
  viewer: { label: "Viewer", icon: Eye, color: "bg-muted text-muted-foreground" },
};

const TeamMembers = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data: membership } = await supabase
        .from("corporate_account_members")
        .select("corporate_account_id")
        .eq("user_id", user.id)
        .limit(1)
        .single();

      if (membership) {
        const { data: allMembers } = await supabase
          .from("corporate_account_members")
          .select("id, user_id, is_primary_contact")
          .eq("corporate_account_id", membership.corporate_account_id);

        if (allMembers) {
          const enriched = await Promise.all(
            allMembers.map(async (m) => {
              const { data: profile } = await supabase
                .from("profiles")
                .select("full_name, phone")
                .eq("user_id", m.user_id)
                .single();
              return { ...m, profile: profile || undefined };
            })
          );
          setMembers(enriched);
        }
      }
      setLoading(false);
    };
    fetch();
  }, [user]);

  return (
    <div className="max-w-[900px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-semibold text-foreground">Team Members</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage who can place orders under your corporate account</p>
        </div>
        <Button onClick={() => setShowInvite(true)} className="gap-2">
          <UserPlus size={16} /> Invite Member
        </Button>
      </div>

      {/* Invite form */}
      {showInvite && (
        <div className="bg-background rounded-2xl border border-border p-6" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Invite by Email</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowInvite(false)}><X size={16} /></Button>
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="colleague@company.com"
              />
            </div>
            <select className="h-10 rounded-lg border border-border bg-background px-3 text-sm">
              <option value="member">Order Placer</option>
              <option value="viewer">Viewer</option>
            </select>
            <Button disabled={!inviteEmail.includes("@")}>
              <Mail size={14} className="mr-1" /> Send Invite
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">An invitation email will be sent. They'll need to create a BrandBazaar account to join.</p>
        </div>
      )}

      {/* Members list */}
      <div className="bg-background rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Users size={16} className="text-primary" />
            {members.length} Team Member{members.length !== 1 ? "s" : ""}
          </h2>
        </div>
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : members.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="mx-auto text-muted-foreground/40" size={40} />
            <p className="mt-3 text-sm text-muted-foreground">No team members yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {members.map((m) => {
              const roleKey = m.is_primary_contact ? "primary" : "member";
              const role = roleLabels[roleKey];
              return (
                <div key={m.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                      {(m.profile?.full_name || "U").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{m.profile?.full_name || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">{m.profile?.phone || ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={`text-xs gap-1 ${role.color}`}>
                      <role.icon size={10} /> {role.label}
                    </Badge>
                    {m.user_id === user?.id && (
                      <Badge variant="outline" className="text-[10px]">You</Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
