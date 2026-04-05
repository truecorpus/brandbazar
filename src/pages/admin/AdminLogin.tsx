import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Mail, AlertCircle, Shield } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (!authData.user) {
        setError("Authentication failed.");
        setLoading(false);
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", authData.user.id)
        .limit(1)
        .single();

      if (roleError || !roleData) {
        await supabase.auth.signOut();
        setError("Access denied. No role assigned.");
        setLoading(false);
        return;
      }

      const adminRoles = ["super_admin", "admin", "staff"];
      if (!adminRoles.includes(roleData.role)) {
        await supabase.auth.signOut();
        setError("Access denied. You do not have admin privileges.");
        setLoading(false);
        return;
      }

      navigate("/admin", { replace: true });
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#202124] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1A73E8]/10 border border-[#1A73E8]/20 mb-4">
            <Shield className="w-8 h-8 text-[#1A73E8]" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            Brand<span className="text-[#1A73E8]">Bazaar</span> Admin
          </h1>
          <p className="text-[#9AA0A6] text-sm mt-1">Sign in to the admin console</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#292A2D] rounded-2xl border border-[#3C4043] p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#BDC1C6] text-sm">Email</Label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA0A6]" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@brandbazaar.in"
                  required
                  className="pl-10 bg-[#202124] border-[#3C4043] text-white placeholder:text-[#5F6368] focus:border-[#1A73E8] focus:ring-[#1A73E8]/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#BDC1C6] text-sm">Password</Label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9AA0A6]" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 bg-[#202124] border-[#3C4043] text-white placeholder:text-[#5F6368] focus:border-[#1A73E8] focus:ring-[#1A73E8]/20"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A73E8] hover:bg-[#1557B0] text-white h-11 rounded-xl font-medium"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign in to Admin"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-[#5F6368] text-xs mt-6">
          This is a restricted area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
