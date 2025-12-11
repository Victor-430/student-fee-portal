import { createBrowserRouter } from "react-router";
import { Rootlayout } from "../layouts/Rootlayout";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { FeePage } from "@/pages/FeePage";
import { DownloadReceipt } from "@/components/receipts/DownloadReceipt";
import { PaymentSummary } from "@/components/fee/PaymentSummary";
import { PaymentForm } from "@/components/fee/PaymentForm";
import { TransactionHistory } from "@/components/transactions/TransactionHistory";
import { NotFound } from "@/pages/NotFound";
import { FeeLayout } from "@/layouts/FeeLayout";
// import { ErrorBoundary } from "@/pages/ErrorBoundary";

const router = createBrowserRouter([
  { path: "/", Component: Rootlayout },
  {
    path: "/dashboard",
    Component: DashboardLayout,
  },
  {
    path: "/fees",
    Component: FeeLayout,
    children: [
      { index: true, Component: FeePage },
      { path: "summary", Component: PaymentSummary },
      { path: "payment", Component: PaymentForm },
    ],
  },
  { path: "receipt", Component: DownloadReceipt },
  { path: "transactions", Component: TransactionHistory },
  { path: "*", Component: NotFound },
]);

export default router;
