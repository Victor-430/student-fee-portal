import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Notifications } from "@/components/dashboard/Notifications";
import { PaymentStatus } from "@/components/dashboard/PaymentStatus";
import { ProfileCard } from "@/components/dashboard/ProfileCard";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <ProfileCard />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
              <PaymentStatus />
              <Notifications />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};