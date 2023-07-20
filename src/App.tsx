// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import SearchBar from "./components/search-bar/SearchBar";
import BlogSearchList from "./components/BlogSearchList";
import BlogListing from "./components/BlogListing";
import FormCreateBlog from "./components/FormCreateBlog";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewBlog from "./components/view-blog/ViewBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchBar />,
  },
  {
    path: "/create-blog",
    element: <FormCreateBlog />,
  },
  {
    path: "/blog/view/:id",
    element: <ViewBlog />,
  },
  {
    path: "/search",
    element: <BlogSearchList />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
