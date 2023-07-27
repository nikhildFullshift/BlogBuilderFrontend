// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import SearchBar from "./components/search-bar/SearchBar";
import BlogSearchList from "./components/BlogSearchList";
import FormCreateBlog from "./components/FormCreateBlog";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewBlog from "./components/view-blog/ViewBlog";
import { createContext, useReducer } from "react";
import { blog_reducer, initalState } from "./reducers/blogReducer";
import { BlogContextProps } from "./utils/blogState.dto";
import BlogListing from "./components/BlogListing";

export const Blogcontext = createContext({} as BlogContextProps);

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
  {
    path: "/blog/list",
    element: <BlogListing />,
  },
]);

function App() {
  const [state, dispatch] = useReducer(blog_reducer, initalState);
  return (
    <Blogcontext.Provider value={{ state, dispatch }}>
      <RouterProvider router={router} />
    </Blogcontext.Provider>
  );
}

export default App;
