import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useWatchlist } from "../context/WatchlistContext";
import Card from "../components/Card";

const Profile = () => {
  const navigate = useNavigate();
  const browseBtnHandler = () => {
    navigate("/movie");
  };

  const { watchlist } = useWatchlist();

  return (
    <div>
      <div className="h-20 pt-5 w-11/12 sm:w-9/12 lg:w-7/12 mx-auto px-2 sm:px-0">
        <div className="flex items-center text-2xl gap-2 montserrat">
          <FaHeart className="text-red-500" />
          <h2 className="text-white">My Watchlist</h2>
        </div>
        <div className="ml-2">
          <h2 className="text-gray-400">{watchlist.length} movies saved</h2>
        </div>
      </div>

      {watchlist.length === 0 ? (
        <div className="h-100 flex items-center justify-center flex-col px-4">
          <div className="flex flex-col items-center text-center">
            <div className="p-3 bg-gray-500/10 rounded-full">
              <CiHeart className="text-white text-5xl" />
            </div>
            <h2 className="text-white montserrat text-xl mt-2">
              Your watchlist is empty
            </h2>
            <h2 className="text-gray-400 text-sm mt-1">
              Add movies to your watchlist to watch them later
            </h2>
            <Button
              onClick={browseBtnHandler}
              text="Browse Movies"
              classname="bg-red-500 text-sm py-3 px-5 mt-5 text-white"
            />
          </div>
        </div>
      ) : (
        <div className="lg:w-9/12 xl:w-7/12 mx-auto mt-10 px-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {watchlist.map((item) => (
              <Card item={item} key={item.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;