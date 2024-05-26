import React from "react";
import { Link } from "react-router-dom";
import "./Search.css";
function Search({ searchData, theme }) {
  return (
    <div
      className={`search-feed ${theme ? "dark" : "white"}
    `}
    >
      {searchData.map((item, index) => {
        return (
          <Link
            key={index}
            to={`/video/search/${item.id.videoId}`}
            className="card"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="card-body">
              <h2> {item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              {/* <p>{moment(item.snippet.puslishedTime).fromNow()}</p> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Search;
