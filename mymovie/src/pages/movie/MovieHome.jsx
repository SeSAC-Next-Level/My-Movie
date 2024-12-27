import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import genreApi from '../../api/genre/genreApi';
import movieApi from '../../api/movie/movieApi';
import { useDispatch, useSelector } from 'react-redux';
import { setGenre } from '../../store/slice/genreSlice';
import MovieHeader from '../../component/movie/MovieHeader';
import MovieBody from '../../component/movie/MovieBody';

async function getMoviesByGenreId(genreMap, genreId) {
  const genreName = genreMap[genreId];

  if (!genreName) {
    console.error('장르번호 확인');
    return null;
  }
  return await movieApi.getMovieByGerneId(genreId);
}

async function getGenre() {
  return await genreApi.getGenre();
}

async function getMovies() {
  return await movieApi.getNowPlaying();
}

export default function MovieHome() {
  const dispatch = useDispatch();

  const genreMap = useSelector((state) => state.genre);
  const [movieList, setMovieList] = useState([]);

  const [items, setItems] = useState([]);


  // 비동기
  useEffect(() => {
    const setMovieAndGenre = async () => {
      if (!Object.keys(genreMap).length) {
        const genres = await getGenre();

        const gMap = genres.reduce(
          (map, g) => {
            map[g.id] = g.name;
            return map;
          }, {}
        );

        // store 업데이트
        dispatch(setGenre(gMap));
      }

      if (!movieList.length) {
        const movies = await getMovies();
        setMovieList(movies.results);
      }
    };
    //실행
    setMovieAndGenre();
  }, [dispatch, genreMap, movieList]);

  // 비동기로 데이터 변화 감지
  useEffect(() => {
    const data = {};

    movieList.forEach((m) => {
      const { id, title, poster_path, genre_ids } = m;
      // 0 인덱스를 주 장르로 가정
      const hasGenreId = data[genre_ids[0]];
      if (!hasGenreId) {
        data[genre_ids[0]] = [];
      }
      data[genre_ids[0]].push({ id, title, poster_path });
    });
    const newItems = Object.entries(data);
    setItems(newItems);
  }, [genreMap, movieList]);


  return (
    <div>
      <div >
        MovieList
      </div>
      {items.map((item) => {
        const [genreId, ...movie] = item; // [genderId , [movie1, movie2, movie3]]

        return (
          <div key={genreId}>
            <MovieHeader genreId={genreId} more={true} />
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>

              {movie[0].map((m) => <MovieBody key={m.id} movie={m} />)}

            </div>
          </div>
        );
      })}
    </div>
  );
}

/* 



에러핸들링
: 문제가 발생했어 문제상황을 알아야 하지, 문제를 어떻게 제어를 할건지, 내가 제어할 수 없는 문제라면? 시스템 문제라면
 내가 예측할 수 없는 에러, 내가 예측할 수 있는 에러, 연산 에러, 프로그램 자체 에러,
 
트러블슈팅
:큰틀에서 할 건지 트라이캐치로 할건지
누가 언제 어디서 어떤 문제를 발생 시켰는지
무슨 문제인지 이메일 카톡 등으로 에러 발생을 알림


로깅 
: 패킷이 날라오면 로그에 남긴다.
어떤사람이 요청을 했을 그걸 기록해야한다

성공 실패 대기 모든

배포 릴리스 디버그

개발자 모드, 배포모드

개발자 로그
배포 모드 로그
다르게 남겨진다


개발자 전부다
배포 핵심만

암복호화 필수



*/
