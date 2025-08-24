import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "../Home";
import { CompanyLogo } from "../../assets";
import Sidebar from "../../components/layouts/Sidebar/sidebar";
import "./mainApp.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const MainApp = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const remunerasiPaths = [
    "/remunerasi",
    "/remunerasi-history",
    "/remunerasi-add",
    "/remunerasi/detail/",
  ];

  const isOnRemunerasiPage = remunerasiPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const isOnEmployeeList = location.pathname === "/employee";
  const isOnEmployeeAdd = location.pathname === "/employee-add";
  const isOnEmployeeEdit = location.pathname.startsWith("/employee/");

  const topSidebarItems = [
    { label: "Home", href: "/", role: "admin", className: "sidebar-link" },
    {
      label: "Profile",
      href: "/profile",
      role: "karyawan",
      className: "sidebar-link",
    },
    {
      label: "User List",
      href: "/employee",
      role: "admin",
      className: "sidebar-link",
    },
    {
      label: "Remunerasi",
      href: "/remunerasi",
      role: "all",
      className: "sidebar-link",
    },
  ];

  const conditionalItems = isOnRemunerasiPage
    ? [
        {
          label: "History",
          href: "/remunerasi-history",
          role: "all",
          className: "sidebar-link-sub",
        },
        {
          label: "Tambah Remunerasi",
          href: "/remunerasi-add",
          role: "admin",
          className: "sidebar-link-sub",
        },
      ]
    : [];

  const botSidebarItems = [
    {
      label: "Logout",
      onClick: logout,
      role: "all",
      className: "sidebar-link",
    },
  ];

  const finalSidebarItems = topSidebarItems.reduce((acc, item) => {
    acc.push(item);

    if (
      item.href === "/employee" &&
      user?.role === "admin" &&
      (isOnEmployeeList || isOnEmployeeAdd || isOnEmployeeEdit)
    ) {
      acc.push({
        label: "Register Karyawan",
        href: "/employee-add",
        role: "admin",
        className: "sidebar-link-sub",
      });
    }

    return acc;
  }, []);

  if (isOnRemunerasiPage) {
    finalSidebarItems.push(...conditionalItems);
  }
  finalSidebarItems.push(...botSidebarItems);

  return (
    <div className="dashboard-container">
      <Sidebar
        items={finalSidebarItems}
        CompanyLogo={CompanyLogo}
        copyrightText="© 2025 Tim Kukis Studio"
      />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default MainApp;
