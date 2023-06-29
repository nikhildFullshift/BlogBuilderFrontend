// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import BlogSearchList from './components/BlogSearchList'
import BlogListing from './components/BlogListing'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className='search-bar-container'>
        <h1>GPS Blog Builder</h1>
        <SearchBar></SearchBar>
      </div>
      {/* <BlogSearchList></BlogSearchList>
      <BlogSearchList></BlogSearchList> */}
      <BlogListing></BlogListing>

    </>
  )
}

export default App
