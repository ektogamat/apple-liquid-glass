import React, { Suspense } from "react";
import { Environment } from "@react-three/drei";
import ConfigIcon from "./ConfigIcon";

function Scene() {
  return (
    <>
      <Suspense fallback={null}>
        <Environment preset={"warehouse"} environmentIntensity={0.25} />
      </Suspense>
      <ConfigIcon />
    </>
  );
}

export default Scene;
