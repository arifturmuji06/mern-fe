import React from "react";
import { Nav, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./sidebar.scss";

const Sidebar = ({ items, CompanyLogo, copyrightText }) => {
  const { user } = useAuth();

  // Filter berdasarkan role user
  const filteredItems = items.filter(
    (item) => item.role === "all" || item.role === user?.role
  );

  return (
    <div className="sidebar d-flex flex-column justify-content-between">
      <div>
        {/* Logo */}
        <div className="text-center">
          <Image src={CompanyLogo} alt="Logo" className="logo-img" fluid />
        </div>

        {/* Menu Items */}
        <Nav className="flex-column">
          {filteredItems.map((item, index) =>
            item.onClick ? (
              <Nav.Link
                key={index}
                onClick={item.onClick}
                className={`${item.className} nav-link`}
                style={{ cursor: "pointer" }}
              >
                {item.label}
              </Nav.Link>
            ) : (
              <NavLink
                key={index}
                to={item.href.startsWith("/") ? item.href : `/${item.href}`}
                className={({ isActive }) =>
                  `${item.className} nav-link${isActive ? " active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            )
          )}
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
