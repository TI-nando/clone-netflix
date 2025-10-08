import { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../apiConfig";
import "./Banner.css";

type Movie = {
  id: number;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
};

export function Banner() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [bannerTrailer, setBannerTrailer] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const results = request.data.results || [];
      if (results.length > 0) {
        const index = Math.floor(Math.random() * results.length);
        setMovie(results[index]);
      } else {
        setMovie(null);
      }
      return request;
    }
    fetchData();
  }, []);

  function truncate(str: string | undefined, n: number) {
    return str?.length && str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`
          : undefined,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={async () => {
            if (!movie) return;
            try {
              const url = await movieTrailer(movie?.name || movie?.title || movie?.original_name || "");
              const urlParams = new URLSearchParams(new URL(url).search);
              setBannerTrailer(urlParams.get("v"));
            } catch (e) {
              console.log(e);
            }
          }}>Assistir</button>
          <button className="banner__button" onClick={() => {
            if (!movie) return;
            const listKey = "my_list";
            const current = JSON.parse(localStorage.getItem(listKey) || "[]");
            const exists = current.some((m: Movie) => m.id === movie.id);
            const next = exists ? current : [...current, movie];
            localStorage.setItem(listKey, JSON.stringify(next));
            alert(exists ? "Já está na sua lista" : "Adicionado à minha lista");
          }}>Minha Lista</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>

      <div className="banner--fadeBottom" />
      {bannerTrailer && (
        <div style={{ padding: "0 30px 20px" }}>
          <YouTube videoId={bannerTrailer} opts={{ height: "360", width: "100%", playerVars: { autoplay: 1 } }} />
        </div>
      )}
    </header>
  );
}
