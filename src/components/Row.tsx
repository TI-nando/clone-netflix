import { useState, useEffect, useRef, useCallback } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import movieTrailer from "movie-trailer";

type Props = {
  title: string;
  fetchUrl: string;
  isLargeRow?: boolean;
};

type Movie = {
  id: number;
  name: string;
  title: string;
  original_name: string;
  poster_path: string;
  backdrop_path: string;
  overview?: string;
  vote_average?: number;
  release_date?: string;
  first_air_date?: string;
};

type Options = {
  height: string;
  width: string;
  playerVars: {
    autoplay: 0 | 1 | undefined;
  };
};

export function Row({ title, fetchUrl, isLargeRow = false }: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const rowRef = useRef<HTMLDivElement>(null);
  const scrollAnimationRef = useRef<number | null>(null);

  const base_url = "https://image.tmdb.org/t/p/original/";

  const updateArrows = useCallback(() => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
      setAtStart(scrollLeft <= 0);
      setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    updateArrows();
  }, [movies, updateArrows]);

  useEffect(() => {
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const opts: Options = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie: Movie) => {
    // Toggle seleção: se clicar no mesmo, fecha; senão abre painel de detalhes
    if (selectedMovie?.id === movie.id) {
      setSelectedMovie(null);
      setTrailerUrl("");
      return;
    }
    setSelectedMovie(movie);
    movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
      .then((url: string) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"));
      })
      .catch((error: Error) => console.log(error));
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo = direction === 'left'
      ? scrollLeft - clientWidth
      : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth'})
    }
  } 

  const stopContinuousScroll = () => {
    if (scrollAnimationRef.current != null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
  };

  const startContinuousScroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const speed = 1000; // pixels per segundo
    let lastTime = performance.now();

    const step = (time: number) => {
      if (!rowRef.current) return;
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
      const delta = speed * dt * (direction === 'left' ? -1 : 1);
      const next = scrollLeft + delta;

      // Limita nos extremos
      const max = scrollWidth - clientWidth;
      const clamped = Math.max(0, Math.min(next, max));
      rowRef.current.scrollLeft = clamped;
      updateArrows();

      // Para quando atingir os extremos
      if (clamped <= 0 || clamped >= max) {
        stopContinuousScroll();
        return;
      }
      scrollAnimationRef.current = requestAnimationFrame(step);
    };

    stopContinuousScroll();
    scrollAnimationRef.current = requestAnimationFrame(step);
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__carousel-wrapper">
        {!atStart && (
          <div
            className="slider__arrow slider__arrow--left"
            onClick={() => handleScroll('left')}
            onMouseDown={() => startContinuousScroll('left')}
            onMouseUp={stopContinuousScroll}
            onMouseLeave={stopContinuousScroll}
            onTouchStart={() => startContinuousScroll('left')}
            onTouchEnd={stopContinuousScroll}
            onTouchCancel={stopContinuousScroll}
            role="button"
            aria-label="Scroll left"
          >
            <span className="arrow-icon">&lt;</span>
          </div>
        )}

        <div className="row__posters" ref={rowRef} onScroll={() => {
          if (rowRef.current) {
            const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
            setAtStart(scrollLeft <= 0);
            setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
          }
        }}>
          {movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) ||
                (!isLargeRow && movie.backdrop_path)) && (
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  key={movie.id}
                  onClick={() => handleClick(movie)}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                  loading="lazy"
                />
              )
          )}
        </div>

        {!atEnd && (
          <div
            className="slider__arrow slider__arrow--right"
            onClick={() => handleScroll('right')}
            onMouseDown={() => startContinuousScroll('right')}
            onMouseUp={stopContinuousScroll}
            onMouseLeave={stopContinuousScroll}
            onTouchStart={() => startContinuousScroll('right')}
            onTouchEnd={stopContinuousScroll}
            onTouchCancel={stopContinuousScroll}
            role="button"
            aria-label="Scroll right"
          >
            <span className="arrow-icon">&gt;</span>
          </div>
        )}
      </div>
      {selectedMovie && (
        <div className="row__details">
          <div className="row__details-header">
            <div className="row__details-title">
              {selectedMovie.title || selectedMovie.name || selectedMovie.original_name}
            </div>
            <button className="row__details-close" onClick={() => {
              setSelectedMovie(null);
              setTrailerUrl("");
            }}>Fechar</button>
          </div>
          <div className="row__details-content">
            {trailerUrl && (
              <div className="row__details-trailer">
                <YouTube videoId={trailerUrl} opts={opts} />
              </div>
            )}
            <div className="row__details-info">
              <p className="row__details-overview">{selectedMovie.overview}</p>
              <div className="row__details-meta">
                {typeof selectedMovie.vote_average !== 'undefined' && (
                  <span>Nota: {selectedMovie.vote_average}</span>
                )}
                {selectedMovie.release_date && (
                  <span> · Lançamento: {selectedMovie.release_date}</span>
                )}
                {selectedMovie.first_air_date && (
                  <span> · Estreia: {selectedMovie.first_air_date}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
