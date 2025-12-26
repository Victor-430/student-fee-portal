import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Bell, AlertTriangle, Clock } from "lucide-react";
import { useFee } from "@/hooks/useFee";
import { formatCurrency } from "@/utils/transactionHelpers.ts";

export const Notifications = () => {
  const { feeBalance, paymentStatus, totalFee } = useFee();

  const paymentDeadline = new Date("2026-01-31");
  const currentDate = new Date();

  const daysRemaining = Math.ceil(
    (paymentDeadline.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const notificationConfig = useMemo(() => {
    if (paymentStatus === "Completed" || feeBalance === totalFee) {
      return {
        status: "Completed",
        message: "All fees paid!",
        icon: <Bell className="text-green-400" />,
        urgencyColor: "text-green-400",
        urgencyLabel: "Paid",
        showBalance: false,
      };
    }

    // Critical: 3 days or less
    if (daysRemaining <= 3 && daysRemaining > 0) {
      return {
        status: "Critical",
        message: "Payment deadline is very close!",
        icon: <AlertTriangle className="text-red-400 animate-pulse" />,
        urgencyColor: "text-red-400",
        urgencyLabel: `${daysRemaining} ${
          daysRemaining === 1 ? "day" : "days"
        } left`,
        showBalance: true,
      };
    }

    // Warning: 10 days or less
    if (daysRemaining <= 10 && daysRemaining > 3) {
      return {
        status: "Warning",
        message: "Payment deadline approaching",
        icon: <Clock className="text-yellow-400" />,
        urgencyColor: "text-yellow-400",
        urgencyLabel: `${daysRemaining} days left`,
        showBalance: true,
      };
    }

    // Overdue
    if (daysRemaining <= 0) {
      return {
        status: "Overdue",
        message: "Payment is overdue!",
        icon: <AlertTriangle className="text-red-500 animate-pulse" />,
        urgencyColor: "text-red-500",
        urgencyLabel: `${Math.abs(daysRemaining)} ${
          Math.abs(daysRemaining) === 1 ? "day" : "days"
        } overdue`,
        showBalance: true,
      };
    }

    // Normal: More than 10 days (default for new users)
    return {
      status: "Upcoming",
      message: "Payment deadline ahead",
      icon: <Bell className="text-blue-400" />,
      urgencyColor: "text-blue-400",
      urgencyLabel: `${daysRemaining} days left`,
      showBalance: true,
    };
  }, [daysRemaining, paymentStatus, feeBalance, totalFee]);

  return (
    <Card className="rounded-lg py-12 text-white bg-portal-darkGray hover:scale-105 transition-transform">
      <CardHeader>
        <CardTitle className="text-center pb-6 flex justify-center items-center gap-4 text-2xl">
          Notifications {notificationConfig.icon}
        </CardTitle>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            <div className="flex flex-col gap-4">
              <p className="text-sm opacity-80">Status</p>
              <div className="flex items-center gap-2">
                <p
                  className={`font-bold text-2xl ${notificationConfig.urgencyColor}`}
                >
                  {notificationConfig.status}
                </p>
              </div>
            </div>
            <div className="border-t-2  md:border-r-2 border-portal-lightCyan"></div>
            <div className="flex flex-col gap-4">
              <p className="text-sm opacity-80">Deadline</p>
              <p
                className={`font-bold text-2xl ${notificationConfig.urgencyColor}`}
              >
                {notificationConfig.urgencyLabel}
              </p>
            </div>
          </div>

          {/* Show outstanding balance */}
          {notificationConfig.showBalance && feeBalance > 0 && (
            <div className=" mt-4 pt-4 border-t border-portal-lightCyan/30">
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

          {/* Success message */}
          {!notificationConfig.showBalance && totalFee > 0 && (
            <div className="mt-4 pt-4 border-t border-portal-lightCyan/30 text-center">
              <p className="text-sm text-green-400">
                ✓ {notificationConfig.message}
              </p>
              <p className="text-xs opacity-70 mt-2">
                Thank you for completing your payment on time!
              </p>
            </div>
          )}
        </CardContent>
      </CardHeader>
    </Card>
  );
};
