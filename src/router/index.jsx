import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import Home from '../pages/Home';
import HomeLayout from '../pages/HomeLayout';
import NotFound from '../component/error/NotFound';
import MovieHome from '../pages/movie/MovieHome_backup';
import MovieList from '../pages/movie/MovieList';
import MovieDetail from '../pages/movie/MovieDetail';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/movie',
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <MovieList />,
          },
          {
            path: ":movieId",
            element: <MovieDetail/>
          }
        ],
      },
    ],
  },
]);

export default router;
