import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import Loading from "../components/Loading";
import api from "../api";

const TvSeries = () => {
  const [tvSeries, setTvSeries] = useState([]);

  useEffect(() => {
    const fetchTvSeries = async () => {
      const res = await api.get(
        "/discover/tv",
      );
      const result = res.data.results.map(item=> ({
        ...item,
        "media_type" : "tv"
      }))
      setTvSeries(result);
    };

    fetchTvSeries();
  }, []);


  return tvSeries.length > 0 ? (
    <div className="lg:w-9/12 xl:w-7/12  mx-auto mt-10 px-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 ">
        {tvSeries.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  ) : (
    <Loading />
  )
};

export default TvSeries;
