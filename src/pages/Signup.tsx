import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, User, Phone, Building2, BadgeCheck } from "lucide-react";

type AccountType = "individual" | "corporate" | null;

const Signup = () => {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState<AccountType>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "",
    companyName: "", gstNumber: "", designation: "",
  });

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error("Please accept terms and conditions"); return; }
    if (!accountType) { toast.error("Please select an account type"); return; }
    setLoading(true);

    const metadata: Record<string, string> = { full_name: form.name, phone: form.phone };
    if (accountType === "corporate") {
      metadata.company_name = form.companyName;
      metadata.designation = form.designation;
      if (form.gstNumber) metadata.gst_number = form.gstNumber;
    }

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: { data: metadata, emailRedirectTo: window.location.origin },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success("Check your email to verify your account!");
    navigate("/login");
  };

  const handleGoogleSignup = async () => {
    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (error) toast.error("Google sign-up failed");
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[480px]">
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
          <h1 className="text-[22px] font-heading font-semibold text-foreground text-center">Create your account</h1>
          <p className="text-sm text-muted-foreground text-center mt-1.5">Start ordering custom merchandise</p>

          <Button variant="outline" className="w-full mt-6 h-11 gap-2.5 text-sm font-medium" onClick={handleGoogleSignup}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-background px-3 text-xs text-muted-foreground">or sign up with email</span></div>
          </div>

          {/* Account type selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setAccountType("individual")}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                accountType === "individual"
                  ? "border-primary bg-primary/[0.04]"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <User size={20} className={accountType === "individual" ? "text-primary" : "text-muted-foreground"} />
              <p className="mt-2 text-sm font-medium text-foreground">For myself</p>
              <p className="text-xs text-muted-foreground mt-0.5">Personal orders</p>
            </button>
            <button
              type="button"
              onClick={() => setAccountType("corporate")}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                accountType === "corporate"
                  ? "border-primary bg-primary/[0.04]"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <Building2 size={20} className={accountType === "corporate" ? "text-primary" : "text-muted-foreground"} />
              <p className="mt-2 text-sm font-medium text-foreground">For my company</p>
              <p className="text-xs text-muted-foreground mt-0.5">Bulk & corporate</p>
            </button>
          </div>

          {accountType && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Full name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input placeholder="Your full name" value={form.name} onChange={(e) => update("name", e.target.value)} className="pl-10 h-11" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input type="email" placeholder="you@company.com" value={form.email} onChange={(e) => update("email", e.target.value)} className="pl-10 h-11" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => update("phone", e.target.value)} className="pl-10 h-11" required />
                </div>
              </div>

              {accountType === "corporate" && (
                <>
                  <div className="space-y-1.5">
                    <Label className="text-sm font-medium">Company name</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                      <Input placeholder="Acme Corp" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} className="pl-10 h-11" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">GST number <span className="text-muted-foreground">(optional)</span></Label>
                      <Input placeholder="22AAAAA0000A1Z5" value={form.gstNumber} onChange={(e) => update("gstNumber", e.target.value)} className="h-11" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-sm font-medium">Designation</Label>
                      <Input placeholder="HR Manager" value={form.designation} onChange={(e) => update("designation", e.target.value)} className="h-11" required />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                  <Input type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" value={form.password} onChange={(e) => update("password", e.target.value)} className="pl-10 pr-10 h-11" required minLength={8} />
                  <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Checkbox id="terms" checked={agreed} onCheckedChange={(c) => setAgreed(c === true)} className="mt-0.5" />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to the <span className="text-primary font-medium">Terms of Service</span> and <span className="text-primary font-medium">Privacy Policy</span>
                </label>
              </div>

              <Button type="submit" className="w-full h-11 text-sm font-medium" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
