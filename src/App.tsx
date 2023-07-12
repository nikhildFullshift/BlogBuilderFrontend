// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import SearchBar from './components/search-bar/SearchBar';
import BlogSearchList from './components/BlogSearchList';
import BlogListing from './components/BlogListing';
import FormCreateBlog from './components/FormCreateBlog';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchBar />,
  },
  {
    path: "/create-blog",
    element: <FormCreateBlog />,
  },
]);

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
      {/* <div className='search-bar-container'>
        <h1>GPS Blog Builder</h1>
        <SearchBar></SearchBar>
      </div> */}
      {/* <BlogSearchList></BlogSearchList>
      <BlogSearchList></BlogSearchList> */}
      {/* <BlogListing></BlogListing> */}
      {/* <FormCreateBlog></FormCreateBlog> */}

    </>
  )
}

export default App
