import React from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetail() {
  const {movieId} = useParams()
  console.log(movieId);
  
  return (
    <div>{movieId} MovieDetail</div>
  )
}
