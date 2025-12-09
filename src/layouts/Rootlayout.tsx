import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export const Rootlayout = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
