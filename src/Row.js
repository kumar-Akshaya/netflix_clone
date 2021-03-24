import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import "./Row.css";
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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

  const opts = {
      height: '390',
      width: '100%',
      playerVars: {
        autoplay: 1
      }
  }

 const handleClick = (movie) => {
      if(trailerUrl) {
          setTrailerUrl('');
      } else {
          movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
          .then((url) => {
             const URLParams = new URLSearchParams(new URL(url).search);
             setTrailerUrl(URLParams.get('v'));
          })
          .catch((error) => alert('Sorry...! No video found currently'));
      }
  }

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
             onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/> }
    </div>
  );
}

export default Row;
