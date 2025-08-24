import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const HargaInput = ({ value, onChange }) => {
  const [displayValue, setDisplayValue] = useState("");

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  useEffect(() => {
    if (value) {
      setDisplayValue(formatRupiah(value));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const handleInputChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    const intValue = parseInt(raw || "0", 10);

    setDisplayValue(intValue === 0 ? "" : formatRupiah(intValue));

    if (onChange) {
      onChange(intValue);
    }
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label>Harga</Form.Label>
      <Form.Control
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        placeholder="Rp"
      />
    </Form.Group>
  );
};

export default HargaInput;
