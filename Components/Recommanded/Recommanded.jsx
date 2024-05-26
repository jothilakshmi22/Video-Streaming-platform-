import React, { useEffect, useState } from "react";
import "./Recommanded.css";
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import { Link } from "react-router-dom";

function Recommanded({ categoryId, theme }) {
  const [RecomApiData, setRecomApiData] = useState([]);
  const [recomLoader, setRecomLoader] = useState(true);

  const fetchData = async () => {
    //fetching popular video data
    const RecommandedvideoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`;
    await fetch(RecommandedvideoDetails_url)
      .then((res) => res.json())
      .then((data) => setRecomApiData(data.items));
  };

  useEffect(() => {
    fetchData();
    setRecomLoader(false);
  }, []);

  return (
    <div className={`recommanded ${theme ? "dark" : "white"}`}>
      {RecomApiData.map((item, index) => {
        return (
          <>
            {recomLoader ? (
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "100%",
                    background: "rgba(128, 128, 128, 0.185)",
                    height: "100px",
                    marginBottom: "5px",
                  }}
                ></div>
              </div>
            ) : (
              <Link
                to={`/video/${item.snippet.categoryId}/${item.id}`}
                key={index}
                className="side-video-list"
              >
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <div className="video-info">
                  <h4> {item.snippet.title} </h4>
                  <p> {item.snippet.channelTitle} </p>
                  <p> {value_converter(item.statistics.viewCount)} Views </p>
                </div>
              </Link>
            )}
          </>
        );
      })}
    </div>
  );
}

export default Recommanded;
