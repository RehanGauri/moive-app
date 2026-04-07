import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DetailHero from "../components/DetailHero";
import ContentRow from "../components/ContentRow";
import api from "../api";


const DetailPage = () => {
  const [detail, setDetail] = useState(null);
  const [trailer, setTrailer] = useState(null)
  const [similar, setSimilar] = useState([])


  let { id, type } = useParams();

const mediaType =
  type === "movie"
    ? "movie"
    : type === "tv"
    ? "tv"
    : null;
  
 useEffect(() => {
  const fetchData = async () => {
    try {
      const movieRes = await api.get(
        `/${mediaType}/${id}?append_to_response=videos,credits`,
      );

      const similarRes = await api.get(
        `/${mediaType}/${id}/similar`,
      );

      setDetail(movieRes.data);
      setSimilar(similarRes.data.results);

      const data = movieRes.data;

      const video =
  data?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  ) ||
  data?.videos?.results?.find(
    (v) => v.type === "Teaser" && v.site === "YouTube"
  ) ||
  data?.videos?.results?.find(
    (v) => v.site === "YouTube"
  );

      setTrailer(video);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [id, mediaType]);

useEffect(() => {
  window.scrollTo(0, 0);
}, [id]);



  return  (
    <div className="text-white pb-1">
        <DetailHero detail={detail} trailer={trailer}  />
        <ContentRow 
  data={similar} 
  title={`Similar ${mediaType || ""}`} 
  viewAllBtn={false} 
/>
    </div>
  );
};

export default DetailPage;
