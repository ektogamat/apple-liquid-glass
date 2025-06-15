import "./loadingScreen.css";
import { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { state } from "../../store";
import { useSnapshot } from "valtio";

export default function LoadingScreen() {
  const { progress } = useProgress();
  const { finishedMainLoading } = useSnapshot(state);
  const mainCanvas = document.getElementsByTagName("canvas");
  const [visibleButton, setVisibleButton] = useState(false);

  const progressRef = useRef();

  useEffect(() => {
    if (progressRef && progressRef.current)
      document.documentElement.style.setProperty(
        "--progress",
        Math.floor(progress)
      );

    if (progress === 100) {
      state.finishedMainLoading = true;
      mainCanvas[0].className = mainCanvas[0].className + " visible";
    }
  }, [progress]);

  return (
    <>
      {!finishedMainLoading && (
        <div
          className={`loader-wrapper ${
            finishedMainLoading ? "finished-loading" : ""
          }`}
        >
          <div className="main-loader" ref={progressRef}>
            <svg
              width="250"
              height="250"
              className="circular-progress"
              viewBox="0 0 250 250"
              opacity={visibleButton ? 0 : 1}
            >
              <circle cy={125} cx={125} r={121} className="bg"></circle>
              <circle cy={125} cx={125} r={121} className="fg"></circle>
            </svg>

            <img
              className="mantis-bg"
              src="/water.svg"
              width={60}
              draggable={false}
              style={{ position: "absolute" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
