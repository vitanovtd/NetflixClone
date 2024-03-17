import React, { useRef, useState, useEffect } from "react";
import Thumbnail from "./Thumbnail";
import "./MoviesCarousel.css";
import { useSelector } from "react-redux";

function MoviesCarousel({ title, movies = [] }) {
  const rowRef = useRef(null);
  const { isLoading } = useSelector((state) => state.movies);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  //Makes chevron icons hidden if there is no more room
  useEffect(() => {
    const handleScroll = () => {
      if (rowRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = rowRef.current;
        setIsStart(scrollLeft === 0);
        setIsEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      }
    };

    if (rowRef.current) {
      rowRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (rowRef.current) {
        rowRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleClick = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? Math.max(scrollLeft - clientWidth, 0)
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="MovieCarousel__row">
      <h2 className="MovieCarousel__row-title">{title}</h2>
      <div className="MovieCarousel__group">
        <div
          className={`MovieCarousel__chevron MovieCarousel__chevron-left ${
            isStart ? "hidden" : ""
          }`}
          onClick={() => !isStart && handleClick("left")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
        <div ref={rowRef} className="MovieCarousel__row-content">
          {isLoading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            movies.map((movie, index) => (
              //key={movie.id} doesn't work!?
              <Thumbnail key={index} movie={movie} />
            ))
          )}
        </div>
        <div
          className={`MovieCarousel__chevron MovieCarousel__chevron-right ${
            isEnd ? "hidden" : ""
          }`}
          onClick={() => !isEnd && handleClick("right")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="42"
            height="42"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MoviesCarousel;
