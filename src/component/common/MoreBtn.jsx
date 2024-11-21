import React from 'react'
import { Link } from 'react-router-dom'

export default function MoreBtn({ queryString }) {
  return (
    <div>
      <b>
        <Link to={`list?${queryString}`}>더보기</Link>
      </b>
    </div>
  )
}
