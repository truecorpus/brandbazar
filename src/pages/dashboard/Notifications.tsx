import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell, ShoppingBag, CreditCard, FileImage, FileText, AlertCircle, CheckCheck } from "lucide-react";

const typeIcons: Record<string, any> = {
  order_update: ShoppingBag,
  payment: CreditCard,
  mockup_ready: FileImage,
  quote_received: FileText,
  artwork_review: FileImage,
  system_alert: AlertCircle,
};

const Notifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("recipient_id", user.id)
      .order("created_at", { ascending: false });
    setNotifications(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchNotifications(); }, [user]);

  const markAllRead = async () => {
    if (!user) return;
    await supabase.from("notifications").update({ is_read: true }).eq("recipient_id", user.id).eq("is_read", false);
    toast("All notifications marked as read");
    fetchNotifications();
  };

  const markRead = async (id: string) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    fetchNotifications();
  };

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  };

  const unread = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="max-w-[800px] space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-heading font-semibold text-foreground">Notifications</h1>
          {unread > 0 && <p className="text-sm text-muted-foreground mt-1">{unread} unread</p>}
        </div>
        {unread > 0 && (
          <Button variant="outline" size="sm" className="gap-2" onClick={markAllRead}>
            <CheckCheck size={14} /> Mark all as read
          </Button>
        )}
      </div>

      <div className="bg-background rounded-2xl border border-border" style={{ boxShadow: "var(--shadow-sm)" }}>
        {loading ? (
          <div className="p-12 text-center text-sm text-muted-foreground">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="mx-auto text-muted-foreground/40" size={40} />
            <p className="mt-3 text-sm text-muted-foreground">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((n) => {
              const Icon = typeIcons[n.notification_type] || Bell;
              return (
                <div
                  key={n.id}
                  className={`px-6 py-4 flex items-start gap-4 transition-colors cursor-pointer hover:bg-secondary/30 ${!n.is_read ? "bg-primary/[0.02]" : ""}`}
                  onClick={() => !n.is_read && markRead(n.id)}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${!n.is_read ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${!n.is_read ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>{n.title}</p>
                      {!n.is_read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    {n.message && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>}
                    <p className="text-xs text-muted-foreground mt-1">{timeAgo(n.created_at)}</p>
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

export default Notifications;
