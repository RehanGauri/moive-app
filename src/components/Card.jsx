import React from "react";
import { CiStar } from "react-icons/ci";
import { FaRegPlayCircle, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = ({ item }) => {
  const {
    id,
    media_type,
    original_title,
    name,
    genres,
    poster_path,
    backdrop_path,
    vote_average,
    genre_ids,
    release_date,
    first_air_date,
  } = item;
  const title = original_title || name;
  const date = release_date || first_air_date || "";

  const genreMap = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  const navigate = useNavigate();


  const displayGenres = genre_ids 
  ? genre_ids.slice(0,2).map(id => genreMap[id]).filter(Boolean).join(", ")
  : genres?.slice(0,2).map(g => g.name).join(", ") || ""

  const handleClick = () => {
  const type = media_type || (first_air_date ? "tv" : "movie");
  navigate(`/${type}/${id}`);
};

  return (
    <div>
      <div
        onClick={handleClick}
        className="shrink-0 w-42.5 hover:scale-100 transition duration-300 cursor-pointer relative mb-4"
      >
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w342/${poster_path}`
              : "https://feb.kuleuven.be/drc/LEER/visiting-scholars-1/image-not-available.jpg/@@images/image.jpeg"
          }
          alt={title}
          className="h-62 w-full object-cover rounded-lg"
        />

        <div className="flex absolute top-2 left-2 bg-black/60 py-1 px-2 rounded-full items-center gap-0.5">
          <FaStar className="text-sm text-yellow-300" />
          <span className="text-xs text-white">{vote_average?.toFixed(1)}</span>
        </div>

        <div className="text-center montserrat text-white mt-1 font-semibold">
          {title}
        </div>

        <div
          className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 
        transition duration-300 rounded-lg flex flex-col justify-end p-2 h-62"
        >
          <FaRegPlayCircle className="text-red-500/80 absolute top-28 left-20 text-4xl text-center " />
          <p className="text-white text-xs">
            {displayGenres}
          </p>
          <p className="text-gray-400 text-xs">{date.slice(0, 4)}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
