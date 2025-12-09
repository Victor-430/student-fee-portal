import { Outlet } from "react-router";
import { Sidebar } from "../components/layout/Sidebar";

export const DashboardLayout = () => {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
};
