import React, { useEffect, useState } from "react";
import Button from "./Button";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Banner = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 10000);
    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    const movie = data[index];
    if (!movie?.id) return;

    const fetchTrailer = async () => {
      const res = await api.get(`/movie/${movie.id}/videos`);
      const yt = res.data.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(yt || null);
    };
    fetchTrailer();
  }, [data, index]);

  if (!data || data.length === 0) return null;

  const movie = data[index];

  return (
    <div className="min-h-[calc(100vh-64px)] relative">
      <div
        className="min-h-[calc(100vh-64px)] relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/50 absolute inset-0"></div>

        {/* Poster — hidden on mobile, visible on large screens */}
        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-16 xl:right-32">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt=""
            className="h-92 object-cover rounded-xl shadow-2xl"
          />
        </div>

        {/* Text content */}
        <div className="text-white absolute top-1/3 left-4 right-4 sm:left-8 sm:right-8 lg:left-[16.67%] lg:right-[35%] montserrat">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-5 font-bold">
            {movie.title}
          </h2>
          <h2 className="font-sans text-sm sm:text-base">
            {movie.overview.length > 200
              ? movie.overview.slice(0, 197) + "..."
              : movie.overview}
          </h2>
        </div>

        {/* Buttons */}
        <div className="absolute top-[58%] sm:top-[62%] lg:top-[66%] left-4 sm:left-8 lg:left-80 flex gap-3 sm:gap-5 text-white">
          <Button
            onClick={() => setShowPlayer(true)}
            text={"Watch Trailer"}
            classname={"border border-white text-sm sm:text-base px-3 sm:px-4"}
          />
          <Button
            onClick={() => navigate(`/movie/${movie.id}`)}
            text={"Watch now"}
            classname={"bg-red-600 px-3 sm:px-5 hover:bg-red-700 text-sm sm:text-base"}
          />
        </div>
      </div>

      {/* 🎬 Trailer Modal */}
      {showPlayer && trailer?.key && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-50 px-4">
          <div className="relative w-full sm:w-[80%] lg:w-[60%] h-[40%] sm:h-[50%] lg:h-[60%]">
            <button
              className="absolute -top-10 right-0 text-white text-xl"
              onClick={() => setShowPlayer(false)}
            >
              <MdClose className="text-3xl" />
            </button>

            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              allowFullScreen
              className="rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;