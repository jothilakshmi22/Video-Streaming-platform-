import React from "react";
import "./Video.css";
import PlayVideo from "../../Components/PlayVideo/PlayVideo";
import Recommanded from "../../Components/Recommanded/Recommanded";
import { useParams } from "react-router-dom";

function Video({ theme }) {
  const { videoId, categoryId } = useParams();
  return (
    <div className={`play-container ${theme ? "dark" : "white"}`}>
      <PlayVideo videoId={videoId} theme={theme} />
      <Recommanded categoryId={categoryId} theme={theme} />
    </div>
  );
}

export default Video;
