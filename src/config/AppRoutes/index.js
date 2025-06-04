import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Login,
  Register,
  MainApp,
  Profile,
  Employee,
  Remunerasi,
  Book,
  Conference,
  Nutrition,
  History,
  AddRemunerasi,
} from "../../pages";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainApp />}>
          <Route path="/employee" element={<Employee />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/remunerasi" element={<Remunerasi />} />
          <Route path="/remunerasi-book" element={<Book />} />
          <Route path="/remunerasi-conference" element={<Conference />} />
          <Route path="/remunerasi-nutrition" element={<Nutrition />} />
          <Route path="/remunerasi-history" element={<History />} />
          <Route path="/remunerasi-add" element={<AddRemunerasi />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
