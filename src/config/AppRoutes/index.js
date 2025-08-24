import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import {
  Login,
  Register,
  MainApp,
  Profile,
  Employee,
  Remunerasi,
  DetailRemunerasi,
  History,
  AddRemunerasi,
  AddEmployee,
  EditEmployee,
  EditRemunerasi,
} from "../../pages";

import GuestRoute from "../GuestRoutes";
import ProtectedRoute from "../ProtectedRoute";
import AdminRoute from "../AdminRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainApp />
              </ProtectedRoute>
            }
          >
            <Route
              path="employee"
              element={
                <AdminRoute>
                  <Employee />
                </AdminRoute>
              }
            />
            <Route
              path="employee-add"
              element={
                <AdminRoute>
                  <AddEmployee />
                </AdminRoute>
              }
            />
            <Route
              path="employee/:id"
              element={
                <AdminRoute>
                  <EditEmployee />
                </AdminRoute>
              }
            />
            <Route
              path="remunerasi-add"
              element={
                <AdminRoute>
                  <AddRemunerasi />
                </AdminRoute>
              }
            />
            <Route
              path="remunerasi/:id"
              element={
                <AdminRoute>
                  <EditRemunerasi />
                </AdminRoute>
              }
            />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route path="remunerasi" element={<Remunerasi />} />
            <Route
              path="remunerasi/detail/:id"
              element={<DetailRemunerasi />}
            />
            <Route path="remunerasi-history" element={<History />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
