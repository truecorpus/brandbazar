import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MailX, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) { setStatus("invalid"); return; }
    const validate = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${token}`,
          { headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY } }
        );
        const data = await res.json();
        if (!res.ok) { setStatus("invalid"); return; }
        if (data.valid === false && data.reason === "already_unsubscribed") { setStatus("already"); return; }
        setStatus("valid");
      } catch { setStatus("invalid"); }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("handle-email-unsubscribe", { body: { token } });
      setStatus(error ? "error" : "success");
    } catch { setStatus("error"); }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-[440px] text-center">
        <Link to="/" className="inline-flex items-center gap-1 mb-8">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-semibold text-base">B</span>
          </div>
          <span className="text-xl font-heading font-semibold tracking-tight ml-1.5">
            <span className="text-foreground">Brand</span><span className="text-primary">Bazaar</span>
          </span>
        </Link>

        <div className="bg-background rounded-2xl border border-border p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          {status === "loading" && (
            <><Loader2 className="mx-auto text-primary animate-spin" size={40} /><p className="mt-4 text-sm text-muted-foreground">Validating...</p></>
          )}
          {status === "valid" && (
            <>
              <MailX className="mx-auto text-muted-foreground" size={40} />
              <h1 className="text-xl font-heading font-semibold text-foreground mt-4">Unsubscribe from emails?</h1>
              <p className="text-sm text-muted-foreground mt-2">You'll stop receiving app emails from BrandBazaar. Important account-related emails will still be sent.</p>
              <Button className="w-full mt-6" onClick={handleUnsubscribe} disabled={submitting}>
                {submitting ? "Processing..." : "Confirm Unsubscribe"}
              </Button>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle2 className="mx-auto text-emerald-600" size={40} />
              <h1 className="text-xl font-heading font-semibold text-foreground mt-4">Unsubscribed</h1>
              <p className="text-sm text-muted-foreground mt-2">You've been successfully unsubscribed from BrandBazaar emails.</p>
            </>
          )}
          {status === "already" && (
            <>
              <CheckCircle2 className="mx-auto text-muted-foreground" size={40} />
              <h1 className="text-xl font-heading font-semibold text-foreground mt-4">Already unsubscribed</h1>
              <p className="text-sm text-muted-foreground mt-2">You're already unsubscribed from BrandBazaar emails.</p>
            </>
          )}
          {(status === "invalid" || status === "error") && (
            <>
              <AlertCircle className="mx-auto text-destructive" size={40} />
              <h1 className="text-xl font-heading font-semibold text-foreground mt-4">{status === "invalid" ? "Invalid link" : "Something went wrong"}</h1>
              <p className="text-sm text-muted-foreground mt-2">{status === "invalid" ? "This unsubscribe link is invalid or has expired." : "Please try again later."}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Unsubscribe;
