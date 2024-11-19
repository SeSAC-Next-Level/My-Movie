import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import genreApi from '../../api/genre/genreApi';
import movieApi from '../../api/movie/movieApi';
import { useDispatch, useSelector } from 'react-redux';
import { setGenre } from '../../store/slice/genreSlice';

async function getGenre() {
  const response = await genreApi.getGenre();

  // return response.genres.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  return response.genres;
}

async function getMovies() {
  const movies = await movieApi.getNowPlaying();
  return movies;
}
export default function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [items, setItems] = useState(new Array());
  const genreList = useSelector((state) => state.genre);
  const dispatch = useDispatch();
  useEffect(() => {
    const setMovieAndGenre = async () => {
      if (!genreList.length) {
        const genres = await getGenre();
        // store 수정
        dispatch(setGenre(genres));
      }
      if (!movieList.length) {
        const movies = await getMovies();
        setMovieList(movies.results);
      }
    };
    //실행
    setMovieAndGenre();
  }, [genreList, movieList]);

  useEffect(() => {
    const updateItems = () => {
      if (genreList.length && movieList.length) {
        // setItems에 사용될 최종 데이터
        // 기존의 데이터를 새로 갈아끼울 거임
        // 장르 별로 영화를 조합한 새로운 데이터
        const newItems = []

        movieList.forEach(({ poster_path, title, id, genre_ids }) => {
          const movie = { poster_path, title, id };
          let item = newItems.find((i) => i.genre.id == genre_ids[0]);

          // 없으면
          if (!item) {
            const genre = genreList.find((g) => g.id == genre_ids[0]);
            // 장르가 있는 영화만 사용하기 위함
            if (genre) {
              // 객체 하나 만들어서
              item = {
                // 무비에 어레이 만들고 영화 넣어
                movie: [movie],
                // 그리고 영화의 장르 아이디로 장르 리스트에서 장르 가져와서 객체에 추가
                genre,
              };
              newItems.push(item);
            }

          }
          // 있으면 아이템즈의 무비의 어레이에 영화 추가
          else {
            // 중복 삽입 방지
            // newItems는 어레이: 인덱스로 접근
            let index = 0
            if (!newItems.some(({ genre, movie }, idx) => {
              index = idx
              return movie.id === id
            })) {
            }
            newItems[index].movie.push(movie);
          }
        });
        setItems(newItems);
      }
    };


    updateItems();
    console.log(items);
  }, [genreList, movieList]);
  /*   useEffect(() => {
      // 장르list.map(filter())
  
      // 장르 하나 가져와서 영화 전체 순회
      // return 장르.id === 영화.id
      const newItems = genreList.map((genre) => {
        const movie = movieList.filter(m => {
          return m.genre_ids[0] == genre.id
        })
  
        return { genre, movie }
      });
  
      setItems(newItems);
      console.log(newItems);
      // console.log(items);
    }, [genreList, movieList]);
   */
  return (
    <div>
      <div onClick={async () => await getMovies()}>MovieList</div>
      {items.map(({ genre, movie }) => {
        if (!movie.length) return null
        return (
          <div key={genre.id}>
            <div style={{ display: 'flex' }}>
              <h3>{genre.name}</h3>
              <div>
                <b>
                  <Link to={`list?genre=${genre.id}`}>더보기</Link>
                </b>
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              {movie.map(({ poster_path, title, id }) => {
                return (
                  <div key={id} style={{ boxSizing: 'content-box', margin: '10px' }}>
                    <div>{title}</div>
                    <Link to={id}>
                      <div>
                        <img src={`${poster_path}`} alt="" />
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {/* <div>
        <div style={{ display: 'flex' }}>
          <h3>SF</h3>
          <div>
            <b>
              <Link to="list?genre=sf">더보기</Link>
            </b>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ boxSizing: 'content-box', margin: '10px' }}>
            <div>제목 1</div>
            <div>
              <img
                src="https://placehold.co/100x200/000000/FFFFFF/png"
                alt=""
              />
            </div>
          </div>
          <div style={{ boxSizing: 'content-box', margin: '10px' }}>
            <div>제목 2</div>
            <div>
              <img
                src="https://placehold.co/100x200/000000/FFFFFF/png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex' }}>
          <h3>로맨스</h3>
          <div>
            <b>
              <Link to="list?genre=romence">더보기</Link>
            </b>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ boxSizing: 'content-box', margin: '10px' }}>
            <div>제목 3</div>
            <div>
              <img
                src="https://placehold.co/100x200/000000/FFFFFF/png"
                alt=""
              />
            </div>
          </div>
          <div style={{ boxSizing: 'content-box', margin: '10px' }}>
            <div>제목 4</div>
            <div>
              <img
                src="https://placehold.co/100x200/000000/FFFFFF/png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
} /* 
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
