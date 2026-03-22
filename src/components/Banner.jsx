import React, { useEffect, useState } from "react";
import Button from "./Button";

const Banner = ({ data }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data || data.length === 0) return null;

  const movie = data[index];

  return (
    <div className="h-[calc(100vh-64px)] ">
      <div
        className="h-full relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/50 absolute inset-0"></div>



        <div className=" text-white   w-100 absolute top-4/12 left-1/6 montserrat">
            <h2 className="text-4xl  mb-5 font-bold">{movie.title}</h2>
            <h2 className="font-sans">{movie.overview.length>200? movie.overview.slice(0,197) + "..." : movie.overview}</h2>
        </div>

        <div className="absolute top-125 left-80 flex gap-5 text-white">
            <Button text={"Watch Trailer"} classname={"border border-white"} />
            <Button text={"Watch now"} classname={"bg-red-600 px-5 hover:bg-red-700"} />

        </div>

        <div className="absolute top-50 left-220">
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" 
            className="h-92 object-cover rounded-xl shadow-2xl"
            
            />
        </div>

      </div>
      
    </div>
  );
};

export default Banner;
