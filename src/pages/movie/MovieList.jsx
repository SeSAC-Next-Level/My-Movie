import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import genreApi from '../../api/genre/genreApi';
import movieApi from '../../api/movie/movieApi';
import { useDispatch, useSelector } from 'react-redux';
import { setGenre } from '../../store/slice/genreSlice';

const POSTER_SIZES = 'w185';

async function getMoviesByGenreId(genreMap, genreId) {
  console.log(genreId);
  
  const genreName = genreMap[genreId]
  if(!genreName) {
    console.error('장르번호 확인')
    return null
  }
  return await movieApi.getMovieByGerneId(genreId)
}
async function getGenre() {
  const response = await genreApi.getGenre();

  // return response.genres.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  return response.genres;
}

async function getMovies() {
  return await movieApi.getNowPlaying();
}
export default function MovieList() {
  const [movieList, setMovieList] = useState([]);
  const [items, setItems] = useState(new Array());
  const genreList = useSelector((state) => state.genre);
  const dispatch = useDispatch();

  const genreMap = genreList.reduce((map, g) => {
    map[g.id] = g.name
    return map
  }, {})
  
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

  /* 
  
  data = {
    액션 : [영화, 영화],
    롤맨스 : [영화, 영화],
    대충 : [영화, 영화],
  }
  
  {genre : 액션,
    movie : [영화 리스트]
  }
  => 
  [애셕, 영화리스트]
  
  =>
    data = [[액션, [영화]], [로맨스, [영화]], [대충, [영화]]].map( genre, movielist => {
      return {genre, moveillist}
      li key=genre
        h1 gerne
        movielist.map()
  
    } 
        
    */
  useEffect(() => {
    const updateItems = () => {
      const data = {}


      // const genreMap = {}
      // genreList.forEach(g => {
      //   genreMap[g.id] = g.name
      // })


      /* 
      장르의 개수가 영화의 개수보다 적다
      영화와 장르 중 영화를 기준으로 장르 순회 하는 것이 순서가 더 적다

      영화를 순회
      const {id, name}장르.find(장르.id === 영화.장르_ids[0])
      data[name] = [{영화}, {영화}] 


      
      */
      movieList.forEach(m => {

        const { id, title, poster_path, genre_ids } = m
        const genreName = genreMap[genre_ids[0]]

        const hasGenreName = data[genreName]
        if (!hasGenreName) {
          data[genreName] = []
        }
        data[genreName].push({ id, title, poster_path })

      })
      const newItems = Object.entries(data)
      setItems(newItems)
    };
    updateItems();
  }, [genreList, movieList]);

  /* 
  데이터를 보관하고 있을 때는 아래의 로직으로 나오는 결과가
  데이터의 명확성과 유지보수 측면에 더 어울리지만
  newItems를 만들어 가는 과정에서 조회하는 시간이 (cost) 가 많이 발생함

  화면에 뿌리기 좋은 형태로 데이터를 조작해도 괜찮음
  
  */
  useEffect(() => {
    const updateItems = () => {
      if (genreList.length && movieList.length) {
        // setItems에 사용될 최종 데이터
        // 기존의 데이터를 새로 갈아끼울 거임
        // 장르 별로 영화를 조합한 새로운 데이터
        const newItems = [];

        movieList.forEach(({ poster_path, title, id, genre_ids }) => {
          const movie = { id, title, poster_path };
          let item = newItems.find((i) => i.genre.id == genre_ids[0]);

          // 없으면
          if (!item) {
            const genre = genreList.find((g) => g.id == genre_ids[0]);
            // 장르가 있는 영화만 사용하기 위함
            if (genre) {
              // 객체 하나 만들어서
              // 무비에 어레이 만들고 영화 넣어
              // 그리고 영화의 장르 아이디로 장르 리스트에서 장르 가져와서 객체에 추가
              item = {
                movie: [movie],
                genre,
              };
              newItems.push(item);
            }
          }
          // 있으면 아이템즈의 무비의 어레이에 영화 추가
          else {
            item.movie.push(movie);
          }
        });

        setItems(newItems);
      }
    };

    // updateItems();
    //   console.log(items);
  }, [genreList, movieList]);

  /** @todo 장르list.map(filter())*/
  useEffect(() => {
    // 장르 하나 가져와서 영화 전체 순회
    // return 장르.id === 영화.id
    // setItems(getNewItems(genreList, movieList));
  }, [genreList, movieList]);
  // const rendedItem = oldVersion(items)
  const rendedItem = items.map(item => {
    const [genre, ...movie] = item

    return (<div key={genre}>
      <div style={{ display: 'flex' }}>
        <h3>{genre}</h3>
        <div>
          <b>
            <Link to={`list?genre=${genre}`}>더보기</Link>
          </b>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {movie[0].map((m) => {
          const { poster_path, title, id } = m
          // console.log(m);
          const imgUrl = [
            import.meta.env.VITE_API_IMAGE_URL,
            POSTER_SIZES,
            poster_path,
          ].join('/');

          return (
            <div
              key={id}
              style={{ boxSizing: 'content-box', margin: '10px' }}
            >
              <div>{title}</div>
              <Link to={id}>
                <div>
                  <img src={imgUrl} alt="" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>)



  })
  return (
    <div>
      <div onClick={async () => await getMoviesByGenreId(genreMap, 28)}>MovieList</div>
      {rendedItem}

    </div>
  );
}

function oldVersion(items) {
  return items.map(({ genre, movie }) => {
    // if (!movie.length) return null;// 두번째 방법: map을 썼을 때 
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
            const imgUrl = [
              import.meta.env.VITE_API_IMAGE_URL,
              POSTER_SIZES,
              poster_path,
            ].join('/');

            return (
              <div
                key={id}
                style={{ boxSizing: 'content-box', margin: '10px' }}
              >
                <div>{title}</div>
                <Link to={id}>
                  <div>
                    <img src={imgUrl} alt="" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
}

function getNewItems(genreList, movieList) {
  // 3. result return
  return genreList.map((genre) => {
    // 1. filter return
    const movie = movieList.filter((m) => {
      return m.genre_ids[0] == genre.id;
    });

    // 2. map return
    return { genre, movie };
  });
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
