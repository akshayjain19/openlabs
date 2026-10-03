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

type PointerRef = React.RefObject<{ x: number; y: number; vx: number; vy: number }>;

function SoftMassInFrame({ pointer }: { pointer: PointerRef }) {
  const blobRef = useRef<THREE.Mesh>(null);
  const frameRef = useRef<THREE.Mesh>(null);
  const body = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  useFrame(() => {
    const targetX = pointer.current.x * 0.38;
    const targetY = pointer.current.y * 0.32;
    const spring = 0.028;
    const damp = 0.82;

    body.current.vx += (targetX - body.current.x) * spring;
    body.current.vy += (targetY - body.current.y) * spring;
    body.current.vx *= damp;
    body.current.vy *= damp;
    body.current.x += body.current.vx;
    body.current.y += body.current.vy;

    const blob = blobRef.current;
    if (blob) {
      blob.position.set(body.current.x, body.current.y, 0);
      const squash = 1 - Math.min(0.22, Math.abs(body.current.vx) * 0.55);
      const stretch = 1 + Math.min(0.18, Math.abs(body.current.vy) * 0.45);
      blob.scale.set(stretch * 1.05, squash * 1.05, 1.05);
      blob.rotation.z = body.current.vx * 0.35;
    }

    if (frameRef.current) {
      frameRef.current.rotation.z *= 0.94;
      frameRef.current.rotation.z += body.current.vx * 0.015;
    }
  });

  return (
    <group>
      <mesh ref={frameRef}>
        <boxGeometry args={[2.05, 2.05, 0.12]} />
        <meshStandardMaterial color="#050505" metalness={0.1} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[2.05, 2.05, 0.02]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh ref={blobRef} position={[0, 0, 0.2]}>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshStandardMaterial color="#f2f2f2" roughness={0.72} metalness={0.04} />
      </mesh>
    </group>
  );
}

function Scene({ pointer }: { pointer: PointerRef }) {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 8]} intensity={0.9} />
      <directionalLight position={[-5, -2, 6]} intensity={0.25} />
      <SoftMassInFrame pointer={pointer} />
    </>
  );
}

function MobileSignatureFallback() {
  return (
    <div
      className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-[#080808]"
      aria-hidden
    >
      <div className="relative h-28 w-28 border border-white/15">
        <div className="absolute inset-3 rounded-full bg-white/90" />
      </div>
    </div>
  );
}

type Props = {
  className?: string;
};

export function InteractiveObject({ className = "" }: Props) {
  const pointer = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const mobile = useSyncExternalStore(subscribeMobile, isMobileFallback, () => true);

  useEffect(() => {
    if (mobile) return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.current.vx = nx - pointer.current.x;
      pointer.current.vy = ny - pointer.current.y;
      pointer.current.x = nx;
      pointer.current.y = ny;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mobile]);

  if (mobile) {
    return (
      <div className={`border-t border-white/10 ${className}`}>
        <MobileSignatureFallback />
      </div>
    );
  }

  return (
    <div
      data-cursor="play"
      className={`relative min-h-[min(42vh,420px)] border-t border-white/10 bg-[#080808] ${className}`}
    >
      <Canvas camera={{ position: [0, 0, 3.2], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <color attach="background" args={["#080808"]} />
        <Scene pointer={pointer} />
      </Canvas>
    </div>
  );
}
