import React from 'react'
import LinkBtn from '../common/LinkBtn'

export default function Header() {
  return (
    <div>
      <LinkBtn link={'/login'}>로그인</LinkBtn>
    </div>
  )
}
