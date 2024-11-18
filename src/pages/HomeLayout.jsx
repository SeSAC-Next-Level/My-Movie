import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../component/layout/Header'
import Footer from '../component/layout/Footer'

export default function HomeLayout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}
