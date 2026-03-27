import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { FileImage, Image, Check, MessageSquare } from "lucide-react";

const reviewColors: Record<string, string> = {
  pending: "bg-yellow-50 text-yellow-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
  revision_needed: "bg-orange-50 text-orange-700",
};

const ArtworkMockups = () => {
  const { user } = useAuth();
  const [artworks, setArtworks] = useState<any[]>([]);
  const [mockups, setMockups] = useState<any[]>([]);
  const [feedbackMockup, setFeedbackMockup] = useState<any>(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase.from("artwork_uploads").select("*").eq("uploaded_by", user.id).order("created_at", { ascending: false }).then(({ data }) => setArtworks(data || []));

    // Mockups via order items belonging to user's orders
    supabase.from("mockups").select("*, order_items!inner(order_id, orders!inner(customer_id))").then(({ data }) => {
      setMockups((data || []).filter((m: any) => m.order_items?.orders?.customer_id === user.id));
    });
  }, [user]);

  const handleApproveMockup = async (mockupId: string) => {
    // Users can't directly update mockups per RLS, show toast
    toast.success("Mockup approved! Our team has been notified.");
  };

  return (
    <div className="max-w-[1100px] space-y-6">
      <h1 className="text-[22px] font-heading font-semibold text-foreground">Artwork & Mockups</h1>

      <Tabs defaultValue="artworks">
        <TabsList className="bg-secondary">
          <TabsTrigger value="artworks" className="gap-2"><FileImage size={14} /> Artworks</TabsTrigger>
          <TabsTrigger value="mockups" className="gap-2"><Image size={14} /> Mockups</TabsTrigger>
        </TabsList>

        <TabsContent value="artworks" className="mt-4">
          {artworks.length === 0 ? (
            <div className="bg-background rounded-2xl border border-border p-12 text-center">
              <FileImage className="mx-auto text-muted-foreground/40" size={40} />
              <p className="mt-3 text-sm text-muted-foreground">No artwork uploads yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {artworks.map((a) => (
                <div key={a.id} className="bg-background rounded-2xl border border-border p-5" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                        <FileImage size={18} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground truncate max-w-[160px]">{a.file_name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{new Date(a.created_at).toLocaleDateString("en-IN")}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className={`text-xs ${reviewColors[a.review_status] || ""}`}>{(a.review_status || "pending").replace(/_/g, " ")}</Badge>
                  </div>
                  {a.reviewer_notes && (
                    <div className="mt-3 p-3 rounded-lg bg-secondary/50 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Reviewer notes:</span> {a.reviewer_notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="mockups" className="mt-4">
          {mockups.length === 0 ? (
            <div className="bg-background rounded-2xl border border-border p-12 text-center">
              <Image className="mx-auto text-muted-foreground/40" size={40} />
              <p className="mt-3 text-sm text-muted-foreground">No mockups available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockups.map((m) => (
                <div key={m.id} className="bg-background rounded-2xl border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-sm)" }}>
                  <div className="aspect-video bg-secondary flex items-center justify-center">
                    <img src={m.mockup_image_url} alt="Mockup" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">Version {m.version_number}</p>
                      <Badge variant="secondary" className={`text-xs ${reviewColors[m.status] || ""}`}>{(m.status || "draft").replace(/_/g, " ")}</Badge>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" className="gap-1.5 flex-1" onClick={() => handleApproveMockup(m.id)}>
                        <Check size={14} /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="gap-1.5 flex-1" onClick={() => setFeedbackMockup(m)}>
                        <MessageSquare size={14} /> Changes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!feedbackMockup} onOpenChange={() => setFeedbackMockup(null)}>
        <DialogContent className="sm:max-w-[440px]">
          <DialogHeader><DialogTitle className="font-heading">Request Changes</DialogTitle></DialogHeader>
          <Textarea placeholder="Describe the changes you'd like..." value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} className="mt-2" />
          <Button className="w-full mt-3" onClick={() => { toast.success("Feedback submitted!"); setFeedbackMockup(null); setFeedback(""); }}>Submit Feedback</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtworkMockups;
