import React, { useState } from "react";
import { Form } from "react-bootstrap";

const HargaInput = ({ onChange }) => {
  const [displayValue, setDisplayValue] = useState("");
  const [rawValue, setRawValue] = useState("");

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  const handleInputChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, ""); // keep only numbers
    const intValue = parseInt(raw || "0", 10);

    setRawValue(intValue);
    setDisplayValue(intValue === 0 ? "" : formatRupiah(intValue));

    if (onChange) {
      onChange(intValue); // send the raw integer to parent
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

// import React, { useState } from "react";
// import { Form } from "react-bootstrap";

// const HargaInput = ({ onChange }) => {
//   const [displayValue, setDisplayValue] = useState("");

//   const formatRupiah = (number) => {
//     return new Intl.NumberFormat("id-ID", {
//       style: "currency",
//       currency: "IDR",
//       minimumFractionDigits: 0,
//     }).format(number);
//   };

//   const handleInputChange = (e) => {
//     const raw = e.target.value.replace(/[^0-9]/g, ""); // only digits
//     const intValue = parseInt(raw || "0", 10);

//     setDisplayValue(intValue === 0 ? "" : formatRupiah(intValue));

//     if (onChange) {
//       onChange(intValue); // give the clean integer to the parent
//     }
//   };

//   return (
//     <Form.Group className="mb-3">
//       <Form.Label>Harga</Form.Label>
//       <Form.Control
//         type="text"
//         value={displayValue}
//         onChange={handleInputChange}
//         placeholder="Rp"
//       />
//     </Form.Group>
//   );
// };

// export default HargaInput;
