import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../../db/slices/modalSlice'
import './MovieModal.css'

const MovieModal = ({
  currentMovie
}) => {
  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY
  const dispatch = useDispatch()
  const { overview, poster_path } = currentMovie
  const year = currentMovie?.release_date?.split("-")[0]
  const POSTER_PATH_URL = `https://image.tmdb.org/t/p/w300${poster_path}`
  const [trailer, setTrailer] = useState("")
  const [genres, setGenres] = useState([])
  const [hasStartedWatchingTrailer, setHasStartedWatchingTrailer] = useState(false)

  const handleCloseModal = (e) => {
    e.stopPropagation()
    if (e.target === e.currentTarget) {
      dispatch(closeModal())
    }
  }

  const handleStartVideo = () => {
    setHasStartedWatchingTrailer(true)
  }

  useEffect(() => {
    if (!currentMovie) return

    async function fetchMovie() {
      const res = await fetch(
        `https://api.themoviedb.org/3/${currentMovie?.media_type === "tv" ? "tv" : "movie"}/${currentMovie?.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos
        `
      )

      const data = await res.json()

      setGenres(data?.genres)

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element) => element.type === "Trailer"
        )

        const trailer = data?.videos?.results[index]?.key
        setTrailer(trailer)
      }
    }
    fetchMovie()
  }, [currentMovie])


  // closing the modal with the escape key
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        dispatch(closeModal())
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, []);


  return (
    <div className="MovieModal" onClick={handleCloseModal}>
      <div className="MovieModal__wrapper">
        <div className="MovieModal__top">
          {hasStartedWatchingTrailer
            ? <iframe
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              frameborder='0'
              allow='autoplay; encrypted-media'
              allowfullscreen
              title='video'
              className='MovieModal__top-trailer'
            />
            : <img
              className="MovieModal__top-img"
              src={POSTER_PATH_URL}
            />
          }
          <div className="MovieModal__top-bottom">
            <div className="MovieModal__top-bottom-left">
              <button className="MovieModal__top-bottom-left-playBtn" onClick={handleStartVideo}>
                <i className="bi bi-play-fill"></i>
                <span>Play</span>
              </button>
              <i className="bi bi-plus"></i>
              <i className="bi bi-hand-thumbs-up"></i>
            </div>
            <div className="MovieModal__top-bottom-right">
              <div className="MovieModal__top-bottom-title">
                {currentMovie?.title}
              </div>
              <div
                className="MovieModal__top-bottom-sound-icons"
              >
                <i className="bi bi-volume-up"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="MovieModal__bottom">
          <div className="MovieModal__bottom-left">
            <div className="MovieModal__bottom-left-release">
              <span>New</span>
              <span>{year}</span>
              <div>13+</div>
              <span className="MovieModal__bottom-left-release-media-type">
                {currentMovie?.media_type}
              </span>
              <span>HD</span>
            </div>
            <p className="MovieModal__desc">
              {overview}
            </p>
          </div>
          <div className="MovieModal__bottom-right">
            <div className="MovieModal__bottom-cast">
              <span>Cast:</span>
              <div>Yu Shuxin, Dulan Wang, Joe Xu, more</div>
            </div>
            <div className="MovieModal__bottom-genres">
              <span>
                <span>Genres:</span>
                {genres?.map((genre) => genre.name).join(", ")}
              </span>
            </div>
            <div className="MovieModal__bottom-show">
              <span>This show is:</span>
              <div>
                Charming, Quirky, Romantic
              </div>
            </div>
          </div>
        </div>
        <i onClick={handleCloseModal} className="bi bi-x-lg"></i>
      </div>
    </div>
  )
}

export default MovieModal