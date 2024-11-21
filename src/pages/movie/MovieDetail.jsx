import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import movieApi from '../../api/movie/movieApi'

const POSTER_SIZES = "w342"



export default function MovieDetail() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState({})
  const [reviews, setReviews] = useState({})

  useEffect(() => {
    async function getMovie(id) {
      const movieData = await movieApi.getMovie(id)
      const reviewsData = await movieApi.getReviewByMovieId(id)
      reviewsData.results.sort((d1, d2) => new Date(d2.created_at) - new Date(d1.created_at))
      
      setMovie(movieData)
      setReviews(reviewsData.results)
    }
    getMovie(movieId)
  }, []) // 1회 시행
  console.log(movie);
  console.log(reviews);

  const { title, poster_path, vote_average, release_date, runtime, genres, overview } = movie
  const imgUrl = [
    import.meta.env.VITE_API_IMAGE_URL,
    POSTER_SIZES,
    poster_path,
  ].join('/');


  return (
    <div>
      <div>
        <img src={`${imgUrl}`} alt={`${title}`} />
      </div>
      <div>
        <div>
          <h3>{title} <span></span></h3>
          <div>Genre : {Array.isArray(genres) && genres.map(({ name }) => name).join(" ")}</div>
          <div>Release Date : {release_date} <small>({runtime}min)</small></div>
          <div>Rating : {vote_average}</div>
        </div>
      </div>
      <div>
        <h3>Overview</h3>
        <div>{overview}</div>
      </div>
      <div>
        <h3>Review</h3>
        {/* 없으면 nothing */}
        <div>{Array.isArray(reviews) && reviews.map(r => {
          console.log(123123);
          
          return (
            <details key={r.id}>
              <summary>{r.author}</summary>
              <p style={{whiteSpace: 'pre-line'}}>
                {r.content}
              </p>
            </details>
          )
        })}</div>
      </div>

    </div>
  )
}
