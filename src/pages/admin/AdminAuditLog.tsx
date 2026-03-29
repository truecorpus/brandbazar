import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ScrollText } from "lucide-react";

const AdminAuditLog = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("all");

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let q = supabase.from("audit_log").select("*").order("created_at", { ascending: false }).limit(100);
      if (actionFilter !== "all") q = q.eq("action_type", actionFilter);
      const { data } = await q;
      setLogs(data || []);
      setLoading(false);
    };
    fetch();
  }, [actionFilter]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Audit Log</h1>

      <Card className="p-3 border-[#DADCE0]">
        <div className="flex gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9AA0A6]" />
            <Input placeholder="Search..." className="pl-9 h-9 text-[13px] border-[#DADCE0]" />
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-[140px] h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card className="border-[#DADCE0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#DADCE0]">
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Action</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Table</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Record</th>
                <th className="px-4 py-3 text-left font-medium text-[#5F6368]">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-4 py-12 text-center text-[#9AA0A6]">Loading...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-12 text-center text-[#9AA0A6]">No audit entries</td></tr>
              ) : logs.map(l => (
                <tr key={l.id} className="border-b border-[#F1F3F4] hover:bg-[#F8F9FA]/50">
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${l.action_type === "create" ? "bg-[#E6F4EA] text-[#137333]" : l.action_type === "delete" ? "bg-[#FCE8E6] text-[#C5221F]" : "bg-[#E8F0FE] text-[#1A73E8]"}`}>
                      {l.action_type.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#3C4043] font-mono text-[12px]">{l.affected_table}</td>
                  <td className="px-4 py-3 text-[#9AA0A6] font-mono text-[11px]">{l.affected_record_id?.slice(0, 8) || "—"}</td>
                  <td className="px-4 py-3 text-[#5F6368]">{new Date(l.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminAuditLog;
