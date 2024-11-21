import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/RootLayout';
import Home from '../pages/Home';
import HomeLayout from '../pages/HomeLayout';
import NotFound from '../component/error/NotFound';
import MovieHome from '../pages/movie/MovieHome';
import MovieDetail from '../pages/movie/MovieDetail';
import MovieList from '../pages/movie/MovieList';
import Login from '../pages/login/Login';
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      }, 
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/movie',
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: <MovieHome />,
          },

          {
            path: "list",
            element: <MovieList />
          },
          {
            path: ":movieId",
            element: <MovieDetail />
          }
        ],
      },
    ],
  },
]);

export default router;
