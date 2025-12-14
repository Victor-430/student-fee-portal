import { Menu, X, LayoutDashboard, Wallet, Receipt, History } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMobile = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  const activeNav = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded-md transition-all duration-200 ${
      isActive
        ? "bg-portal-green text-portal-darkGrey font-semibold"
        : "hover:bg-portal-green/20 hover:translate-x-1"
    }`;

  const menuItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/fees", icon: Wallet, label: "Fees" },
    { to: "/transactions", icon: History, label: "Transactions" },
    { to: "/receipts", icon: Receipt, label: "Receipts" },
  ];

const d= new Date();
const date = (d.getFullYear());

  return (
    <div className="bg-portal-darkGray" >
      {!isOpen && (
        <button
          onClick={toggleMenu}
          className="lg:hidden fixed top-24 left-4 z-50 bg-portal-darkGray text-white p-3 rounded-md shadow-lg hover:bg-portal-darkGrey/90 transition-colors"
          aria-label="Toggle sidebar"
          aria-expanded={isOpen}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 transition-opacity"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed lg:static
          top-0 left-0 h-full
          bg-portal-darkGray text-white
          w-64 lg:w-72
          z-40
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
          shadow-xl lg:shadow-none
        `}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h1 className="text-xl lg:text-2xl font-bold capitalize">
              Payment Portal
            </h1>

            <button
              onClick={toggleMenu}
              className="lg:hidden text-white hover:text-portal-green transition-colors"
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={activeNav}
              onClick={closeMobile}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-white/60 text-center">
            © {date} Payment Portal
          </p>
        </div>
      </aside>
    </div>
  );
};