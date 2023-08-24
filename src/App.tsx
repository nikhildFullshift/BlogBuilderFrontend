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
import {
  AnnotationContextProps,
  BlogContextProps,
} from "./utils/globalState.dto";
import BlogListing from "./components/BlogListing";
import ReviewAnnotations from "./components/review-with-annotations/ReviewAnnotations";
import {
  annotation_reducer,
  initialAnnotationState,
} from "./reducers/annotationReducer";

export const Blogcontext = createContext({} as BlogContextProps);
export const AnnotationContext = createContext({} as AnnotationContextProps);

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchBar />,
  },
  {
    path: "/blog/create",
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
  {
    path: "/blog/review/:version",
    element: <ReviewAnnotations />,
  },
]);

function App() {
  const [state, dispatch] = useReducer(blog_reducer, initalState);
  const [annotationState, dispatchAnnotation] = useReducer(
    annotation_reducer,
    initialAnnotationState
  );
  return (
    <Blogcontext.Provider value={{ state, dispatch }}>
      <AnnotationContext.Provider
        value={{ annotationState, dispatchAnnotation }}
      >
        <RouterProvider router={router} />
      </AnnotationContext.Provider>
    </Blogcontext.Provider>
  );
}

export default App;
