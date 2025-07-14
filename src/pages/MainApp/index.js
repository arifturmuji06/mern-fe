import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "../Profile";
import Employee from "../Employee";
import Remunerasi from "../Remunerasi";
import Book from "../Book";
import Conference from "../Conference";
import Nutrition from "../Nutrition";
import History from "../History";
import Home from "../Home";
import { CompanyLogo } from "../../assets";
// import { Gap } from "../../components";
// import { Container, Row, Col, Button, Table, Dropdown } from "react-bootstrap";
import Sidebar from "../../components/layouts/Sidebar/sidebar";
import "./mainApp.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import AddRemunerasi from "../AddRemunerasi";
import AddEmployee from "../AddEmployee";

const MainApp = () => {
  const location = useLocation();

  // Check if current page is 'remunerasi'
  // const isOnRemunerasiPage = location.pathname === "/remunerasi";
  const isOnRemunerasiPage = [
    "/remunerasi",
    "/remunerasi-book",
    "/remunerasi-conference",
    "/remunerasi-nutrition",
    "/remunerasi-history",
    "/remunerasi-add",
  ].some((path) => location.pathname.startsWith(path));

  // Always visible sidebar items
  const topSidebarItems = [
    { label: "Home", href: "/", className: "sidebar-link" },
    { label: "Profile", href: "/profile", className: "sidebar-link" },
    { label: "User List", href: "/employee", className: "sidebar-link" },
    { label: "Remunerasi", href: "/remunerasi", className: "sidebar-link" },
  ];

  const botSidebarItems = [
    // { label: "Settings", href: "#settings", className: "sidebar-link" },
    { label: "Logout", href: "/login", className: "sidebar-link" },
  ];

  // Only visible on /remunerasi page
  const conditionalItems = [
    { label: "Book", href: "/remunerasi-book", className: "sidebar-link-sub" },
    {
      label: "Conference",
      href: "/remunerasi-conference",
      className: "sidebar-link-sub",
    },
    {
      label: "Nutrition",
      href: "/remunerasi-nutrition",
      className: "sidebar-link-sub",
    },
    {
      label: "History",
      href: "/remunerasi-history",
      className: "sidebar-link-sub",
    },
    {
      label: "Tambah Remunerasi",
      href: "/remunerasi-add",
      className: "sidebar-link-sub",
    },
  ];

  const finalSidebarItems = isOnRemunerasiPage
    ? [...topSidebarItems, ...conditionalItems, ...botSidebarItems]
    : [...topSidebarItems, ...botSidebarItems];

  return (
    <div className="dashboard-container">
      <Sidebar
        items={finalSidebarItems}
        CompanyLogo={CompanyLogo} // Ganti dengan URL logo Anda
        copyrightText="© 2024 Your Website"
      />
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="employee" element={<Employee />} />
        <Route path="employee-add" element={<AddEmployee />} />
        <Route path="remunerasi" element={<Remunerasi />} />
        <Route path="remunerasi-book" element={<Book />} />
        <Route path="remunerasi-conference" element={<Conference />} />
        <Route path="remunerasi-nutrition" element={<Nutrition />} />
        <Route path="remunerasi-history" element={<History />} />
        <Route path="remunerasi-add" element={<AddRemunerasi />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default MainApp;
