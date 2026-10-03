"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function subscribeMobile(onStoreChange: () => void) {
  const mq = window.matchMedia("(max-width: 768px)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  reduced.addEventListener("change", onStoreChange);
  return () => {
    mq.removeEventListener("change", onStoreChange);
    reduced.removeEventListener("change", onStoreChange);
  };
}

function isMobileFallback() {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(max-width: 768px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function SoftCluster({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const blobs = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    blobs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const phase = i * 1.7;
      const px = pointer.current.x * 0.8;
      const py = pointer.current.y * 0.6;
      mesh.position.x = Math.sin(t * 0.6 + phase) * 0.35 + px * 0.4;
      mesh.position.y = Math.cos(t * 0.5 + phase) * 0.25 + py * 0.35;
      mesh.position.z = Math.sin(t * 0.8 + phase) * 0.2;
      mesh.rotation.x = t * 0.15 + px;
      mesh.rotation.y = t * 0.2 + py;
    });
    if (group.current) {
      group.current.rotation.y = t * 0.08 + pointer.current.x * 0.3;
      group.current.rotation.x = pointer.current.y * 0.2;
    }
  });

  const scales = [1, 0.72, 0.55, 0.42, 0.35];

  return (
    <group ref={group}>
      {scales.map((s, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) blobs.current[i] = el;
          }}
          scale={s}
        >
          <icosahedronGeometry args={[0.55, 2]} />
          <meshPhysicalMaterial
            color="#f2f2f2"
            roughness={0.35}
            metalness={0.05}
            clearcoat={0.4}
            clearcoatRoughness={0.2}
            flatShading
          />
        </mesh>
      ))}
    </group>
  );
}

function MobileFallback() {
  return (
    <div className="flex h-full min-h-[320px] items-center justify-center bg-[#0a0a0a]">
      <div className="relative h-40 w-40">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 animate-pulse border border-white/20"
            style={{
              transform: `rotate(${i * 12}deg) scale(${1 - i * 0.12})`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function SignatureCanvas() {
  const pointer = useRef({ x: 0, y: 0 });
  const mobile = useSyncExternalStore(subscribeMobile, isMobileFallback, () => true);

  useEffect(() => {
    if (mobile) return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.x = nx;
      pointer.current.y = ny;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mobile]);

  if (mobile) {
    return (
      <div className="min-h-[320px] border-l border-white/10">
        <MobileFallback />
      </div>
    );
  }

  return (
    <div className="relative min-h-[min(70vh,640px)] border-l border-white/10 bg-[#0a0a0a]">
      <Canvas camera={{ position: [0, 0, 3.2], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true }}>
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[3, 4, 5]} intensity={1.2} />
        <directionalLight position={[-4, -2, 2]} intensity={0.35} />
        <SoftCluster pointer={pointer} />
      </Canvas>
    </div>
  );
}
