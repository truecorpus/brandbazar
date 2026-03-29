import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Building2 } from "lucide-react";

const tierColors: Record<string, { bg: string; text: string }> = {
  standard: { bg: "#F1F3F4", text: "#5F6368" },
  silver: { bg: "#E8EAED", text: "#3C4043" },
  gold: { bg: "#FEF7E0", text: "#E37400" },
  platinum: { bg: "#E8F0FE", text: "#1A73E8" },
};

const AdminCorporateAccounts = () => {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("corporate_accounts").select("*").order("created_at", { ascending: false });
      setAccounts(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filtered = accounts.filter(a => !search || a.company_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Corporate Accounts</h1>
        <Button className="bg-[#1A73E8] hover:bg-[#1557B0] text-white gap-2 text-[13px]"><Plus className="w-4 h-4" /> New Account</Button>
      </div>

      <Card className="p-3 border-[#DADCE0]">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
          <Input placeholder="Search companies..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-9 text-[13px] border-[#DADCE0]" />
        </div>
      </Card>

      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Company</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">GST</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Tier</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">Credit Limit</th>
                <th className="px-4 py-3 text-right font-medium text-[#5F6368]">Balance</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-[#9AA0A6]">No corporate accounts</td></tr>
              ) : filtered.map(a => {
                const tier = tierColors[a.pricing_tier] || tierColors.standard;
                return (
                  <tr key={a.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#9AA0A6]" />
                        <span className="font-medium text-[#202124]">{a.company_name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#5F6368] font-mono text-[12px]">{a.gst_number || "—"}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-[11px] font-medium capitalize" style={{ background: tier.bg, color: tier.text }}>{a.pricing_tier}</span>
                    </td>
                    <td className="px-4 py-3 text-right text-[#202124]">₹{Number(a.credit_limit).toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-[#202124]">₹{Number(a.current_balance).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${a.is_active ? "bg-[#E6F4EA] text-[#137333]" : "bg-[#FCE8E6] text-[#C5221F]"}`}>
                        {a.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminCorporateAccounts;
