import { useState, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Download, Upload, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export interface VariableField {
  layerId: string;
  fieldName: string;
  fieldType: "text" | "image";
  required: boolean;
}

export interface BulkRow {
  id: string;
  values: Record<string, string>;
  photoFile?: File;
  status?: "pending" | "printed" | "checked" | "packed";
}

interface BulkDataTableProps {
  fields: VariableField[];
  rows: BulkRow[];
  onRowsChange: (rows: BulkRow[]) => void;
  onSelectRow: (index: number) => void;
  selectedRowIndex: number | null;
}

export default function BulkDataTable({
  fields,
  rows,
  onRowsChange,
  onSelectRow,
  selectedRowIndex,
}: BulkDataTableProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addRow = useCallback(() => {
    const newRow: BulkRow = {
      id: `row-${Date.now()}-${rows.length}`,
      values: Object.fromEntries(fields.map((f) => [f.fieldName, ""])),
      status: "pending",
    };
    onRowsChange([...rows, newRow]);
  }, [fields, rows, onRowsChange]);

  const updateCell = useCallback(
    (rowIndex: number, fieldName: string, value: string) => {
      const updated = [...rows];
      updated[rowIndex] = {
        ...updated[rowIndex],
        values: { ...updated[rowIndex].values, [fieldName]: value },
      };
      onRowsChange(updated);
    },
    [rows, onRowsChange]
  );

  const deleteRow = useCallback(
    (index: number) => {
      onRowsChange(rows.filter((_, i) => i !== index));
    },
    [rows, onRowsChange]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const text = e.clipboardData.getData("text/plain");
      if (!text.includes("\t") && !text.includes("\n")) return;
      e.preventDefault();

      const lines = text.trim().split("\n");
      const newRows: BulkRow[] = lines.map((line, i) => {
        const cells = line.split("\t");
        const values: Record<string, string> = {};
        fields.forEach((f, fi) => {
          values[f.fieldName] = cells[fi]?.trim() || "";
        });
        return { id: `row-paste-${Date.now()}-${i}`, values, status: "pending" as const };
      });

      onRowsChange([...rows, ...newRows]);
      toast.success(`${newRows.length} rows pasted from clipboard`);
    },
    [fields, rows, onRowsChange]
  );

  const downloadTemplate = useCallback(() => {
    const header = fields.map((f) => f.fieldName).join(",");
    const sampleRow = fields.map((f) => (f.fieldType === "text" ? `Sample ${f.fieldName}` : "photo_filename.jpg")).join(",");
    const csv = `${header}\n${sampleRow}\n`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk_personalization_template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [fields]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        const lines = text.trim().split("\n");
        if (lines.length < 2) {
          toast.error("File must have a header row and at least one data row");
          return;
        }

        const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
        const newRows: BulkRow[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cells = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
          const values: Record<string, string> = {};
          fields.forEach((f) => {
            const idx = headers.findIndex((h) => h.toLowerCase() === f.fieldName.toLowerCase());
            values[f.fieldName] = idx >= 0 ? cells[idx] || "" : "";
          });
          newRows.push({ id: `row-csv-${Date.now()}-${i}`, values, status: "pending" });
        }

        onRowsChange([...rows, ...newRows]);
        toast.success(`${newRows.length} rows imported from CSV`);
      };
      reader.readAsText(file);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [fields, rows, onRowsChange]
  );

  const validationErrors = rows
    .map((row, i) => {
      const missing = fields
        .filter((f) => f.required && !row.values[f.fieldName]?.trim())
        .map((f) => f.fieldName);
      return missing.length > 0 ? { row: i + 1, missing } : null;
    })
    .filter(Boolean);

  return (
    <div className="flex flex-col gap-3">
      {/* Actions bar */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={downloadTemplate} className="gap-1.5 text-xs h-8">
          <Download className="w-3.5 h-3.5" /> Download Template
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="gap-1.5 text-xs h-8"
        >
          <Upload className="w-3.5 h-3.5" /> Upload CSV
        </Button>
        <input ref={fileInputRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleFileUpload} />
        <div className="flex-1" />
        <span className="text-[10px]" style={{ color: "#5F6368" }}>
          Tip: Paste from Excel (Ctrl+V) into the table
        </span>
      </div>

      {/* Table */}
      <div
        className="border rounded-lg overflow-auto max-h-[320px]"
        style={{ borderColor: "#DADCE0" }}
        onPaste={handlePaste}
      >
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10">
            <tr style={{ backgroundColor: "#F8F9FA" }}>
              <th className="px-2 py-2 text-left font-medium border-b" style={{ color: "#5F6368", borderColor: "#DADCE0", width: 40 }}>
                #
              </th>
              {fields.map((f) => (
                <th
                  key={f.fieldName}
                  className="px-2 py-2 text-left font-medium border-b"
                  style={{ color: "#5F6368", borderColor: "#DADCE0", minWidth: 120 }}
                >
                  {f.fieldName}
                  {f.required && <span className="text-red-500 ml-0.5">*</span>}
                </th>
              ))}
              <th className="px-2 py-2 border-b" style={{ borderColor: "#DADCE0", width: 36 }} />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={row.id}
                onClick={() => onSelectRow(ri)}
                className="cursor-pointer transition-colors"
                style={{
                  backgroundColor: selectedRowIndex === ri ? "#E8F0FE" : ri % 2 === 0 ? "white" : "#FAFAFA",
                }}
              >
                <td className="px-2 py-1.5 border-b font-medium" style={{ color: "#5F6368", borderColor: "#EEEEEE" }}>
                  {ri + 1}
                </td>
                {fields.map((f) => (
                  <td key={f.fieldName} className="px-1 py-1 border-b" style={{ borderColor: "#EEEEEE" }}>
                    <Input
                      value={row.values[f.fieldName] || ""}
                      onChange={(e) => updateCell(ri, f.fieldName, e.target.value)}
                      className="h-7 text-xs border-0 bg-transparent focus-visible:ring-1 focus-visible:ring-[#1A73E8] px-1"
                      placeholder={f.fieldType === "image" ? "filename.jpg" : `Enter ${f.fieldName}`}
                    />
                  </td>
                ))}
                <td className="px-1 py-1 border-b" style={{ borderColor: "#EEEEEE" }}>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); deleteRow(ri); }}>
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button variant="outline" size="sm" onClick={addRow} className="gap-1.5 text-xs h-8 self-start">
        <Plus className="w-3.5 h-3.5" /> Add Row
      </Button>

      {/* Validation errors */}
      {validationErrors.length > 0 && (
        <div className="rounded-lg p-3 text-xs space-y-1" style={{ backgroundColor: "#FFF3E0" }}>
          <div className="flex items-center gap-1.5 font-medium" style={{ color: "#E65100" }}>
            <AlertCircle className="w-3.5 h-3.5" /> {validationErrors.length} row(s) have missing required fields
          </div>
          {(validationErrors as any[]).slice(0, 5).map((err: any) => (
            <div key={err.row} style={{ color: "#BF360C" }}>
              Row {err.row}: missing {err.missing.join(", ")}
            </div>
          ))}
        </div>
      )}

      {rows.length > 0 && validationErrors.length === 0 && (
        <div className="flex items-center gap-1.5 text-xs" style={{ color: "#2E7D32" }}>
          <CheckCircle2 className="w-3.5 h-3.5" /> All {rows.length} rows validated
        </div>
      )}
    </div>
  );
}
