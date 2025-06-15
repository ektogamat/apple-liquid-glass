import React, { Suspense } from "react";
import { Environment } from "@react-three/drei";

function Scene() {
  return (
    <>
      <Suspense fallback={null}>
        <Environment preset={"warehouse"} environmentIntensity={0.25} />
      </Suspense>
    </>
  );
}

export default Scene;
