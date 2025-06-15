import {
  Billboard,
  Circle,
  Center,
  Plane,
  Sphere,
  Text,
  useTexture,
  MeshDiscardMaterial,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import ConfigIcon from "./ConfigIcon";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

export default function Settings() {
  const { showSettings } = useSnapshot(state);

  return (
    <Billboard>
      {showSettings && (
        <>
          {/* BACKGROUND OPTIONS FOR REAL */}
          <BackgroundOptions />

          {/* REFLECITIVI SLIDER */}
          <ReflectivitySlider />

          {/* BACKGROUND */}
          <Plane args={[20, 20]} position={[0, 0, -0.5]}>
            <meshBasicMaterial color="black" transparent opacity={0.5} />
          </Plane>
        </>
      )}

      <ConfigIcon />
    </Billboard>
  );
}

function BackgroundOptions() {
  const gridTexture = useTexture("/grid.png");
  const clockTexture = useTexture("/clock.png");
  const { isMobile, display } = useSnapshot(state);

  const buttonsMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "white",
      metalness: 0,
      roughness: 0.28,
      transmission: true,
      ior: 1.2,
      thickness: 0.5,
      dispersion: 12,
    });
  }, []);

  // Reusable button component
  const BackgroundButton = ({ number, position, onClick }) => (
    <Sphere
      args={[0.1, 32, 32]}
      scale={[1, 1, 0.35]}
      position={position}
      material={buttonsMaterial}
      onClick={onClick}
    >
      <Text
        anchorX="center"
        anchorY="middle"
        font="fonts/Morganite-Medium.ttf"
        position={[0, 0, 0.15]}
        fontSize={0.1}
      >
        {number}
      </Text>
    </Sphere>
  );

  // Calculate positions based on mobile state
  const getButtonPositions = () => {
    // Two rows for mobile
    return [
      [-0.45, -0.5, -0.1], // 1
      [-0.2, -0.5, -0.1], // 2
      [0.05, -0.5, -0.1], // 3
      [-0.45, -0.25, -0.1], // 4
      [-0.2, -0.25, -0.1], // 5
      [0.05, -0.25, -0.1], // 6
    ];
  };

  const buttonPositions = getButtonPositions();

  return (
    <>
      <group position={isMobile ? [0, 0.2, 0] : [0, 0.2, 0]}>
        <Text
          fontSize={0.1}
          position={[0, -0.25, -0.1]}
          letterSpacing={0.02}
          font="fonts/Morganite-Medium.ttf"
        >
          BACKGROUND OPTIONS
        </Text>
        <Center position={[0.45, -0.15, 0]}>
          <BackgroundButton
            number="1"
            position={buttonPositions[3]}
            onClick={() => (state.background = "bg1")}
          />
          <BackgroundButton
            number="2"
            position={buttonPositions[4]}
            onClick={() => (state.background = "bg2")}
          />
          <BackgroundButton
            number="3"
            position={buttonPositions[5]}
            onClick={() => (state.background = "bg3")}
          />
          <BackgroundButton
            number="4"
            position={buttonPositions[0]}
            onClick={() => (state.background = "video1")}
          />
          <BackgroundButton
            number="5"
            position={buttonPositions[1]}
            onClick={() => (state.background = "video2")}
          />
          <BackgroundButton
            number="6"
            position={buttonPositions[2]}
            onClick={() => (state.background = "video3")}
          />
        </Center>
      </group>

      <group position={isMobile ? [0, 0.2, 0] : [0, 0.25, 0]}>
        <Text
          fontSize={0.1}
          letterSpacing={0.02}
          position={[0, 0.2, -0.1]}
          font="fonts/Morganite-Medium.ttf"
        >
          DISPLAY OPTIONS
        </Text>

        {/* GRID */}
        <Sphere
          args={[0.1, 32, 32]}
          scale={[1, 1, 0.35]}
          position={[-0.125, 0, -0.1]}
          material={buttonsMaterial}
          onClick={() => (state.display = "grid")}
        >
          <Circle args={[0.06, 8]} position={[0, 0, 0.15]}>
            <meshBasicMaterial
              map={gridTexture}
              transparent
              opacity={display === "grid" ? 1 : 0.3}
            />
          </Circle>
        </Sphere>

        {/* CLOCK */}
        <Sphere
          args={[0.1, 32, 32]}
          scale={[1, 1, 0.35]}
          position={[0.125, 0, -0.1]}
          material={buttonsMaterial}
          onClick={() => (state.display = "clock")}
        >
          <Circle args={[0.06, 8]} position={[0, 0, 0.15]}>
            <meshBasicMaterial
              map={clockTexture}
              transparent
              opacity={display === "clock" ? 1 : 0.3}
            />
          </Circle>
        </Sphere>
      </group>
    </>
  );
}

function ReflectivitySlider() {
  const { reflectivity, isMobile } = useSnapshot(state);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef();
  const planeRef = useRef();
  const circleRef = useRef();

  // Handle mouse/touch events for the slider
  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    state.isDragging = true;
    const intersection = e.point;

    const newValue = Math.max(0, Math.min(1, intersection.x + 0.5));
    state.reflectivity = newValue;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    state.isDragging = false;
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    // Get the intersection point in local space
    const intersection = e.point;
    // Convert to a value between 0 and 1
    const newValue = Math.max(0, Math.min(1, intersection.x + 0.5));

    // Update state
    state.reflectivity = newValue;
  };

  useFrame(() => {
    if (sliderRef.current && planeRef.current) {
      // Update slider position based on reflectivity value
      planeRef.current.scale.x = reflectivity;
      // Adjust position to grow from left
      planeRef.current.position.x = (reflectivity - 1) * 0.5;
      // Position the circle at the end of the slider
      circleRef.current.position.x =
        (reflectivity - 1) * 0.5 + reflectivity * 0.5;
    }
  });

  return (
    <group position={isMobile ? [0, 0.2, -0.1] : [0, 0.2, -0.1]}>
      <Text
        fontSize={0.1}
        letterSpacing={0.02}
        position={[0, 0.625, -0.1]}
        font="fonts/Morganite-Medium.ttf"
      >
        CURSOR GLASS THICKNESS: {reflectivity.toFixed(2)}
      </Text>
      <group position={[0, 0.5, 0]}>
        {/* SLIDER */}
        <Plane
          args={[1.2, 0.2]}
          ref={sliderRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerUp}
        >
          <MeshDiscardMaterial />
        </Plane>

        {/* Background track */}
        <Plane
          args={[1, 0.05]}
          ref={sliderRef}
          renderOrder={-1}
          position={[0, 0, -0.3]}
        >
          <meshBasicMaterial color="white" opacity={0.3} transparent />
        </Plane>
        {/* Slider handle */}
        <Plane
          ref={planeRef}
          args={[1, 0.05]}
          scale={[reflectivity, 1, 1]}
          position={[(reflectivity - 1) * 0.5, 0, -0.2]}
        >
          <meshBasicMaterial color="#cccccc" />
        </Plane>
        <Circle
          ref={circleRef}
          args={[0.05, 32]}
          position={[0, 0, -0.15]}
          visible={!isDragging}
        >
          <meshBasicMaterial color="white" />
        </Circle>
      </group>
    </group>
  );
}
