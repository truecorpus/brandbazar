import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Star, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminReviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => { fetchReviews(); }, []);

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*, products(name)").order("created_at", { ascending: false });
    setReviews(data || []);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("reviews").update({ status, approved_at: status === "approved" ? new Date().toISOString() : null }).eq("id", id);
    toast({ title: `Review ${status}` });
    fetchReviews();
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Customer Reviews</h1>

      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Product</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Rating</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Review</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-center font-medium text-[#5F6368]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : reviews.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[#9AA0A6]">No reviews</td></tr>
              ) : reviews.map(r => (
                <tr key={r.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50">
                  <td className="px-4 py-3 font-medium text-[#202124]">{r.products?.name || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`w-3.5 h-3.5 ${i < r.rating ? "fill-[#F9AB00] text-[#F9AB00]" : "text-[#DADCE0]"}`} />)}</div>
                  </td>
                  <td className="px-4 py-3 text-[#3C4043] max-w-[300px] truncate">{r.review_body || r.review_title || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${r.status === "approved" ? "bg-[#E6F4EA] text-[#137333]" : r.status === "rejected" ? "bg-[#FCE8E6] text-[#C5221F]" : "bg-[#FEF7E0] text-[#E37400]"}`}>
                      {r.status?.charAt(0).toUpperCase() + r.status?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {r.status === "pending" && (
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => updateStatus(r.id, "approved")}><CheckCircle2 className="w-4 h-4 text-[#34A853]" /></Button>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => updateStatus(r.id, "rejected")}><XCircle className="w-4 h-4 text-[#EA4335]" /></Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminReviews;
