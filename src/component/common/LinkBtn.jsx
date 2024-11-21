import React from 'react'
import { Link } from 'react-router-dom'

export default function LinkBtn({ link, children }) {
  return (
    <div>
      <b>
        <Link to={link}>{children}</Link>
      </b>
    </div>
  )
}
