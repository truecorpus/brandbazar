import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail, Phone } from "lucide-react";

const AdminCustomers = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      setProfiles(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = profiles.filter(p =>
    !search || p.full_name?.toLowerCase().includes(search.toLowerCase()) || p.company_name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>All Customers</h1>

      <Card className="p-3 border-[#DADCE0]">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
          <Input placeholder="Search by name or company..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-[13px] border-[#DADCE0]" />
        </div>
      </Card>

      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Customer</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Company</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Phone</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-12 text-center text-[#9AA0A6]">No customers found</td></tr>
              ) : filtered.map(p => (
                <tr key={p.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E8F0FE] flex items-center justify-center text-[#1A73E8] text-xs font-semibold">
                        {p.full_name?.[0]?.toUpperCase() || "?"}
                      </div>
                      <span className="font-medium text-[#202124]">{p.full_name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#5F6368]">{p.company_name || "—"}</td>
                  <td className="px-4 py-3 text-[#5F6368]">{p.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${p.account_status === "active" ? "bg-[#E6F4EA] text-[#137333]" : "bg-[#F1F3F4] text-[#5F6368]"}`}>
                      {p.account_status.charAt(0).toUpperCase() + p.account_status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#5F6368]">{new Date(p.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminCustomers;
