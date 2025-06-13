import { Capsule, MeshTransmissionMaterial, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useControls } from "leva";
import { useSnapshot } from "valtio";
import { state } from "../store";

export default function CustomCursor() {
  const cursorRef = useRef();
  const [clicked, setClicked] = useState(false);
  const { hovered } = useSnapshot(state);

  useFrame((state, delta) => {
    cursorRef.current.position.set(
      state.pointer.x * (state.viewport.width / 2),
      state.pointer.y * (state.viewport.height / 2),
      0.1
    );
  });

  const { reflectivity, materialThickness, meshThickness } = useControls({
    reflectivity: {
      value: 0.9,
      min: 0,
      max: 1,
    },
    materialThickness: {
      value: 0.7,
      min: 0,
      max: 1,
    },
    meshThickness: {
      value: 0.12,
      min: 0.06,
      max: 0.4,
      step: 0.01,
    },
  });

  useEffect(() => {
    if (clicked || hovered) {
      gsap.to(cursorRef.current.scale, {
        x: 1.7,
        y: 1.7,
        z: meshThickness,
        duration: 1.5,
        ease: "elastic(1, 0.3)",
      });
    } else {
      gsap.to(cursorRef.current.scale, {
        x: 1,
        y: 1,
        z: 0.5,
        duration: 1.5,
        ease: "elastic(1, 0.3)",
      });
    }
    document.body.style.cursor = "none";
  }, [clicked, hovered]);

  useEffect(() => {
    window.addEventListener("pointerdown", () => {
      setClicked(true);
    });
    window.addEventListener("pointerup", () => {
      setClicked(false);
    });
    return () => {
      window.removeEventListener("pointerdown", () => {});
      window.removeEventListener("pointerup", () => {});
    };
  }, []);

  const material = useMemo(() => {
    return (
      <MeshTransmissionMaterial
        color="white"
        metalness={0}
        roughness={0.01}
        ior={1.8}
        thickness={materialThickness}
        reflectivity={reflectivity}
        chromaticAberration={0.1}
        clearcoat={0.4}
        resolution={1024}
        clearcoatRoughness={0.05}
        iridescence={0.9}
        iridescenceIOR={0.1}
        iridescenceThicknessRange={[0, 140]}
        samples={4}
      />
    );
  }, [reflectivity, materialThickness]);

  return (
    <group ref={cursorRef}>
      <Capsule
        scale={[1, 1, 1]}
        args={[0.1, 0.3, 64, 64]}
        position={[0, 0, 0.1]}
        rotation={[0, 0, -Math.PI / 2]}
        visible={clicked || hovered}
      >
        {material}
      </Capsule>

      <Sphere
        scale={[1, 1, 0.12]}
        args={[0.1, 64, 64]}
        position={[0, 0, 0.1]}
        visible={!clicked && !hovered}
      >
        {material}
      </Sphere>
    </group>
  );
}
