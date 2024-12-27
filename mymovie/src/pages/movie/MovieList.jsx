import React, { useEffect, useState } from 'react'
import MovieHeader from '../../component/movie/MovieHeader';
import MovieBody from '../../component/movie/MovieBody';
import { useParams, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import movieApi from '../../api/movie/movieApi';

export default function MovieList() {
  // 새로고침하면 빈 객체
  const genreMap = useSelector(state => state.genre)
  const [items, setItems] = useState([])
  const [params] = useSearchParams()

  const genreId = params.get('genre');
  useEffect(() => {
    async function makeItems(id) {
      const data = await movieApi.getMovieByGerneId(id)
      const results = data.results
      results.sort((m1, m2) => m2.release_date - m1.release_date)
      console.log(results);
      setItems(results)
    }
    makeItems(genreId)
  }, []) // 한번만 시행

  return <div>
    <MovieHeader genreId={genreId} more={false} />

    {/* grid가 더 이쁠 듯 */}
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {items.map(m => <MovieBody key={m.id} movie={m} />)}
    </div>
  </div>
}
