import React, { useEffect, useState } from "react";
import Button from "./Button";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Banner = ({ data}) => {
  const [index, setIndex] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false)
  const [trailer, setTrailer] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!data || data.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 10000);
    return () => clearInterval(interval);
  }, [data]);


useEffect(() => {
  if (!data || data.length === 0) return
  const movie = data[index]  
  if (!movie?.id) return

  const fetchTrailer = async () => {
    const res = await api.get(
      `/movie/${movie.id}/videos`
    )
    const yt = res.data.results.find(v => v.type === "Trailer" && v.site === "YouTube")
    setTrailer(yt || null)
  }
  fetchTrailer()
}, [data, index])

  if (!data || data.length === 0) return null;

  const movie = data[index];

 
 



  return (
    <div className="h-[calc(100vh-64px)] relative ">
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
            <Button onClick={()=>setShowPlayer(true)} text={"Watch Trailer"} classname={"border border-white"} />
            <Button 
            onClick={()=>navigate(`/movie/${movie.id}`)}
            text={"Watch now"} classname={"bg-red-600 px-5 hover:bg-red-700"} />

        </div>

        <div className="absolute top-50 left-220">
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" 
            className="h-92 object-cover rounded-xl shadow-2xl"
            
            />
        </div>

      </div>
      
        {/* 🎬 Trailer Modal */}
              {showPlayer && trailer?.key && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/80 flex justify-center items-center z-50">
                  
                  <div className="relative w-[60%] h-[60%]">
                    
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


    </div>
  );
};

export default Banner;
