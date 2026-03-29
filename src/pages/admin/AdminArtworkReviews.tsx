import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Eye } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminArtworkReviews = () => {
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState("");
  const { toast } = useToast();

  useEffect(() => { fetchArtworks(); }, []);

  const fetchArtworks = async () => {
    setLoading(true);
    const { data } = await supabase.from("artwork_uploads").select("*").order("created_at", { ascending: true });
    setArtworks(data || []);
    setLoading(false);
  };

  const approve = async (id: string) => {
    await supabase.from("artwork_uploads").update({ review_status: "approved", is_final_approved: true }).eq("id", id);
    toast({ title: "Artwork approved" });
    fetchArtworks();
  };

  const reject = async (id: string) => {
    await supabase.from("artwork_uploads").update({ review_status: "rejected", reviewer_notes: rejectNote }).eq("id", id);
    toast({ title: "Artwork rejected" });
    setRejectId(null);
    setRejectNote("");
    fetchArtworks();
  };

  const statusIcon = (s: string) => {
    if (s === "approved") return <CheckCircle2 className="w-4 h-4 text-[#34A853]" />;
    if (s === "rejected") return <XCircle className="w-4 h-4 text-[#EA4335]" />;
    return <AlertCircle className="w-4 h-4 text-[#F9AB00]" />;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Artwork Reviews</h1>

      {loading ? (
        <p className="text-[#9AA0A6] text-[13px]">Loading...</p>
      ) : artworks.length === 0 ? (
        <Card className="p-8 border-[#DADCE0] text-center text-[#9AA0A6] text-[13px]">No artwork submissions</Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artworks.map(a => (
            <Card key={a.id} className="border-[#DADCE0] overflow-hidden">
              <div className="aspect-video bg-[#F1F3F4] flex items-center justify-center">
                <Eye className="w-8 h-8 text-[#DADCE0]" />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-medium text-[#202124] truncate">{a.file_name}</p>
                  {statusIcon(a.review_status)}
                </div>
                <p className="text-[11px] text-[#9AA0A6]">{new Date(a.created_at).toLocaleDateString()} · {a.file_type || "File"}</p>

                {a.review_status === "pending" && (
                  <>
                    {rejectId === a.id ? (
                      <div className="space-y-2">
                        <Textarea placeholder="Rejection reason..." value={rejectNote} onChange={e => setRejectNote(e.target.value)} className="text-[12px] min-h-[60px] border-[#DADCE0]" />
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setRejectId(null)} className="text-[12px] flex-1 border-[#DADCE0]">Cancel</Button>
                          <Button size="sm" onClick={() => reject(a.id)} className="text-[12px] flex-1 bg-[#EA4335] hover:bg-[#C5221F] text-white">Reject</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => approve(a.id)} className="text-[12px] flex-1 bg-[#34A853] hover:bg-[#137333] text-white">Approve</Button>
                        <Button size="sm" variant="outline" onClick={() => setRejectId(a.id)} className="text-[12px] flex-1 border-[#EA4335] text-[#EA4335] hover:bg-[#FCE8E6]">Reject</Button>
                      </div>
                    )}
                  </>
                )}

                {a.reviewer_notes && (
                  <p className="text-[11px] text-[#EA4335] bg-[#FCE8E6] rounded p-2">{a.reviewer_notes}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminArtworkReviews;
