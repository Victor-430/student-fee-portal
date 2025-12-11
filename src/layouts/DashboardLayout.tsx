import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Notifications } from "@/components/dashboard/Notifications";
import { PaymentStatus } from "@/components/dashboard/PaymentStatus";
import { ProfileCard } from "@/components/dashboard/ProfileCard";

export const DashboardLayout = () => {
  return (
    <div className="overflow-x-hidden h-screen ">
      <Navbar />
      <div className="flex flex-1 flex-wrap ">
        <Sidebar />
        <div className="flex-1 flex-col flex px-4 gap-y-4 flex-wrap w-2/3 ">
          <ProfileCard />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <PaymentStatus />
            <Notifications />
          </div>
        </div>
      </div>
    </div>
  );
};
