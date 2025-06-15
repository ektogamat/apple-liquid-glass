import {
  Circle,
  MeshDiscardMaterial,
  Plane,
  Text,
  useTexture,
} from "@react-three/drei";
import { useSnapshot } from "valtio";
import { state } from "../store";

export default function ConfigIcon() {
  const texture = useTexture("/config-icon.png");

  const { hovered, isMobile, showSettings } = useSnapshot(state);

  return (
    <group position={[0, isMobile ? 0.15 : 0, 0.0]}>
      <Plane
        args={[0.6, 0.35]}
        onPointerEnter={() => (state.hovered = true)}
        onPointerLeave={() => (state.hovered = false)}
        onClick={() => (state.showSettings = !state.showSettings)}
        position={[0, -0.9, 0]}
      >
        <MeshDiscardMaterial />
      </Plane>
      <Circle
        args={[0.1, 8, 8]}
        position={[hovered ? -0.2 : 0, -0.9, 0]}
        visible={!showSettings}
      >
        <meshBasicMaterial map={texture} transparent />
      </Circle>

      <Text
        fontSize={0.1}
        position={showSettings ? [0, -0.915, 0] : [0.03, -0.915, 0]}
        color="white"
        font="fonts/Morganite-Medium.ttf"
        visible={hovered || showSettings}
      >
        {showSettings ? "CLOSE SETTINGS" : "OPEN SETTINGS"}
      </Text>
    </group>
  );
}
