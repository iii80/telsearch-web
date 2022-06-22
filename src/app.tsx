import React from "react";
import Index from "./views";
import { Routes, Route } from "react-router-dom";
import SearchResults from "./views/searchResults";

function App() {
  return (
    <div className="bg-base-200 min-h-screen">
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="search" element={<SearchResults />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
