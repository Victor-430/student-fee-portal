import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { Notifications } from "../components/dashboard/Notifications";
import { PaymentStatus } from "../components/dashboard/PaymentStatus";

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <ProfileCard />
      <Notifications />
      <PaymentStatus />
    </div>
  );
};
