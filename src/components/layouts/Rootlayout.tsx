import { Outlet } from "react-router";
import Navbar from "../layout/Navbar";
import { Footer } from "../layout/Footer";

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
