// Libs
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import BillboardComponent from "../../../components/home/BillboardComponent/BillboardComponent";
import MovieCarousel from "../../../components/home/MoviesCarousel/MoviesCarousel";

// Services
import { getMoviesByGenre } from "../../../services/HomeService";

import "./HomePage.css";
import MovieModal from "../../../components/home/MovieModal/MovieModal";

const HomePage = () => {
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const getMoviesRef = useRef(null);

  const {
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  } = useSelector((state) => state.movies);

  const { showModal, currentMovie } = useSelector((state) => state.modal)

  useEffect(() => {
    const controller = new AbortController();
    const genres = [
      { genre: "Trending", field: "trendingNow" },
      { genre: "TopRated", field: "topRated" },
      { genre: "Action", field: "actionMovies" },
      { genre: "Comedy", field: "comedyMovies" },
      { genre: "Horror", field: "horrorMovies" },
      { genre: "Romance", field: "romanceMovies" },
      { genre: "Documentaries", field: "documentaries" },
    ];

    genres.forEach((genre) => {
      dispatch(getMoviesByGenre({ ...genre, signal: controller.signal }));
    });

    return () => {
      controller.abort();
    };
  }, [dispatch]);

  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     try {
  //       const actionResult = dispatch(getMovies());
  //       getMoviesRef.current = actionResult;
  //       const data = await actionResult.unwrap();``
  //       console.log(data)
  //       setMovies(data);
  //     } catch (error) {
  //       if (error.message === "Aborted") {
  //         return;
  //       }
  //       alert("Errors!");
  //     }
  //   };
  //   fetchMovies();
  // }, []);

  // // Unsubscribe from APIs
  // useEffect(() => {
  //   return () => {
  //     getMoviesRef.current.abort();
  //   };
  // }, []);

  // Define the carousels array


  const carousels = [
    { title: "Trending Now", movies: trendingNow },
    { title: "Top Rated", movies: topRated },
    { title: "Action Thrillers", movies: actionMovies },
    { title: "Comedies", movies: comedyMovies },
    { title: "Horror Movies", movies: horrorMovies },
    { title: "Romance Movies", movies: romanceMovies },
    { title: "Documentaries", movies: documentaries },
    { title: "My List", movies: [{}] },
  ];

  return (
    <div className={`HomePage ${showModal ? " hideScroll" : ""}`}>
      <BillboardComponent />

      <section className="HomePage__MoviesContainer">
        {carousels.map((carousel, index) => (
          <MovieCarousel
            key={index}
            title={carousel.title}
            movies={carousel.movies}
          />
        ))}
        {showModal && (
          <MovieModal
            currentMovie={currentMovie}
          />
        )}
      </section>
    </div>
  );
};

export default HomePage;
