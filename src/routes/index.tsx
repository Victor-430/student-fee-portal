import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { FeePage } from "@/pages/FeePage";
import { DownloadReceipt } from "@/components/receipts/DownloadReceipt";
import { PaymentSummary } from "@/components/fee/PaymentSummary";
import { PaymentForm } from "@/components/fee/PaymentForm";
import { NotFound } from "@/pages/NotFound";
import { FeeLayout } from "@/layouts/FeeLayout";
import { TransactionPage } from "@/pages/TransactionPage";
// import { ErrorBoundary } from "@/pages/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
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
  { path: "transactions", Component: TransactionPage },
  { path: "*", Component: NotFound },
]);

export default router;
