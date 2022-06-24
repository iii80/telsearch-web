import React from "react";
import Index from "./views";
import { Routes, Route, useLocation } from "react-router-dom";
import SearchResults from "./views/searchResults";
import Footer from "./components/footer";
import Swap from "./components/swap";
import { isMobile } from "react-device-detect";

function App() {
  const location = useLocation();

  return (
    <div className="bg-base-200">
      {(!isMobile || (isMobile && location.pathname === "/")) && (
        <Swap className="right-8 top-8" />
      )}
      <div className="flex flex-col min-h-screen">
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="search" element={<SearchResults />} />
          </Routes>
        </div>
        <Footer className="mt-auto lg:pb-[2%] pb-[5%]" />
      </div>
    </div>
  );
}

export default App;
