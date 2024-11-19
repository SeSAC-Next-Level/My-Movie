import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import genreApi from '../../api/genre/genreApi';
import movieApi from '../../api/movie/movieApi';
import { useDispatch, useSelector } from 'react-redux';
import { setGenre } from '../../store/slice/genreSlice';

async function getGenre() {
  const response = await genreApi.getGenre();

  // return response.genres.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  return response.genres.sort((a, b) => parseInt(a.id) - parseInt(b.id));
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
    // 비동기와 동기가 같이 있어 순서보장이 되지 않음
    // 때문에 상태 변경을 감지하면 동작하도록 나눔
    // 함수 선언
    const setMovieAndGenre = async () => {
      if (!genreList.length) {
        const genres = await getGenre();

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
        //무비리스트 필터 걸어서 장르별로
        // 무비리스트에 장르 뽑아서 집어너서


        // genreList.map((genre) => {movielist에서 해당 gendre를 가지는 것들 필터링})

        // 단, 하나도 없으면 없애기 (length에 대한 filter)

        // movie list를 순회를 돌면서 하나하나 새로운 obj에 넣자
        // 해당 movie에 genre에 대한 key가 있으면 그냥 넣고
        // 해당 mvoie에 grne에 대한 key가 없으면 만들면서 넣고


        // 무리비리스트 장르 싹다 뽑아 갖고 있고
        // 장르별로 맵 돌려서 액션에 대한 무비,스릴러에 대한 무비
        // setter에 담을 값
        //
        const newItems = []
        // const newItems = [];
        // 영화 순회 하면서
        // 장르 별로 items에 movie push
        // items : genre :{id, name}, movie(list):[{poster_path, title, id}]
        // 영화 정보: ({poster_path, title, id, genre_ids[0]})

        movieList.forEach(({ poster_path, title, id, genre_ids }) => {
          const movie = { poster_path, title, id };
          // 배열 [{genre:{},movie:[{}, {}]}]
          // movie 꺼내
          // 아이템즈에서 영화장르 아이디로 찾아
          let item = items.find((i) => i.genre.id == genre_ids[0]);

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
              // item.movie = new Array(movie);
              // item.genre = genreList.find((g) => g.id == genre_ids[0]);
              // 그리고 아이템즈에 추가
              // newItems.push(item);
              newItems.push(item);
            }
          }
          // 있으면 아이템즈의 무비의 어레이에 영화 추가
          else {
            // 중복 삽입 방지
            if (!item.movie.some((m) => m.id === id)) {
              item.movie.push(movie);
            }
          }
          //  state 유지( ...items)
          // setItems(newItems)
        });
        setItems(newItems);
      }
    };
    updateItems();
    console.log(items);
  }, []);
  return (
    <div>
      <div onClick={async () => await getMovies()}>MovieList</div>
      {items.map(({ genre, movie }) => {
        // console.log(genre.id);

        return (
          <div>
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
                  <div style={{ boxSizing: 'content-box', margin: '10px' }}>
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
