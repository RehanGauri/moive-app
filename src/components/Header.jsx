import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q") || "";
  const [search, setSearch] = useState(query);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setSearch(query);
  }, [query]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim()) {
        navigate(`/search?q=${search}`);
      } else if (location.pathname === "/search") {
        navigate("/search");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="bg-zinc-800 fixed top-0 left-0 right-0 z-10">

      {/* Main Header Row */}
      <div className="h-16 flex mx-auto justify-between w-full px-4 md:w-8/12 items-center">

        {/* Logo */}
        <div
          className="flex items-center text-xl gap-2 font-semibold cursor-pointer shrink-0"
          onClick={() => navigate("/")}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="hidden md:block text-white">StreamFlix</span>
        </div>


        <div className="flex-1 mx-3 flex justify-center">
          <div className="flex items-center bg-white/10 rounded-full px-3 py-2 border border-gray-600 w-full max-w-96">
            <CiSearch className="text-gray-400 text-xl" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search movies..."
              className="w-full bg-transparent outline-none ml-2 text-white"
            />
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <NavLink to={"/"} className="text-white hover:text-red-400 transition">Home</NavLink>
          <NavLink to={"/movie"} className="text-white hover:text-red-400 transition">Movies</NavLink>
          <NavLink to={"/tv-series"} className="text-white hover:text-red-400 transition">TV Series</NavLink>
          <NavLink to={"/profile"}>
            <FaUser className="text-white" />
          </NavLink>
        </div>

        <button
          className="md:hidden text-white text-xl ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>


      {menuOpen && (
        <div className="md:hidden bg-zinc-900 flex flex-col px-6 py-4 gap-4 border-t border-zinc-700">
          <NavLink to={"/"} className="text-white hover:text-red-400 transition">Home</NavLink>
          <NavLink to={"/movie"} className="text-white hover:text-red-400 transition">Movies</NavLink>
          <NavLink to={"/tv-series"} className="text-white hover:text-red-400 transition">TV Series</NavLink>
          <NavLink to={"/profile"} className="flex items-center gap-2 text-white hover:text-red-400 transition">
            <FaUser /> Profile
          </NavLink>
        </div>
      )}

    </div>
  );
};

export default Header;