import { createBrowserRouter } from "react-router";
import { Rootlayout } from "../layouts/Rootlayout";
import { DashboardLayout } from "../layouts/DashboardLayout";

const router = createBrowserRouter([
  { path: "/", Component: Rootlayout, children: [] },
  { path: "/Dashboard", Component: DashboardLayout, children: [] },
]);

export default router;
