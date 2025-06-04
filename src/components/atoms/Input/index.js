import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

// const Input = ({ label, ...rest }) => {
//   return (
//     <div>
//       <Form>
//         <Form.Group className="mb-3" controlId="formBasicEmail">
//           <Form.Label>{label}</Form.Label>
//           <Form.Control type="email" {...rest} />
//         </Form.Group>
//       </Form>
//     </div>
//   );
// };

const Input = ({ label, type = "text", ...rest }) => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control type={type} {...rest} />
    </Form.Group>
  );
};

export default Input;
