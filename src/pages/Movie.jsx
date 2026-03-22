import React, { useEffect, useState } from "react";
import axios from "axios";

import Card from "../components/Card";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [genreMap, setGenreMap] = useState({});

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: import.meta.env.VITE_API_KEY,
          },
        },
      );
      setMovies(res.data.results);
      console.log(res.data);
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <div className="lg:w-9/12 xl:w-7/12  mx-auto mt-10 px-5 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 ">
        {movies.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Movie;
