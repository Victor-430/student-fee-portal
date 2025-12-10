import { Outlet } from "react-router";
import Navbar from "@/components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";
import { Notifications } from "@/components/dashboard/Notifications";
import { StudentProfile } from "@/components/dashboard/StudentProfile";
import { PaymentStatus } from "@/components/dashboard/PaymentStatus";

export const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-2"></div>
      <Sidebar />
      <Notifications />
      <PaymentStatus />
      <StudentProfile />
      <Outlet />
    </div>
  );
};
