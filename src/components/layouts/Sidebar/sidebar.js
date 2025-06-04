// Sidebar.js
import React from "react";
import { Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./sidebar.scss";

const Sidebar = ({ items, CompanyLogo, copyrightText }) => {
  return (
    <div className="sidebar d-flex flex-column justify-content-between">
      <div>
        {/* Logo */}
        <div className="text-center">
          <Image src={CompanyLogo} alt="Logo" className="logo-img" fluid />
        </div>

        {/* Menu Items */}
        <Nav className="flex-column">
          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.href.startsWith("/") ? item.href : `/${item.href}`}
              className={({ isActive }) =>
                `${item.className} nav-link${isActive ? " active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </Nav>
      </div>

      {/* Copyright */}
      <div className="text-center mb-3 sidebar-copyright">
        <small>{copyrightText}</small>
      </div>
    </div>
  );
};

export default Sidebar;
