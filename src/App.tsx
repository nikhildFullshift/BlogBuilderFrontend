// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import SearchBar from "./components/search-bar/SearchBar";
import BlogSearchList from "./components/BlogSearchList";
import FormCreateBlog from "./components/FormCreateBlog";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewBlog from "./components/view-blog/ViewBlog";
import { createContext, useEffect, useReducer, useState } from "react";
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
import EditReview from "./components/edit-review/EditReview";
import NavBar from "./components/nav-bar/NavBar";
import Footer from "./components/footer/Footer";

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
    path: "/blog/create/:blogId/versionId?/:versionId?",
    element: <EditReview />,
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
    path: "/blog/review/:versionId",
    element: <ReviewAnnotations />,
  },
]);

function App() {
  const [state, dispatch] = useReducer(blog_reducer, initalState);
  const [annotationState, dispatchAnnotation] = useReducer(
    annotation_reducer,
    initialAnnotationState
  );
  const [dark, setDark] = useState(null);

  useEffect(() => {
    //fetch USER DETAILS here
    dispatch({
      type: "UPDATE_USER_DETAILS",
      payload: { role: "LEAD", userId: 123 },
    });
    //fetch color theme
    if(localStorage.getItem("theme") === "light"){
      setDark(false);
    }
    else {
      setDark(true);
      localStorage.setItem("theme", "dark");
    }
  }, []);
  return (
    <Blogcontext.Provider value={{ state, dispatch }}>
      <AnnotationContext.Provider
        value={{ annotationState, dispatchAnnotation }}
      >
        <div className={dark?"dark-theme":"light-theme" }>
        <NavBar dark={dark} setDark={setDark} />
        <div className="content-wrapper" >
          <RouterProvider router={router} />
        </div>
        <Footer /></div>
      </AnnotationContext.Provider>
    </Blogcontext.Provider>
  );
}

export default App;
