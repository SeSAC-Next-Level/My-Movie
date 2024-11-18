import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
export default function Home() {
  return (
    <>
    <Outlet></Outlet>
      <div>Welcome to Movie World</div>
      <Link to="/movie">드가자</Link>
    </>
  )
}
