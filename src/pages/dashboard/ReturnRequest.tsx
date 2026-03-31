import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";

const REASONS = [
  "Product defect / damage",
  "Wrong item received",
  "Quality not as expected",
  "Print/branding error",
  "Color mismatch",
  "Size/quantity incorrect",
  "Other",
];

const ReturnRequest = () => {
  const { orderId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) { toast.error("Please select a reason"); return; }
    if (!user || !orderId) return;
    setSubmitting(true);

    const { error } = await supabase.from("return_requests").insert({
      order_id: orderId,
      customer_id: user.id,
      reason,
      description: description || null,
    });

    if (error) {
      toast.error("Failed to submit return request");
    } else {
      toast.success("Return request submitted successfully");
      navigate(`/dashboard/orders/${orderId}`);
    }
    setSubmitting(false);
  };

  return (
    <div className="max-w-[600px] space-y-6">
      <Link to={`/dashboard/orders/${orderId}`} className="inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:text-primary/80">
        <ArrowLeft size={16} /> Back to Order
      </Link>

      <div>
        <h1 className="text-[22px] font-heading font-semibold text-foreground">Request Return / Refund</h1>
        <p className="text-sm text-muted-foreground mt-1">Tell us what went wrong and we'll make it right.</p>
      </div>

      <Card className="p-6 border-border space-y-5">
        <div>
          <Label className="text-sm font-medium text-foreground">Reason for Return</Label>
          <RadioGroup value={reason} onValueChange={setReason} className="mt-3 space-y-2">
            {REASONS.map(r => (
              <label key={r} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                reason === r ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
              }`}>
                <RadioGroupItem value={r} />
                <span className="text-sm text-foreground">{r}</span>
              </label>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label className="text-sm font-medium text-foreground">Describe the Issue (Optional)</Label>
          <Textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Please provide details about the issue..."
            className="mt-2"
            rows={4}
          />
        </div>

        <Button onClick={handleSubmit} disabled={submitting} className="w-full" size="lg">
          {submitting ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Submitting...</> : "Submit Return Request"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Our team will review your request within 24-48 hours and contact you with next steps.
        </p>
      </Card>
    </div>
  );
};

export default ReturnRequest;
