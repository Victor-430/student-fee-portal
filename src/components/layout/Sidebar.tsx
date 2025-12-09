import { NavLink } from "react-router";

export const Sidebar = () => {
  const activeNav = ({ isActive }) => (isActive ? "bg-portal-green" : "");

  return (
    <div className="h-full w-1/3 bg-portal-darkBlue flex flex-col &:not(:nth-last-child(-n+1))-border-b-2">
      <h1 className="capitalize text-xl">School Fees Payment Portal</h1>
      <NavLink to="/dashboard" className={activeNav}>
        Dashboard
      </NavLink>
      <NavLink to="/dashboard/fees">Fees</NavLink>
      <NavLink to="/dashboard/transactions">Transactions</NavLink>
      <NavLink to="/dashboard/receipts">Receipts</NavLink>
    </div>
  );
};
