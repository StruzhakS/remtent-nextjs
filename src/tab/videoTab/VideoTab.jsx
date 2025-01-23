import ListOfVideo from "@/components/videoTutorials/ListOfVideo";
import React, { useEffect, useState } from "react";
// import { HelmetWrapper } from "../HelmetWrapper";

const YOU_TUBE_APIKEY = process.env.NEXT_PUBLIC_YOU_TUBE_APIKEY;
// const CHANEL_ID = process.env.REACT_APP_CHANNEL_ID;

const VideoTab = () => {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    try {
      const getVideoByChanelId = async () => {
        const videoList = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=PLiicsAp4Y6SoSki4tcgiuZlNN2FBAqxXJ&maxResults=10&key=${YOU_TUBE_APIKEY}`
        );

        const { items } = await videoList.json();
        setVideos(items);
      };

      getVideoByChanelId();
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    }
  }, []);

  return (
    <>
      {/* <HelmetWrapper
        titleKey="video_tutorials_page_title"
        descriptionKey="video_tutorials_page_description"
      /> */}
      <ListOfVideo videos={videos} />
    </>
  );
};

export default VideoTab;
