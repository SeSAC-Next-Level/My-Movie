import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function MovieBody({ movie }) {
  const navigate = useNavigate()

  const POSTER_SIZES = 'w185';

  const { id, title, poster_path } = movie;

  const imgUrl = [
    import.meta.env.VITE_API_IMAGE_URL,
    POSTER_SIZES,
    poster_path,
  ].join('/');

  return (
    <div
      style={{ boxSizing: 'content-box', margin: '10px' }}
    >
      <Link to={`/movie/${id}`}>
        <div>
          <img src={imgUrl} alt={title} />
        </div>
      </Link>
      <div onClick={() => navigate(`/movie/${id}`)}>{title}</div>
    </div>
  )
}
