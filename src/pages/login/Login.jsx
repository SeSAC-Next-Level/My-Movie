import React, { useEffect, useState } from 'react'
import LinkBtn from '../../component/common/LinkBtn'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../store/slice/usersSlice'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    username: 'tester',
    password: 'test',
    isLogin: localStorage.getItem("isLogin")
  })
  useEffect(() => {
    if (!user.isLogin) {
      navigate('/movie')
    }

  }, [dispatch])
  return (
    <div>
      <div>
        <Link to={"/movie"}>Go to Movie</Link>
      </div>
      <form onSubmit={(e) => {
        e.preventDefault()
        if (user.username !== localStorage.getItem('username')) {
          localStorage.setItem('likeList', []);
          localStorage.setItem('username', user.username);

        }
        localStorage.setItem('isLogin', true);
        setUser({ ...user, isLogin: localStorage.getItem("isLogin") })
        navigate('/movie')
      }
      } onInput={e => {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        })
      }}>
        <input type="text" name="username" id="username" autoComplete={'off'} />
        <input type="password" name="password" id="password" autoComplete={'off'} />
        <button type="submit">로그인</button>
      </form>
    </div >
  )
}
function foo() {

}