import React from "react";
import "./SearchVideo.css";
import PlayVideo from "../../Components/PlayVideo/PlayVideo";
import { useParams } from "react-router-dom";

function SearchVideo({ theme }) {
  const { videoId } = useParams();
  console.log(videoId);
  return (
    <div>
      <div className={`play-full-container ${theme ? "dark" : "white"}`}>
        <PlayVideo videoId={videoId} theme={theme} />
      </div>
    </div>
  );
}

export default SearchVideo;
