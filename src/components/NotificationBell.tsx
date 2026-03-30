import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Bell, ShoppingBag, CreditCard, FileImage, FileText, AlertCircle } from "lucide-react";

const typeIcons: Record<string, any> = {
  order_update: ShoppingBag,
  payment: CreditCard,
  mockup_ready: FileImage,
  quote_received: FileText,
  artwork_review: FileImage,
  system_alert: AlertCircle,
};

const NotificationBell = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("recipient_id", user.id)
      .order("created_at", { ascending: false })
      .limit(8);
    const items = data || [];
    setNotifications(items);
    setUnreadCount(items.filter((n) => !n.is_read).length);
  };

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  // Realtime subscription
  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("notifications-bell")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `recipient_id=eq.${user.id}` },
        () => fetchNotifications()
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markRead = async (id: string) => {
    await supabase.from("notifications").update({ is_read: true }).eq("id", id);
    fetchNotifications();
  };

  const timeAgo = (date: string) => {
    const s = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (s < 60) return "just now";
    if (s < 3600) return `${Math.floor(s / 60)}m`;
    if (s < 86400) return `${Math.floor(s / 3600)}h`;
    return `${Math.floor(s / 86400)}d`;
  };

  if (!user) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        aria-label="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-primary text-primary-foreground text-[10px] font-semibold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-[360px] bg-background rounded-xl border border-border overflow-hidden z-50"
          style={{ boxShadow: "var(--shadow-lg)" }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-sm font-semibold text-foreground">Notifications</span>
            {unreadCount > 0 && <span className="text-xs text-primary font-medium">{unreadCount} new</span>}
          </div>
          <div className="max-h-[380px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-10 text-center">
                <Bell className="mx-auto text-muted-foreground/30" size={28} />
                <p className="text-xs text-muted-foreground mt-2">No notifications</p>
              </div>
            ) : (
              notifications.map((n) => {
                const Icon = typeIcons[n.notification_type] || Bell;
                return (
                  <div
                    key={n.id}
                    className={`px-4 py-3 flex items-start gap-3 cursor-pointer hover:bg-secondary/40 transition-colors border-b border-border/50 ${!n.is_read ? "bg-primary/[0.02]" : ""}`}
                    onClick={() => {
                      if (!n.is_read) markRead(n.id);
                      if (n.action_url) navigate(n.action_url);
                      setOpen(false);
                    }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${!n.is_read ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>
                      <Icon size={14} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className={`text-[13px] leading-tight truncate ${!n.is_read ? "font-semibold text-foreground" : "font-medium text-foreground"}`}>{n.title}</p>
                        {!n.is_read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                      </div>
                      {n.message && <p className="text-[12px] text-muted-foreground mt-0.5 line-clamp-1">{n.message}</p>}
                      <p className="text-[11px] text-muted-foreground/70 mt-0.5">{timeAgo(n.created_at)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="px-4 py-2.5 border-t border-border">
            <button
              onClick={() => { navigate("/dashboard/notifications"); setOpen(false); }}
              className="text-xs text-primary font-medium hover:text-primary/80 transition-colors w-full text-center"
            >
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
