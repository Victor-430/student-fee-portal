import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Bell, AlertTriangle, Clock } from "lucide-react";
import { useFee } from "@/hooks/useFee";
import { formatCurrency } from "@/utils/TransactionHelpers";

export const Notifications = () => {
  const { feeBalance, paymentStatus } = useFee();

  const paymentDeadline = new Date("2026-01-31"); 
  const currentDate = new Date();

  const daysRemaining = Math.ceil(
    (paymentDeadline.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const notificationConfig = useMemo(() => {    if (paymentStatus === "Completed" || feeBalance <= 0) {
      return {
        status: "Completed",
        message: "All fees paid!",
        icon: <Bell className="text-green-400" />,
        urgencyColor: "text-green-400",
        urgencyLabel: "Paid",
        showBalance: false,
      };
    }

    if (daysRemaining <= 3 && daysRemaining > 0) {
      return {
        status: "Critical",        icon: <AlertTriangle className="text-red-400 animate-pulse" />,
        urgencyColor: "text-red-400",
        urgencyLabel: `${daysRemaining} ${daysRemaining === 1 ? 'day' : 'days'} left`,
        showBalance: true,
      };
    }

    if (daysRemaining <= 10 && daysRemaining > 3) {
      return {
        status: "Warning",
        icon: <Clock className="text-yellow-400" />,
        urgencyColor: "text-yellow-400",
        urgencyLabel: `${daysRemaining} days left`,
        showBalance: true,
      };
    }

    if (daysRemaining <= 0) {
      return {
        status: "Overdue",
        message: "Payment is overdue!",
        icon: <AlertTriangle className="text-red-500 animate-pulse" />,
        urgencyColor: "text-red-500",
        urgencyLabel: `${Math.abs(daysRemaining)} ${Math.abs(daysRemaining) === 1 ? 'day' : 'days'} overdue`,
        showBalance: true,
      };
    }

    return {
      status: "Upcoming",
      message: "Payment deadline ahead",
      icon: <Bell className="text-blue-400" />,
      urgencyColor: "text-blue-400",
      urgencyLabel: `${daysRemaining} days left`,
      showBalance: true,
    };
  }, [daysRemaining, paymentStatus, feeBalance]);

  return (
    <Card className="lg:w-[90%] rounded-lg py-12 text-white bg-portal-darkGray hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle className="text-center pb-6 flex justify-center items-center gap-4 text-2xl">
          Notifications {notificationConfig.icon}
        </CardTitle>
        <CardContent>
          <div className="flex gap-4 justify-center mb-6">
            <div className="flex flex-col gap-4">
              <p className="text-sm opacity-80">Status</p>
              <div className="flex items-center gap-2">
                
                <p className={`font-bold text-2xl ${notificationConfig.urgencyColor}`}>
                  {notificationConfig.status}
                </p>
              </div>
            </div>
            <div className="border-r-2 border-portal-lightCyan"></div>
            <div className="flex flex-col gap-4">
              <p className="text-sm opacity-80">Deadline</p>
              <p className={`font-bold text-2xl ${notificationConfig.urgencyColor}`}>
                {notificationConfig.urgencyLabel}
              </p>
            </div>
          </div>

          {notificationConfig.showBalance && feeBalance > 0 && (
            <div className="mt-4 pt-4 border-t border-portal-lightCyan/30">
              <div className="text-center">
                <p className="text-sm opacity-80 mb-2">Outstanding Balance</p>
                <p className="font-bold text-xl text-red-400">
                  {formatCurrency(feeBalance)}
                </p>
              </div>
              <div className="mt-3 text-center">
                <p className="text-xs opacity-70 italic">
                  {notificationConfig.message}
                </p>
                <p className="text-xs opacity-70 mt-1">
                  Payment due: {paymentDeadline.toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
          {!notificationConfig.showBalance && (
            <div className="mt-4 pt-4 border-t border-portal-lightCyan/30 text-center">
              <p className="text-sm text-green-400">
                {notificationConfig.message}
              </p>
             
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};