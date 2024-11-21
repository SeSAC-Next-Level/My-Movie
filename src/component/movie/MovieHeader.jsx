import React from 'react'
import { useSelector } from 'react-redux'
import LinkBtn from '../common/LinkBtn';
/**
 * @param {object} props 
 * @param {string} props.genreId 영화 장르 id
 * @param {boolean} props.more "더보기" 활성화 여부
 * @returns 영화 정보(포스터, 제목, 더보기)
 */
export default function MovieHeader({ genreId, more }) {


  const queryString = new URLSearchParams({
    genre: genreId
  })

  const link = `list?${queryString}`

  const genreMap = useSelector((state) => state.genre);
  return (
    <div style={{ display: 'flex' }}>
      <h3>{genreMap[genreId]}</h3>
      {more &&
        <LinkBtn link={link} >더보기</LinkBtn>}
    </div>
  )
}
