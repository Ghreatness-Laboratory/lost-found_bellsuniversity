import React from "react";
import { Route, Routes } from "react-router-dom";
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
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/make-a-report" element={<MakeAReport />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AppRouter;
