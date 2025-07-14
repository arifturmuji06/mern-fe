import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Icon from "../../../assets/icon/Index";
import "bootstrap/dist/css/bootstrap.min.css";

const AtomButton = ({
  label,
  type = "button",
  to,
  onClick,
  variant = "primary",
  className = "",
  icon,
  iconPosition = "start",
  ...rest
}) => {
  const content = (
    <>
      {icon && iconPosition === "start" && (
        <Icon name={icon} size={16} className="" />
      )}
      {label}
      {icon && iconPosition === "end" && (
        <Icon name={icon} size={16} className="ms-2" />
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`btn btn-${variant} ${className}`}
        style={{ width: "fit-content" }}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  return (
    <Button
      type={type}
      variant={variant}
      onClick={onClick}
      className={className}
      {...rest}
    >
      {content}
    </Button>
  );
};

export default AtomButton;
