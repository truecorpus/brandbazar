import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import MyOrders from "./pages/dashboard/MyOrders";
import OrderDetail from "./pages/dashboard/OrderDetail";
import MyQuotes from "./pages/dashboard/MyQuotes";
import ArtworkMockups from "./pages/dashboard/ArtworkMockups";
import Addresses from "./pages/dashboard/Addresses";
import ProfileSettings from "./pages/dashboard/ProfileSettings";
import Notifications from "./pages/dashboard/Notifications";
import CorporateDashboard from "./pages/dashboard/corporate/CorporateDashboard";
import BulkOrderBuilder from "./pages/dashboard/corporate/BulkOrderBuilder";
import BrandAssets from "./pages/dashboard/corporate/BrandAssets";
import TeamMembers from "./pages/dashboard/corporate/TeamMembers";
import InvoicesBilling from "./pages/dashboard/corporate/InvoicesBilling";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Dashboard routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route index element={<DashboardOverview />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="orders/:orderId" element={<OrderDetail />} />
              <Route path="quotes" element={<MyQuotes />} />
              <Route path="artwork" element={<ArtworkMockups />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="settings" element={<ProfileSettings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="corporate" element={<CorporateDashboard />} />
              <Route path="corporate/bulk-order" element={<BulkOrderBuilder />} />
              <Route path="corporate/brand-assets" element={<BrandAssets />} />
              <Route path="corporate/team" element={<TeamMembers />} />
              <Route path="corporate/invoices" element={<InvoicesBilling />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
