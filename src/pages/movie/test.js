import axios from 'axios';
const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MWFlNDk4ZjI3MThjYjhiMTQyYzQzMDI5N2JiNTY3YiIsIm5iZiI6MTczMTg5ODEzMS4yOTk5ODEsInN1YiI6IjY3M2FhOGQ1YmJiNDlmMDZhMDBkYjczOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-EcVsThLOXh5rIRDFGPw0kI-CScuY1ku9vbq-RBVIOU';
const Authorization = `Bearer ${API_KEY}`;
const headers = { Authorization };
/**
 * @description 영화 관련
 */
export const movieInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie`,
  headers,
});

/**
 * @description
 * 장르 목록
 * @todo store에 저장하여 최소 1회면 시행되도록 만들어야 함
 */
export const genreInstance = axios.create({
  baseURL: `https://api.themoviedb.org/3/genre/movie/list`,
  headers,
});

const genreApi = {
  getGenre: async () => {
    const response = await genreInstance.get('');
    return response.data;
  },
};

const movieApi = {
  getNowPlaying: async () => {
    const response = await movieInstance.get('now_playing');
    return response.data;
  },
};

async function getGenre() {
  const response = await genreApi.getGenre();

  // return response.genres.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  return response.genres.sort((a, b) => parseInt(a.id) - parseInt(b.id));
}

async function getMovies() {
  const movies = await movieApi.getNowPlaying();
  return movies;
}
let genreList=[];
let movieList=[];
let items = [];
const setMovieAndGenre = async () => {
  if (!genreList.length) {
    const genres = await getGenre();

    genreList = genres;
  }
  if (!movieList.length) {
    const movies = await getMovies();
    movieList = movies.results;
  }
  console.log(genreList.length);
  console.log(movieList.length);
  
};

const updateItems = () => {
  if (genreList.length && movieList.length) {
    // setter에 담을 값
    // const newItems = [...items]
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
          items.push(item);
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
    // setItems(newItems);
  }
};
// updateItems();

//실행
setMovieAndGenre().then(()=>{updateItems();console.log(items);});