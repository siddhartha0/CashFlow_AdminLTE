// src/components/MainLayout.js
import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
