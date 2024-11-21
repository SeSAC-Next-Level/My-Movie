import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import movieApi from '../../api/movie/movieApi'

export default function MovieDetail() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState({})

  useEffect(() => { 
    async function getMovie(id) {
      const data = await movieApi.getMovie
    }
    getMovie(movieId)
  }, [movie])
  console.log(movieId);

  return (
    <div>{movieId} MovieDetail</div>
  )
}
