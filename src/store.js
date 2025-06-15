import { proxy } from "valtio";

const state = proxy({
  isMobile: window.innerWidth < 768,
  finishedLoadingAsset: false,
  hovered: false,
  showSettings: false,
  background: "video3",
  reflectivity: 0.45,
  isDragging: false,
  display: "clock",
});

export { state };
