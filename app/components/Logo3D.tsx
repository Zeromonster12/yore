"use client";
import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

function LogoModel() {
  const { scene } = useGLTF("/yore%20logo.glb");

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.material = new THREE.MeshStandardMaterial({
        color: "#ffffff",
        metalness: 0.8,
        roughness: 0.15,
      });
    }
  });

  return <primitive object={scene} />;
}

export default function Logo3D() {
  return (
    <div
      style={{
        width: "80vw",
        maxWidth: "900px",
        height: "200px",
        margin: "0 auto",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 14], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight
          position={[-5, -2, -5]}
          intensity={0.4}
          color="#aaaaff"
        />
        <Suspense fallback={null}>
          <Center>
            <LogoModel />
          </Center>
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/yore%20logo.glb");
