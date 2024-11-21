import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
export default function MovieHeader({ genreId }) {

  
  const queryString = new URLSearchParams({
    genre: genreId
  })
  const genreMap = useSelector((state) => state.genre);
  return (
    <div style={{ display: 'flex' }}>
      <h3>{genreMap[genreId]}</h3>
      <div>
        <b>
          <Link to={`list?${queryString}`}>더보기</Link>
        </b>
      </div>
    </div>
  )
}
