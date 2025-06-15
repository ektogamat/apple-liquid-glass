import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./components/Scene";
import AnimateCamera from "./components/AnimateCamera";
import Clock from "./components/Clock";
import BackgroundImageCover from "./components/BackgroundImageCover";
import DynamicLights from "./components/DynamicLights";
import CustomCursor from "./components/CustomCursor";
import * as THREE from "three";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Settings from "./components/Settings";

function App() {
  return (
    <div className="main-container">
      <LoadingScreen />
      <Canvas {...canvasProps}>
        <Suspense fallback={null}>
          <Clock />
          <Settings />
          <Scene />
          <CustomCursor />
          <AnimateCamera />
          <DynamicLights />
          <BackgroundImageCover />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;

const canvasProps = {
  gl: {
    antialias: true,
    powerPreference: "high-performance",
    toneMappingExposure: 1.5,
    stencil: false,
    alpha: false,
    toneMapping: THREE.NeutralToneMapping,
  },
  camera: { near: 0.01, far: 1000, fov: 5, position: [0, 0, 25] },
  dpr: 1,
};
