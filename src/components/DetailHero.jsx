import React, { useState } from "react";
import { FaHeart, FaPlay, FaStar } from "react-icons/fa";
import { formatRuntime } from "../utils/FormatTime";
import { CiCalendar, CiClock2, CiHeart } from "react-icons/ci";
import ContentRow from "./ContentRow";
import { MdClose } from "react-icons/md";
import { useWatchlist } from "../context/WatchlistContext";
import Loading from "./Loading";

const DetailHero = ({ detail, trailer }) => {
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const [showPlayer, setShowPlayer] = useState(false);
  const liked = detail ? isInWatchlist(detail.id) : false;

  if (!detail) return <Loading />;

  const formatRuntimeLabel = (detail) => {
    if (detail?.runtime) {
      return formatRuntime(detail.runtime);
    } else if (detail?.episode_run_time?.[0]) {
      return formatRuntime(detail.episode_run_time[0]) + " per episode";
    } else {
      return "N/A";
    }
  };

  return (
    <>
      <div className="h-full flex flex-col items-center">
        {/* 🔥 Main UI */}
        <div className="flex justify-center items-center min-h-fit lg:h-160 text-white px-4 py-8 lg:py-0">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 w-full max-w-5xl">

            {/* Poster */}
            <div className="flex justify-center lg:justify-start shrink-0">
              <img
                src={
                  detail?.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${detail.poster_path}`
                    : "https://dummyimage.com/300x450/000/fff"
                }
                className="h-72 sm:h-88 lg:h-100 w-auto lg:w-71 object-cover rounded-3xl"
              />
            </div>

            {/* Info */}
            <div className="w-full lg:w-140">
              <h2 className="text-2xl sm:text-3xl mb-4 lg:mb-5 text-center lg:text-left">
                {detail.name || detail.title}
              </h2>

              {/* Rating + Year + Runtime */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4 lg:mb-5">
                <div className="flex bg-black/20 py-1 px-2 rounded-full items-center gap-1">
                  <FaStar className="text-yellow-300 text-sm" />
                  <span className="text-xs">
                    {detail?.vote_average?.toFixed(1)} / 10
                  </span>
                </div>

                <span className="flex items-center gap-1 text-sm">
                  <CiCalendar />
                  {(detail?.release_date || detail?.first_air_date)?.slice(0, 4)}
                </span>

                <span className="flex items-center gap-1 text-sm">
                  <CiClock2 />
                  {formatRuntimeLabel(detail)}
                </span>
              </div>

              {/* Buttons */}
              <div className="mb-4 lg:mb-5 flex gap-3 justify-center lg:justify-start flex-wrap">
                <button
                  onClick={() => setShowPlayer(true)}
                  className="bg-red-600 flex items-center gap-2 px-5 py-2 rounded-full hover:scale-105 transition cursor-pointer text-sm sm:text-base"
                >
                  <FaPlay className="text-xs" />
                  Play Now
                </button>

                <button
                  onClick={() => toggleWatchlist(detail)}
                  className="border flex items-center gap-2 px-4 py-2 rounded-full hover:scale-105 transition cursor-pointer text-sm sm:text-base"
                >
                  {liked ? <FaHeart className="text-red-500" /> : <CiHeart />}
                  {liked ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>
              </div>

              {/* Genres */}
              <div className="flex gap-2 flex-wrap mb-4 lg:mb-5 justify-center lg:justify-start">
                {detail?.genres?.map((genre) => (
                  <div
                    key={genre.id}
                    className="border rounded-full px-3 py-1 text-xs sm:text-sm"
                  >
                    {genre.name}
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-5 text-sm sm:text-base text-center lg:text-left text-gray-200 leading-relaxed">
                {detail.overview}
              </div>

              {/* Cast */}
              <div>
                <h2 className="text-lg mb-2 text-center lg:text-left">Top Cast</h2>
                <div className="flex gap-3 sm:gap-4 justify-center lg:justify-start overflow-x-auto [&::-webkit-scrollbar]:hidden pb-1">
                  {detail?.credits?.cast?.slice(0, 5).map((actor) => (
                    <div key={actor.id} className="w-14 sm:w-16 text-center shrink-0">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                            : "https://dummyimage.com/100x100/000/fff"
                        }
                        className="h-20 sm:h-24 w-full object-cover rounded"
                        alt=""
                      />
                      <h2 className="text-xs sm:text-sm mt-1">{actor.name}</h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🎬 Trailer Modal */}
        {showPlayer && trailer && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-50 px-4">
            <div className="relative w-full sm:w-[85%] lg:w-[80%] h-[40%] sm:h-[50%] lg:h-[60%]">
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

        {/* Trailer embed */}
        <div>
          {trailer && (
            <div className="mt-10 px-4 sm:px-10 pb-10 w-full">
              <h2 className="text-xl mb-3 montserrat">{trailer.name}</h2>
              <div className="w-full aspect-video max-w-4xl">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  allowFullScreen
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailHero;