import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { easing } from "maath";

function AnimateCamera() {
  const camera = useThree((state) => state.camera);
  const orbitControlsRef = useRef();
  useFrame((state, delta) => {
    easing.damp(state.camera.position, "x", -state.pointer.x * 4.5, 0.7, delta);
    easing.damp(state.camera.position, "y", -state.pointer.y * 2.5, 0.7, delta);
    if (orbitControlsRef.current) {
      orbitControlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={orbitControlsRef}
      target={[0, 0, 0]}
      dampingFactor={0.25}
      maxDistance={25}
      minDistance={20}
      enableRotate={false}
      enableZoom={false}
      enablePan={false}
      minPolarAngle={0.2}
      maxPolarAngle={1.7}
      makeDefault
    />
  );
}

export default AnimateCamera;
