import React from "react";
import { CiHeart, CiSearch } from "react-icons/ci";
import { FaHeart, FaUser } from "react-icons/fa";
import { SiThemoviedatabase } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()
  const handleSearch=(e)=>{
    if(e.key === "Enter" && e.target.value.trim()){
      navigate(`search?q=${e.target.value}`)
    }
  }
  
  
  return (
    <div className="bg-zinc-800 fixed h-16 top-0 left-0 right-0 z-10">
      <div
        className="h-full flex mx-auto justify-between w-full px-4
    md:w-8/12  items-center md:px-4"
      >
        <div className="flex items-center text-xl gap-2 font-semibold">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="hidden md:block text-white">StreamFlix</span>
        </div>
        <div className="flex-1 mx-3 items-center flex justify-center">
          <div className="flex items-center bg-white/10  rounded-full px-3 py-2 border border-gray-600 w-full max-w-96  md:gap-2  ml-2 focus-within:ring-2 focus-within:ring-red-500">
            <CiSearch className="text-gray-400 text-xl" />
            <input
            onKeyDown={handleSearch}
              type="text"
              placeholder="Search movies..."
              className="w-full bg-transparent outline-none  ml-1 text-white "
            />
          </div>
        </div>
        <div className="flex items-center gap-7 montserrat">
          <NavLink to={"/"} className={({isActive})=>`
           transition duration-200 ${isActive? "text-red-500 underline"  : "text-white hover:text-red-400"}`}>
            Home
          </NavLink>
          <NavLink to={"/movie"} className={({isActive})=>`
            transition duration-200 ${isActive? "text-red-500 underline" : "text-white hover:text-red-400"}`}>
            Movies
          </NavLink>
          <NavLink to={"/tv-series"} className={({isActive})=>`
            transition duration-200 ${isActive? "text-red-500 underline" : "text-white hover:text-red-400"}`}>
            TV Series
          </NavLink>


          <NavLink to={"/profile"}>
            {({isActive})=>
              <FaUser className={`text-xl cursor-pointer ${isActive? "text-red-500" : "text-white hover:text-red-500"}`}
            />
            }
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
