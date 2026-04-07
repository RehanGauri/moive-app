import React from "react";
import Header from "./components/Header";
import Movie from "./pages/Movie";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TvSeries from "./pages/TvSeries";
import Profile from "./pages/Profile";
import MovieDetail from "./pages/DetailPage";
import DetailPage from "./pages/DetailPage";
import SearchPage from "./pages/SearchPage";

const App = () => {
  return (
    <div className="bg-zinc-900 min-h-screen pt-16">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv-series" element={<TvSeries />} />
        <Route path="/:type/:id" element={<DetailPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
};

export default App;
