import { Card } from "@/components/ui/card";

const AdminPlaceholder = ({ title, description }: { title: string; description: string }) => (
  <div className="space-y-4">
    <h1 className="text-xl font-semibold text-[#202124]" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</h1>
    <Card className="p-8 border-[#DADCE0] text-center">
      <p className="text-[14px] font-medium text-[#202124]">{title}</p>
      <p className="text-[13px] text-[#9AA0A6] mt-1">{description}</p>
    </Card>
  </div>
);

export const AdminBulkOrders = () => <AdminPlaceholder title="Bulk Orders" description="View and manage large volume corporate orders." />;
export const AdminReturns = () => <AdminPlaceholder title="Returns & Refunds" description="Process return requests and issue refunds." />;
export const AdminCustomization = () => <AdminPlaceholder title="Customization Options" description="Manage product customization options like print methods, colors, and materials." />;
export const AdminInventory = () => <AdminPlaceholder title="Inventory" description="Track stock levels across all product variants." />;
export const AdminProductionTracker = () => <AdminPlaceholder title="Production Tracker" description="Monitor production progress across all active orders." />;
export const AdminEmailCampaigns = () => <AdminPlaceholder title="Email Campaigns" description="Create and send marketing email campaigns to customers." />;
export const AdminPayoutTracker = () => <AdminPlaceholder title="Payout Tracker" description="Track revenue payouts and financial settlements." />;
export const AdminShipping = () => <AdminPlaceholder title="Shipping Settings" description="Configure shipping partners, rates, and delivery zones." />;
export const AdminTax = () => <AdminPlaceholder title="Tax Settings" description="Manage GST rates by product category and HSN codes." />;
