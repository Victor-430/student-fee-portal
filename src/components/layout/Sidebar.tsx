import { Menu } from "lucide-react";
import { useRef, useState } from "react";
import { NavLink } from "react-router";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  const activeNav = ({ isActive }) =>
    isActive ? "bg-portal-green p-2 lg:p-4" : "";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="p-4 lg:p-6 gap-4 bg-portal-darkGray text-white flex flex-col &:not(:nth-last-child(-n+1))-border-b-2">
      <div className="w-full bg-grey-200 " ref={menuRef}></div>
      <div className="flex">
        <h1 className="capitalize text-sm font-bold lg:text-xl">
          Payment Portal
        </h1>
        <Menu onClick={toggleMenu} className="justify-items-end items-center" />
      </div>
      <NavLink to="/dashboard" className={activeNav}>
        Dashboard
      </NavLink>
      <NavLink to="/fees">Fees</NavLink>
      <NavLink to="/transactions">Transactions</NavLink>
      <NavLink to="/receipts">Receipts</NavLink>
    </div>
  );
};
