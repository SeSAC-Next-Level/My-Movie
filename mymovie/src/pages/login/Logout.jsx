import React, { useEffect, useState } from 'react'
import LinkBtn from '../../component/common/LinkBtn'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../store/slice/usersSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function Logout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(state => state.users)
  console.log(users);


  useEffect(() => {
    if (localStorage.getItem('isLogin')) {
      localStorage.setItem('isLogin', false)
      dispatch(logout())
    }
    navigate('/')

  }, [dispatch])
  
  return (
    <div >
      Logout
    </div >
  )
}