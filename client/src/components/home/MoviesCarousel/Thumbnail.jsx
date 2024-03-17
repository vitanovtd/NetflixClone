import React from "react";
import "./Thumbnail.css";
import { useDispatch } from "react-redux";
import { openModal, setCurrentMovie } from "../../../db/slices/modalSlice";

function Thumbnail({ movie }) {
  const dispatch = useDispatch();

  return (
    <div
      className="thumbnail-container"
      onClick={() => {
        dispatch(setCurrentMovie(movie));
        dispatch(openModal());
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="thumbnail-image"
        alt=""
      />
    </div>
  );
}

export default Thumbnail;
