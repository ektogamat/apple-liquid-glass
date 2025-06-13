import { proxy } from "valtio";

const state = proxy({
  isMobile: window.innerWidth < 768,
  finishedLoadingAsset: false,
  hovered: false,
  showSettings: false,
});

export { state };
