import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Card from '../components/Card'

const SearchPage = () => {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")

    const [movies, setMovies] = useState([])


    useEffect(() => {
  if (!query) return
  axios.get("https://api.themoviedb.org/3/search/multi", {
    params: { api_key: import.meta.env.VITE_API_KEY, query: query }
  }).then(res => setMovies(res.data.results))  // yeh missing tha
}, [query])

    return movies.length > 0 ? (
    <div className="lg:w-9/12 xl:w-7/12  mx-auto mt-10 px-5 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 ">
        {movies.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
    ) : (
    <Loading />
  );
}

export default SearchPage