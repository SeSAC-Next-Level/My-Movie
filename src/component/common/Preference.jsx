import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Preference() {
  const { movieId } = useParams()
  let likeList = localStorage.getItem('likeList').split(',')
  const [isLike, setLike] = useState(likeList.some((mId) => mId === movieId))


  return (
    <span style={{ cursor: 'pointer' }} onClick={(e) => {
      if (isLike) {
        likeList = likeList.filter(mId => mId != movieId)
      } else {
        likeList.push(movieId)
      }
      setLike(prev => !prev)
      localStorage.setItem('likeList', likeList)
      console.log(localStorage.getItem('likeList').split(','));

    }}>
      {/* {isLike ? '이미 누름' : '아직 안 누름'} */}
      {isLike ? '❤️' : '🩶'}
    </span>
  )
}
