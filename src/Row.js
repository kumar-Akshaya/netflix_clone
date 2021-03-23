import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // if [], run once when the row loads, and don't run again.
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      console.log("request", request);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);
  console.log("movies", movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {/** several row poster(s) */}
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__large__poster"}`}
            id={movie.id}
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.original_title}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
