import React, { useState, useEffect } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY } from "../../data";
import moment from "moment";
import { value_converter } from "../../data";
import { useParams } from "react-router-dom";

function PlayVideo({ theme }) {
  const [emdedLoader, setEmdedLoader] = useState(true);
  const { videoId } = useParams();

  //get video details
  const [apiData, setApiData] = useState(null);

  const [channelData, SetchannelData] = useState(null);
  const [commentsData, setCommentsData] = useState([]);

  const fetchVideoData = async () => {
    //fetching video data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  const fetchChannelData = async () => {
    //fetching channel data
    // const channelDetails_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    // await fetch(channelDetails_url)
    //   .then((res) => res.json())
    //   .then((data) => SetchannelData(data.items[0])); //[{}]
    //fetching comments data
    const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url)
      .then((res) => res.json())
      .then((data) => setCommentsData(data.items)); //[{}]
    setEmdedLoader(false);
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchChannelData();
  }, [apiData]);

  return (
    <div className={`play-video ${theme ? "dark" : "white"}`}>
      {emdedLoader ? (
        <div className="iframe-loader"> </div>
      ) : (
        <>
          <iframe
            title="video"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </>
      )}

      <h3>
        {apiData ? apiData.snippet.title : <div className="title-loader"></div>}
      </h3>
      <div className="play-video-info">
        <p>
          {apiData ? value_converter(apiData.statistics.viewCount) : "10k"}
          &bull;
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? value_converter(apiData.statistics.likeCount) : 0}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        {/* <img
          src={
            channelData ? channelData.snippet.thumbnails.default.url : "wait"
          }
          alt=""
        /> */}
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          {/* <span>
            {channelData
              ? value_converter(channelData.statistics.subscriberCount)
              : "wait"}
            &nbsp; subscribers
          </span> */}
        </div>
        <button>Subscribe</button>
      </div>

      <div className="video-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : "Description here"}
        </p>
        <hr />
        <h4>
          {apiData ? value_converter(apiData.statistics.commentCount) : 100}{" "}
          comments
        </h4>
        {commentsData &&
          commentsData.map((item, index) => {
            return (
              <div className="comment" key={index}>
                <img
                  src={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  alt=""
                />
                <div>
                  <h3 style={{ fontSize: "16px" }}>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}
                    <span> 1 days ago</span>
                  </h3>
                  <p> {item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>
                      {value_converter(
                        item.snippet.topLevelComment.snippet.likeCount
                      )}
                    </span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PlayVideo;
