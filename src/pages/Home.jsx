import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import ContentRow from "../components/ContentRow";
import Loading from "../components/Loading";
import api from "../api";

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [topSeries, setTopSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const [tm, trm, ts, trs] = await Promise.allSettled([
          api.get("/discover/movie"),
          api.get("/movie/top_rated"),
          api.get("/discover/tv"),
          api.get("/tv/top_rated"),
        ]);
        console.log(tm.value.data.results);
        console.log(trm.value.data);
        console.log(ts.value.data);
        console.log(trs.value.data);
        if (tm.status === "fulfilled") {
          setTrendingMovies(tm.value.data.results);
        }
        if (trm.status === "fulfilled") {
          setTopMovies(trm.value.data.results);
        }

        if (ts.status === "fulfilled") {
          setTrendingSeries(ts.value.data.results);
        }
        if (trs.status === "fulfilled") {
          setTopSeries(trs.value.data.results);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchLists();
  }, []);


  if(loading){
    return <Loading />
  }
  return (
    <div>
      <Banner data={trendingMovies} />
      <ContentRow data={trendingMovies} title={"Trending Movies"} />
      <ContentRow data={topMovies} title={"Top Rated Movies"} />
      <ContentRow data={trendingSeries} title={"Trending Series"} />
      <ContentRow data={topSeries} title={"Top Rated Series"} />
    </div>
  );
};

export default Home;
