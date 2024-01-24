import React, { useEffect, useRef } from 'react'
import "./SearchPage.css"
import { SeriesGrid, useWindowSize } from './HomePage'
import { useState } from 'react'
import axios from 'axios'
import { Movie, Series } from './MediaClasses'



export const SearchPage = () => {
  const [width, height] = useWindowSize();
  const [contentType, setContentType] = useState("movie");
  const [Page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState([]);
  const [maxPage,setmaxPage] = useState(1)
  const queryRef = useRef();
  const [currQ,setcurrQ]=useState("")
  // const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
  }, [searchResults]);



  const handlePageChange = async (newPage) => {
    const response = await axios.get(`http://localhost:3001/search/?content=${contentType}&query=${currQ}&page=${newPage}`);
    const data = response.data.results.map(item => 
      contentType === "movie" 
        ? new Movie(item.title, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count, item.backdrop_path)
        : new Series(item.name, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count, item.backdrop_path)
    );
    setPage(newPage);
    setmaxPage(response.data.total_pages);
    setSearchResults(data);
  };


  const handleSearch = async () => {
    console.log("handleSearch called");
    const query = queryRef.current?.value;
    if (!query) return;
  
    try {
      if (currQ !== query) {
        setPage(1);
        const response = await axios.get(`http://localhost:3001/search/?content=${contentType}&query=${query}&page=1`);
        const data = response.data.results.map(item => 
          contentType === "movie" 
            ? new Movie(item.title, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count, item.backdrop_path)
            : new Series(item.name, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count, item.backdrop_path)
        );
        setcurrQ(query);
        setmaxPage(response.data.total_pages);
        setSearchResults(data);
      } else {
        const response = await axios.get(`http://localhost:3001/search/?content=${contentType}&query=${query}&page=${Page}`);
        const data = response.data.results.map(item => 
          contentType === "movie" 
            ? new Movie(item.title, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count, item.backdrop_path)
            : new Series(item.name, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count, item.backdrop_path)
        );
        setPage(response.data.page);
        setmaxPage(response.data.total_pages);
        setSearchResults(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className='searchpage'>
              <div className="searchtext">
    <input type="text" className='query' placeholder='Search' ref={queryRef}
      onKeyDown={(event) => {
        console.log("Key pressed:", event.key);
        if (event.key === 'Enter') {
    
          event.preventDefault();
          handleSearch()
        }
      }}
    />
    <button type="button" class="btn btn-primary submitquery" onClick={handleSearch} 
  onKeyDown={(event) => {
    console.log("Key pressed:", event.key);
    if (event.key === 'Enter') {

      event.preventDefault();
      handleSearch()
    }
  }}
    >
    <svg xmlns="http://www.w3.org/2000/svg" height="17" width="17" viewBox="0 0 512 512">
    <path fill="#FFFFFF" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>                        </button>
</div>

<div className='select'>

<div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked={contentType === "movie"} onChange={() => setContentType("movie")} />
  <label class="btn btn-outline-primary" for="btnradio1">Movies</label>

  <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" checked={contentType === "TV"} onChange={() => setContentType("TV")}/>
  <label class="btn btn-outline-primary" for="btnradio2">Series</label>
</div>

</div>


<div className="searchresults">
<div className="title" style={{fontSize:`${(width/height)<=0.6?"20px":"35px"}`}}>
      {/* {(queryRef.current?.value)?"":`Results for "${queryRef.current.value}"`} */}
      {queryRef.current?.value ? `Results for "${queryRef.current.value}"` : ""}

      </div>

  <SeriesGrid seriesData={searchResults}/>
</div>


{/* <div className="mvpages">
  <button onClick={() => {
  if(Page>1){
  setPage(Page-1)
  handleSearch()
  }
  }} disabled={Page <= 1}>Previous</button>
  <span>Page {Page} of {maxPage}</span>
  <button onClick={() => {
    if(Page<maxPage){
  setPage(Page+1)
  handleSearch()
  }
  }} disabled={Page >= maxPage}>Next</button>
</div> */}

<div className="mvpages">

{
  queryRef.current?.value ===""?
  <div ></div>
  :
  <nav aria-label="Page navigation example" className="dark-mode">
  <ul className="pagination justify-content-center">
    {/* Previous Page */}
    <li className={`page-item ${Page <= 1 ? 'disabled' : ''}`}>
      <a className="page-link" href="#" onClick={(e) => {
        e.preventDefault();
        if (Page > 1) handlePageChange(Page - 1);
      }}>Previous</a>
    </li>

    {/* First Page */}
    {Page > 1 && (
      <li className="page-item">
        <a className="page-link" href="#" onClick={(e) => {
          e.preventDefault();
          handlePageChange(1);
        }}>1</a>
      </li>
    )}

    {/* Ellipsis before current page */}
    {Page > 3 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    {/* Page before current page */}
    {Page > 2 && (
      <li className="page-item">
        <a className="page-link" href="#" onClick={(e) => {
          e.preventDefault();
          handlePageChange(Page - 1);
        }}>{Page - 1}</a>
      </li>
    )}

    {/* Current Page */}
    <li className="page-item active">
      <span className="page-link">{Page}</span>
    </li>

    {/* Page after current page */}
    {Page < maxPage - 1 && (
      <li className="page-item">
        <a className="page-link" href="#" onClick={(e) => {
          e.preventDefault();
          handlePageChange(Page + 1);
        }}>{Page + 1}</a>
      </li>
    )}

    {/* Ellipsis after current page */}
    {Page < maxPage - 2 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    {/* Last Page */}
    {Page < maxPage && (
      <li className="page-item">
        <a className="page-link" href="#" onClick={(e) => {
          e.preventDefault();
          handlePageChange(maxPage);
        }}>{maxPage}</a>
      </li>
    )}

    {/* Next Page */}
    <li className={`page-item ${Page >= maxPage ? 'disabled' : ''}`}>
      <a className="page-link" href="#" onClick={(e) => {
        e.preventDefault();
        if (Page < maxPage) handlePageChange(Page + 1);
      }}>Next</a>
    </li>
  </ul>
</nav>

}

</div>


    </div>
  )
}
