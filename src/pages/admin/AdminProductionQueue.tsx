import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GripVertical, Clock, AlertTriangle, CheckCircle2 } from "lucide-react";

const columns = [
  { id: "artwork_pending", label: "Artwork Pending", color: "#9AA0A6" },
  { id: "artwork_approved", label: "Artwork Approved", color: "#1A73E8" },
  { id: "in_production", label: "In Production", color: "#F9AB00" },
  { id: "quality_check", label: "Quality Check", color: "#A142F4" },
  { id: "ready_to_dispatch", label: "Ready to Dispatch", color: "#34A853" },
  { id: "dispatched", label: "Dispatched", color: "#137333" },
];

const mockCards = [
  { id: "1", orderNumber: "BB-2026-00001", customer: "Acme Corp", product: "Custom Mugs × 200", dueDate: "2026-04-01", status: "artwork_pending", overdue: false },
  { id: "2", orderNumber: "BB-2026-00002", customer: "TechStart Inc", product: "T-Shirts × 500", dueDate: "2026-03-28", status: "artwork_pending", overdue: true },
  { id: "3", orderNumber: "BB-2026-00003", customer: "John Doe", product: "Notebooks × 50", dueDate: "2026-04-02", status: "in_production", overdue: false },
  { id: "4", orderNumber: "BB-2026-00004", customer: "EventPro Ltd", product: "Badges × 1000", dueDate: "2026-03-29", status: "quality_check", overdue: false },
];

const AdminProductionQueue = () => {
  const [cards, setCards] = useState(mockCards);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);

  const handleDrop = (columnId: string) => {
    if (!draggedCard) return;
    setCards(prev => prev.map(c => c.id === draggedCard ? { ...c, status: columnId } : c));
    setDraggedCard(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>Production Queue</h1>
        <Select defaultValue="all">
          <SelectTrigger className="w-[160px] h-9 text-[13px] border-[#DADCE0]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="mugs">Mugs</SelectItem>
            <SelectItem value="tshirts">T-Shirts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {columns.map(col => {
          const colCards = cards.filter(c => c.status === col.id);
          return (
            <div
              key={col.id}
              className="flex-shrink-0 w-[240px]"
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: col.color }} />
                <span className="text-[12px] font-semibold text-[#5F6368] uppercase tracking-wide">{col.label}</span>
                <span className="ml-auto text-[11px] bg-[#F1F3F4] text-[#5F6368] rounded-full px-1.5 py-0.5">{colCards.length}</span>
              </div>
              <div className="space-y-2 min-h-[200px] bg-[#F1F3F4]/50 rounded-xl p-2">
                {colCards.map(card => (
                  <Card
                    key={card.id}
                    draggable
                    onDragStart={() => setDraggedCard(card.id)}
                    className={`p-3 cursor-grab active:cursor-grabbing border hover:shadow-md transition-all ${card.overdue ? "border-red-300 bg-red-50/50" : "border-[#DADCE0]"}`}
                  >
                    <div className="flex items-start gap-2">
                      <GripVertical className="w-3.5 h-3.5 text-[#DADCE0] mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-[#1A73E8]">{card.orderNumber}</p>
                        <p className="text-[12px] text-[#3C4043] font-medium truncate">{card.customer}</p>
                        <p className="text-[11px] text-[#5F6368] truncate">{card.product}</p>
                        <div className="flex items-center gap-1 mt-2">
                          {card.overdue ? (
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                          ) : (
                            <Clock className="w-3 h-3 text-[#9AA0A6]" />
                          )}
                          <span className={`text-[10px] font-medium ${card.overdue ? "text-red-500" : "text-[#9AA0A6]"}`}>
                            Due {new Date(card.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProductionQueue;
