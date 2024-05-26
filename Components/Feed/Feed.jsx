import React, { useState, useEffect } from "react";
import "./Feed.css";
import { Link } from "react-router-dom";
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import moment from "moment";
import Loader from "../Loader/Loader";

function Feed({ category, theme, setSearchData }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const fetchData = async () => {
    //fetching category based video data
    setLoader(true);
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    await fetch(videoList_url)
      .then((res) => res.json())
      .then((data) => {
        setData(data.items);
        // console.log(data.items);
      });
    setLoader(false);
    setSearchData("");
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div
      className={`feed ${theme ? "dark" : "white"} ${
        loader ? "height-vh" : " "
      }`}
    >
      {data.map((item, index) => {
        return (
          <>
            {loader ? (
              <>
                <Loader />
              </>
            ) : (
              <Link
                key={index}
                to={`video/${item.snippet.categoryId}/${item.id}`}
                className="card"
              >
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <div className="card-body">
                  <h2> {item.snippet.title}</h2>
                  <h3>{item.snippet.channelTitle}</h3>
                  <p>
                    {value_converter(item.statistics.viewCount)} &bull; &nbsp;
                    {moment(item.snippet.publishedAt).fromNow()}
                  </p>
                </div>
              </Link>
            )}
          </>
        );
      })}
    </div>
  );
}

export default Feed;
