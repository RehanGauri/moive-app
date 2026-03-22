import React from "react";
import Header from "./components/Header";
import Movie from "./pages/Movie";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TvSeries from "./pages/TvSeries";
import WatchList from "./pages/WatchList";

const App = () => {
  return (
    <div className="bg-zinc-900 min-h-screen pt-16">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movie />} />
        <Route path="/tv-series" element={<TvSeries />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Routes>
    </div>
  );
};

export default App;
