import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage.js";
import Login from "./components/login/Login.js";
import MobilePage from "./pages/MobilePage.js";
import NotFound from "./pages/NotFound.js";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 575) {
      setIsMobile(true);
    }
  }, []);

  return (
    <>
      {isMobile ? (
        <MobilePage />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="signin" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
