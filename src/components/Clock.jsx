import { Center, Text3D, Text, Image, Billboard } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { useTexture } from "@react-three/drei";

export default function Clock() {
  const { isMobile, showSettings, display } = useSnapshot(state);

  const formatTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [time, setTime] = useState(formatTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <group visible={!showSettings}>
      {display === "grid" && <GridDisplay />}
      {display === "clock" && (
        <>
          {" "}
          <Center key={time} position={[0, isMobile ? 0.3 : 0.2, 0]}>
            <Text3D
              size={isMobile ? 0.7 : 1.2}
              letterSpacing={-0.005}
              height={0.08}
              // curveSegments={24}
              bevelEnabled
              bevelSize={isMobile ? 0.012 : 0.016}
              bevelSegments={8}
              bevelThickness={0.03}
              font={"/fonts/Morganite_Medium.json"}
            >
              {time}
              <meshPhysicalMaterial
                color="white"
                roughness={0.23}
                transmission
                ior={1.8}
                thickness={2}
                reflectivity={0.4}
                clearcoat={0.2}
                clearcoatRoughness={0.1}
                iridescence={1}
                iridescenceIOR={0.9}
                iridescenceThicknessRange={[233, 434]}
                dispersion={12}
              />
            </Text3D>
          </Center>
          <Center
            position={isMobile ? [0.17, 0.2, 0.05] : [0.2, -0.1, 0.05]}
            key={time + "1"}
          >
            <Text
              fontSize={isMobile ? 0.2 : 0.2}
              anchorX="left"
              anchorY="middle"
              font="fonts/Morganite-ExtraLight.ttf"
            >
              APPLE LIQUID GLASS THREEJS
            </Text>

            <Text
              position={[0.2, 0.15, 0]}
              fontSize={isMobile ? 0.08 : 0.08}
              anchorX="left"
              anchorY="middle"
              font="fonts/Morganite-Medium.ttf"
            >
              CREATED BY ANDERSON MANCINI
            </Text>
          </Center>
        </>
      )}
    </group>
  );
}

function GridDisplay() {
  const { isMobile } = useSnapshot(state);
  return (
    <Billboard>
      <Image
        url="/icons.png"
        transparent
        scale={[2.8, 1.55, 1]}
        position={isMobile ? [0, 0.25, -0.1] : [0, 0.2, -0.1]}
        toneMapped={false}
      />
    </Billboard>
  );
}
