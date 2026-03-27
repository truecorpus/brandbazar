import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-1">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-semibold text-base">B</span>
            </div>
            <span className="text-xl font-heading font-semibold tracking-tight ml-1.5">
              <span className="text-foreground">Brand</span>
              <span className="text-primary">Bazaar</span>
            </span>
          </Link>
        </div>

        <div className="bg-background rounded-2xl border border-border p-8" style={{ boxShadow: "var(--shadow-lg)" }}>
          {!sent ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-heading font-semibold text-foreground">Reset password</h1>
                  <p className="text-sm text-muted-foreground">We'll send you a reset link</p>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">Email address</Label>
                  <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11" required />
                </div>
                <Button type="submit" className="w-full h-11 text-sm font-medium" disabled={loading}>
                  {loading ? "Sending..." : "Send reset link"}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-green-600" size={28} />
              </div>
              <h2 className="text-lg font-heading font-semibold text-foreground">Check your email</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-[280px] mx-auto">
                We sent a password reset link to <strong className="text-foreground">{email}</strong>
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>Didn't receive it? Resend</Button>
            </div>
          )}
        </div>

        <p className="text-center mt-6">
          <Link to="/login" className="text-sm text-primary font-medium hover:text-primary/80 inline-flex items-center gap-1">
            <ArrowLeft size={14} /> Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
