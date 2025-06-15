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
  const { hovered, reflectivity, isDragging } = useSnapshot(state);

  useFrame((state, delta) => {
    cursorRef.current.position.set(
      state.pointer.x * (state.viewport.width / 2),
      state.pointer.y * (state.viewport.height / 2),
      0.1
    );
  });

  useEffect(() => {
    if (clicked || hovered) {
      if (isDragging) {
        gsap.to(cursorRef.current.scale, {
          x: 1,
          y: 1,
          z: 0.1,
          duration: 1.5,
          ease: "elastic(1, 0.3)",
        });
      } else {
        gsap.to(cursorRef.current.scale, {
          x: 1.7,
          y: 1.7,
          z: 0.2,
          duration: 1.5,
          ease: "elastic(1, 0.3)",
        });
      }
    } else {
      gsap.to(cursorRef.current.scale, {
        x: 1,
        y: 1,
        z: 0.75,
        duration: 1.5,
        ease: "elastic(1, 0.3)",
      });
    }
    document.body.style.cursor = "none";
  }, [clicked, hovered, isDragging]);

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
        thickness={reflectivity}
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
  }, [reflectivity]);

  return (
    <group ref={cursorRef}>
      <Capsule
        scale={[1, 1, 1]}
        args={isDragging ? [0.08, 0.1, 64, 64] : [0.1, 0.3, 64, 64]}
        position={[0, 0, 0.1]}
        rotation={[0, 0, -Math.PI / 2]}
        visible={clicked || hovered || isDragging}
      >
        {material}
      </Capsule>

      <Sphere
        scale={[1, 1, 0.12]}
        args={[0.1, 64, 64]}
        position={[0, 0, 0.1]}
        visible={!clicked && !hovered && !isDragging}
      >
        {material}
      </Sphere>
    </group>
  );
}
