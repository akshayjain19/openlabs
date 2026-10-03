"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
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

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getScrollProgress() {
  if (typeof window === "undefined") return 0;
  return Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
}

type PointerRef = React.RefObject<{ x: number; y: number }>;

function JelloMass({
  pointer,
  scrollProgress,
}: {
  pointer: PointerRef;
  scrollProgress: number;
}) {
  const group = useRef<THREE.Group>(null);
  const box = useRef<THREE.Group>(null);
  const blob = useRef<THREE.Mesh>(null);
  const velocity = useRef({ x: 0, y: 0 });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const px = pointer.current?.x ?? 0;
    const py = pointer.current?.y ?? 0;

    velocity.current.x += (px - velocity.current.x) * 0.08;
    velocity.current.y += (py - velocity.current.y) * 0.08;

    if (group.current) {
      group.current.rotation.y = velocity.current.x * 0.65 + scrollProgress * Math.PI * 0.35;
      group.current.rotation.x = velocity.current.y * 0.45 + Math.sin(t * 0.4) * 0.05;
      group.current.position.y = Math.sin(t * 0.9) * 0.06;
    }

    if (box.current) {
      const squash = 1 - Math.min(0.22, Math.abs(velocity.current.x) * 0.12);
      const stretch = 1 + Math.min(0.18, Math.abs(velocity.current.y) * 0.1);
      box.current.scale.set(stretch, squash, 1 + Math.abs(velocity.current.x) * 0.08);
    }

    if (blob.current) {
      blob.current.position.x = Math.sin(t * 1.4) * 0.55 + velocity.current.x * 0.35;
      blob.current.position.y = Math.cos(t * 1.1) * 0.35 + velocity.current.y * 0.25;
      blob.current.position.z = 0.45 + Math.sin(t * 0.7) * 0.08;
      blob.current.rotation.z = t * 0.6 + velocity.current.x;
    }
  });

  return (
    <group ref={group}>
      <group ref={box}>
        <RoundedBox args={[1.35, 1.35, 1.35]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial
            color="#ececec"
            roughness={0.42}
            metalness={0.04}
            clearcoat={0.55}
            clearcoatRoughness={0.25}
          />
        </RoundedBox>
      </group>
      <mesh ref={blob} scale={0.38}>
        <dodecahedronGeometry args={[0.55, 0]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.3} metalness={0.02} flatShading />
      </mesh>
    </group>
  );
}

function Scene({ pointer }: { pointer: PointerRef }) {
  const scrollProgress = useSyncExternalStore(subscribeScroll, getScrollProgress, () => 0);
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 5]} intensity={1.15} />
      <directionalLight position={[-5, -2, 3]} intensity={0.35} />
      <JelloMass pointer={pointer} scrollProgress={scrollProgress} />
    </>
  );
}

function MobileFallback({ compact }: { compact?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center bg-[#080808] ${compact ? "min-h-[240px]" : "min-h-[280px]"}`}
      aria-hidden
    >
      <div className="relative h-32 w-32 animate-[spin_18s_linear_infinite]">
        <div className="absolute inset-0 border border-white/25" />
        <div className="absolute inset-3 border border-white/15" />
        <div className="absolute inset-6 bg-white/5" />
      </div>
    </div>
  );
}

type Props = {
  compact?: boolean;
  className?: string;
};

export function InteractiveObject({ compact, className = "" }: Props) {
  const pointer = useRef({ x: 0, y: 0 });
  const mobile = useSyncExternalStore(subscribeMobile, isMobileFallback, () => true);

  useEffect(() => {
    if (mobile) return;
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mobile]);

  if (mobile) {
    return (
      <div className={`border-white/10 ${compact ? "border-t lg:border-t-0 lg:border-l" : "border-t"} ${className}`}>
        <MobileFallback compact={compact} />
      </div>
    );
  }

  return (
    <div
      className={`relative bg-[#080808] ${compact ? "min-h-[min(52vh,520px)] border-white/10 lg:min-h-full lg:border-l" : "min-h-[min(70vh,640px)] border-t border-white/10"} ${className}`}
    >
      <Canvas camera={{ position: [0, 0, 3.4], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#080808"]} />
        <Scene pointer={pointer} />
      </Canvas>
    </div>
  );
}
