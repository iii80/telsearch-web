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
    <div className="bg-base-200 flex flex-col min-h-screen">
      {(!isMobile || (isMobile && location.pathname === "/")) && (
        <div className="flex">
          <Swap className="ml-auto pt-8 pr-8" />
        </div>
      )}
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="search" element={<SearchResults />} />
        </Routes>
      </div>
      <Footer className="mt-auto lg:pb-[2%] pb-[5%]" />
    </div>
  );
}

export default App;
