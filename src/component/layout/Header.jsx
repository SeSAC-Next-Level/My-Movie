import React from 'react'
import LinkBtn from '../common/LinkBtn'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Header() {
  // const users = useSelector(state => state.users)
  // const dispatch = useDispatch()
  const isLogin = localStorage.getItem('isLogin') == 'true'
  const link = isLogin ? '/logout' : '/login'
  const linkText = isLogin ? 'Logout' : 'Login'

  console.log(link, linkText);
  console.log(localStorage.getItem('isLogin'));


  return (
    <div>
      <ul>
        <li><Link to={"/movie"}>Movie</Link></li>
      </ul>
      <div>
        <b>{isLogin && localStorage.getItem('username')} </b>
        <LinkBtn link={link}>{linkText}</LinkBtn>
      </div>


    </div>
  )
}
