import React, { useEffect, useState } from "react";
import "./row.css";
import axios from "../../../utils/axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    (async () => {
      try {
        console.log(`Fetching: ${fetchUrl}`);
        const response = await axios.get(fetchUrl);
        let movieResults = response.data.results || [];

        // Filter out movies that don't have an image
        const filteredMovies = movieResults.filter(
          (movie) => movie.poster_path || movie.backdrop_path
        );

        console.log("Fetched Movies:", filteredMovies);
        setMovies(filteredMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    })();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.error("Error finding trailer:", error));
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div className="row">
      <h1>{title}</h1>
      <div className="row_posters">
        {movies.length > 0 ? (
          movies.map((movie, index) => {
            const imgUrl = `${base_url}${
              isLargeRow
                ? movie.poster_path
                : movie.backdrop_path || movie.poster_path
            }`;

            return (
              <img
                onClick={() => handleClick(movie)}
                key={index}
                src={imgUrl}
                alt={movie.name || movie.title || "No Title"}
                className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/200x300?text=Image+Not+Available";
                }}
              />
            );
          })
        ) : (
          <p>No movies available</p>
        )}
      </div>
      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
