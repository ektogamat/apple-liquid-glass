import { Center, Text3D, Text } from "@react-three/drei";
import { useState, useEffect, useRef } from "react";
import { useSnapshot } from "valtio";
import { state } from "../store";

export default function Clock() {
  const { isMobile } = useSnapshot(state);

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
    <>
      <Center key={time} position={[0, isMobile ? 0.3 : 0.2, 0]}>
        <Text3D
          size={isMobile ? 0.7 : 1.2}
          letterSpacing={-0.005}
          height={0.05}
          curveSegments={24}
          bevelEnabled
          bevelSize={isMobile ? 0.012 : 0.015}
          bevelSegments={6}
          bevelThickness={0.03}
          font={"/fonts/Morganite_Medium.json"}
        >
          {time}
          <meshPhysicalMaterial
            color="white"
            metalness={0}
            roughness={0.28}
            transmission
            ior={1.2}
            thickness={1.2}
            sheenColor={"white"}
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
  );
}
