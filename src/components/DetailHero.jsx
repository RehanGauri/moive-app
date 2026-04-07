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
    // Movie
    return formatRuntime(detail.runtime); 
  } else if (detail?.episode_run_time?.[0]) {
    // TV show
    return formatRuntime(detail.episode_run_time[0]) + " per episode";
  } else {
    return "N/A";
  }
};

  return (
    <>
      <div className="h-full flex flex-col items-center">
        {/* 🔥 Main UI */}
        <div className="flex justify-center items-center h-160 text-white">
          <div className="flex gap-10">
            {/* Poster */}
            <div>
              <img
                src={
                  detail?.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${detail.poster_path}`
                    : "https://dummyimage.com/300x450/000/fff"
                }
                className="h-100 w-71 object-cover rounded-3xl"
              />
            </div>

            {/* Info */}
            <div className="w-140">
              <h2 className="text-3xl mb-5">{detail.name || detail.title}</h2>

              {/* Rating + Year + Runtime */}
              <div className="flex mb-5">
                <div className="flex bg-black/20 py-1 px-2 rounded-full items-center gap-1">
                  <FaStar className="text-yellow-300 text-sm" />
                  <span className="text-xs">
                    {detail?.vote_average?.toFixed(1)} / 10
                  </span>
                </div>

                <span className="ml-3 flex items-center gap-1">
                  <CiCalendar />
                  {(detail?.release_date || detail?.first_air_date)?.slice(
                    0,
                    4,
                  )}
                </span>

                <span className="ml-4 flex items-center gap-1">
                  <CiClock2 />
                  {formatRuntimeLabel(detail)}
                </span>
              </div>

              {/* Buttons */}
              <div className="mb-5 flex gap-3">
                <button
                  onClick={() => setShowPlayer(true)}
                  className="bg-red-600 flex items-center gap-2 px-5 py-2 rounded-full hover:scale-105 transition cursor-pointer"
                >
                  <FaPlay className="text-xs" />
                  Play Now
                </button>

                <button
                  onClick={() => toggleWatchlist(detail)}
                  className="border flex items-center gap-2 px-4 py-2 rounded-full hover:scale-105 transition cursor-pointer"
                >
                  {liked ? <FaHeart className="text-red-500" /> : <CiHeart />}
                  {liked ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>
              </div>

              {/* Genres */}
              <div className="flex gap-3 mb-5">
                {detail?.genres?.map((genre) => (
                  <div
                    key={genre.id}
                    className="border rounded-full px-3 py-1 text-sm"
                  >
                    {genre.name}
                  </div>
                ))}
              </div>

              {/* Overview */}
              <div className="mb-6">{detail.overview}</div>

              {/* Cast */}
              <div>
                <h2 className="text-lg mb-2">Top Cast</h2>
                <div className="flex gap-4">
                  {detail?.credits?.cast?.slice(0, 5).map((actor) => (
                    <div key={actor.id} className="w-16 text-center">
                      <img
                        src={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                            : "https://dummyimage.com/100x100/000/fff"
                        }
                        className="h-24 object-cover rounded"
                        alt=""
                      />
                      <h2 className="text-sm mt-1">{actor.name}</h2>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 🎬 Trailer Modal */}
        {showPlayer && trailer && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-50">
            <div className="relative w-[80%] h-[60%]">
              <button
                className="absolute -top-10 right-0 text-white text-xl"
                onClick={() => setShowPlayer(false)}
              >
                <MdClose className="text-3xl " />
              </button>

              {/* Video */}
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

        <div className="">
          {trailer && (
            <div className="mt-10 px-10 pb-10">
              <h2 className="text-xl mb-3 montserrat">{trailer.name}</h2>

              <iframe
                width="920"
                height="400"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                allowFullScreen
                className="rounded-xl object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailHero;
