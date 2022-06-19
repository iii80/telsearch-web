import React from "react";
import Index from "./views";
import { Routes, Route } from "react-router-dom";
import Search from "./views/search";

function App() {
  return (
    <div className="h-screen bg-base-200">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
