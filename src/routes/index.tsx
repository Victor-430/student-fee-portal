import { createBrowserRouter } from "react-router";
import { Rootlayout } from "../layouts/Rootlayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

const router = createBrowserRouter([
  { path: "/", Component: Rootlayout, children: [] },
  { path: "/dashboard", Component: DashboardLayout, children: [
    {path: "/dashboard/fees"},
    {path:"/dashboard/receipt"}
    {path:"/dashboard/transactions"}
  ] },
]);

export default router;
