import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/auth/protectedRoute";
import Index from "../pages";
import AboutUs from "../pages/aboutUs";
import Home from "../pages/home";
import Login from "../pages/login";
import MakeAReport from "../pages/makeReport";
import NotFound from "../pages/notFound";
import Register from "../pages/register";
import Reports from "../pages/reports";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/make-a-report"
        element={
          <ProtectedRoute>
            <MakeAReport />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppRouter;
