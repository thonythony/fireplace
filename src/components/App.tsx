import React, { useCallback, useEffect, useState } from "react";
import { application } from "tizen-common-web";

const ALL_VIDEOS = [
  "assets/Fireplace - 19166.mp4",
  "assets/Fireplace - 7070.mp4",
  "assets/Fireplace - 1971.mp4",
  "assets/Fire - 29316.mp4",
  "assets/Fire - 25445.mp4",
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(ALL_VIDEOS[index]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let newIndex: number;
      switch (event.code) {
        case "ArrowRight":
          newIndex = index + 1;
          if (newIndex > ALL_VIDEOS.length - 1) {
            newIndex = 0;
          }
          break;
        case "ArrowLeft":
          newIndex = index - 1;
          if (index - 1 < 0) {
            newIndex = ALL_VIDEOS.length - 1;
          }
          break;
        case "Escape":
          application.getCurrentApplication().exit();
          return;
        default:
          return;
      }

      setIndex(newIndex);
      setCurrentVideo(ALL_VIDEOS[newIndex]);
    },
    [index, currentVideo]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="container">
      <video src={currentVideo} autoPlay loop></video>
    </div>
  );
}
