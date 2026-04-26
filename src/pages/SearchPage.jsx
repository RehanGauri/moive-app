import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Loading from '../components/Loading'
import Card from '../components/Card'
import api from '../api'

const SearchPage = () => {
  const [searchParams] = useSearchParams()
  const debouncedQuery = searchParams.get("q") || ""

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([])
      return
    }

    setLoading(true)

    api.get("/search/multi", {
      params: { query: debouncedQuery }
    })
    .then(res => setMovies(res.data.results))
    .catch(err => console.log(err))
    .finally(() => setLoading(false))

  }, [debouncedQuery])

  return (
    <div className="lg:w-9/12 xl:w-7/12 mx-auto mt-10 px-5">



      {loading && <Loading />}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
      )}

      {!loading && debouncedQuery && movies.length === 0 && (
        <p className="text-center text-gray-500">No results found</p>
      )}
    </div>
  )
}

export default SearchPage