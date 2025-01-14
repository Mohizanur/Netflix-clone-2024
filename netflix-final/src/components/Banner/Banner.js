import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const results = request.data.results;
        if (results && results.length > 0) {
          setMovie(results[Math.floor(Math.random() * results.length)]);
        } else {
          console.warn("No movies found in the API response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  if (!movie) {
    return <div className="banner">Loading...</div>;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundImage: movie?.backdrop_path
          ? `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`
          : "none",
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title ||
            movie?.name ||
            movie?.original_name ||
            "Unknown Title"}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">
          {movie?.overview
            ? movie.overview.length > 150
              ? `${movie.overview.substring(0, 150)}...`
              : movie.overview
            : "No description available."}
        </h1>
      </div>
      <div className="banner_fadeBottom" />
    </div>
  );
};

export default Banner;
