import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProductViewer from "./pages/ProductVeiwer";
import SearchPage from "./pages/SearchPages"
import AdminPanel from "./pages/AdminPanel";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/product/:productId" element={<ProductViewer />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
