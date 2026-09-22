"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";
import * as THREE from "three";

function SoftBow({ color }: { color: string }) {
  return (
    <group position={[0, 0.56, 0.02]}>
      <mesh castShadow>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh
        position={[-0.17, 0.06, 0]}
        rotation={[1.2, 0, 0.6]}
        scale={[1, 0.75, 0.4]}
        castShadow
      >
        <torusGeometry args={[0.14, 0.05, 24, 48]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh
        position={[0.17, 0.06, 0]}
        rotation={[1.2, 0, -0.6]}
        scale={[1, 0.75, 0.4]}
        castShadow
      >
        <torusGeometry args={[0.14, 0.05, 24, 48]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[-0.09, -0.15, 0.03]} rotation={[0.5, 0, 0.45]} castShadow>
        <boxGeometry args={[0.05, 0.24, 0.02]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
      <mesh position={[0.09, -0.15, 0.03]} rotation={[0.5, 0, -0.45]} castShadow>
        <boxGeometry args={[0.05, 0.24, 0.02]} />
        <meshStandardMaterial color={color} roughness={0.45} />
      </mesh>
    </group>
  );
}

function Gift() {
  const group = useRef<Group>(null);
  const paper = "#F4EFE7";
  const ribbon = "#A66B5A";

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = -0.55 + Math.sin(t * 0.28) * 0.15;
    group.current.position.y = 0.05 + Math.sin(t * 0.85) * 0.05;
  });

  return (
    <group ref={group} position={[0.9, 0.05, 0]} scale={1.45}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.45, 0.95, 0.95]} />
        <meshStandardMaterial color={paper} roughness={0.78} metalness={0} />
      </mesh>
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[1.52, 0.16, 1.02]} />
        <meshStandardMaterial color="#FFFCF8" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[0.15, 0.97, 0.97]} />
        <meshStandardMaterial color={ribbon} roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.02, 0]} castShadow>
        <boxGeometry args={[1.47, 0.97, 0.15]} />
        <meshStandardMaterial color={ribbon} roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[0.15, 0.18, 1.04]} />
        <meshStandardMaterial color={ribbon} roughness={0.42} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.54, 0.18, 0.15]} />
        <meshStandardMaterial color={ribbon} roughness={0.42} />
      </mesh>
      <SoftBow color={ribbon} />
    </group>
  );
}

function AccentOrb() {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = 0.9 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
  });
  return (
    <mesh ref={ref} position={[-0.35, 0.9, -1.2]}>
      <sphereGeometry args={[0.35, 32, 32]} />
      <meshStandardMaterial
        color="#2A4A42"
        roughness={0.3}
        metalness={0.15}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden>
      <Canvas
        shadows
        camera={{
          position: [-1.6, 1.15, 3.8],
          fov: 40,
          near: 0.1,
          far: 50,
        }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ camera, gl, scene }) => {
          camera.lookAt(0.75, 0.2, 0);
          gl.setClearColor("#14201c", 1);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.25;
          scene.background = new THREE.Color("#14201c");
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <hemisphereLight args={["#e8f0ea", "#14201c", 0.7]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          castShadow
          position={[3.5, 6, 2.5]}
          intensity={2.4}
          color="#fff5e8"
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-3, 1.5, -2]} intensity={0.7} color="#8fb3a2" />
        <spotLight
          position={[1, 4.5, 2]}
          intensity={1.6}
          angle={0.55}
          penumbra={0.7}
          color="#ffdcc4"
          castShadow
        />
        <Gift />
        <AccentOrb />
        <ContactShadows
          position={[0.9, -0.55, 0]}
          opacity={0.5}
          scale={12}
          blur={2.6}
          far={6}
        />
      </Canvas>
    </div>
  );
}
