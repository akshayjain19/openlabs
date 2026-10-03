"use client";

import { useEffect, useMemo, useRef, useSyncExternalStore } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
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

type PointerRef = React.RefObject<{ x: number; y: number }>;

function CagedSoftMass({ pointer }: { pointer: PointerRef }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Group>(null);
  const { geometry, basePositions } = useMemo(() => {
    const geo = new THREE.SphereGeometry(0.48, 40, 40);
    return {
      geometry: geo,
      basePositions: new Float32Array(geo.attributes.position.array),
    };
  }, []);
  const body = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const cageWobble = useRef(0);

  /* eslint-disable react-hooks/immutability -- realtime mesh deformation in R3F useFrame */
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const targetX = pointer.current.x * 0.42;
    const targetY = pointer.current.y * 0.38;

    body.current.vx += (targetX - body.current.x) * 0.045;
    body.current.vy += (targetY - body.current.y) * 0.045;
    body.current.vx *= 0.86;
    body.current.vy *= 0.86;
    body.current.x += body.current.vx;
    body.current.y += body.current.vy;

    cageWobble.current *= 0.92;
    cageWobble.current += (Math.abs(body.current.vx) + Math.abs(body.current.vy)) * 0.06;

    if (cageRef.current) {
      const w = cageWobble.current;
      cageRef.current.rotation.set(w * 0.18, w * 0.24, w * 0.1);
    }

    const mesh = meshRef.current;
    if (!mesh) return;

    mesh.position.set(body.current.x, body.current.y, 0);
    const squash = 1 - Math.min(0.35, Math.abs(body.current.vx) * 0.45);
    const stretch = 1 + Math.min(0.28, Math.abs(body.current.vy) * 0.35);
    mesh.scale.set(stretch, squash, 1 + Math.abs(body.current.vx) * 0.12);

    const pos = geometry.attributes.position;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < pos.count; i += 1) {
      const ix = i * 3;
      const ox = basePositions[ix];
      const oy = basePositions[ix + 1];
      const oz = basePositions[ix + 2];
      const pulse = Math.sin(t * 2.8 + ox * 4.5 + oy * 3.2) * 0.028;
      const nx = ox + body.current.x;
      const ny = oy + body.current.y;
      const len = Math.sqrt(nx * nx + ny * ny + oz * oz) || 1;
      const bulge = pulse + Math.max(0, 0.08 - len * 0.09);
      arr[ix] = ox + (ox / len) * bulge;
      arr[ix + 1] = oy + (oy / len) * bulge;
      arr[ix + 2] = oz + (oz / len) * bulge;
    }
    pos.needsUpdate = true;
    geometry.computeVertexNormals();
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <group ref={cageRef}>
      <mesh>
        <boxGeometry args={[1.75, 1.75, 1.75]} />
        <meshBasicMaterial color="#888888" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <boxGeometry args={[1.75, 1.75, 1.75]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0} />
        <Edges threshold={15} color="#cccccc" />
      </mesh>
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#f0f0f0"
          roughness={0.62}
          metalness={0.02}
          clearcoat={0.25}
          clearcoatRoughness={0.4}
        />
      </mesh>
    </group>
  );
}

function Scene({ pointer }: { pointer: PointerRef }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 6]} intensity={1.05} color="#ffffff" />
      <directionalLight position={[-6, -3, 4]} intensity={0.25} color="#cccccc" />
      <CagedSoftMass pointer={pointer} />
    </>
  );
}

function MobileSignatureFallback() {
  return (
    <div
      className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-[#080808] md:min-h-[420px]"
      aria-hidden
    >
      <div className="signature-mobile-grid absolute inset-0 opacity-30" />
      <div className="relative border border-white/20 px-10 py-14">
        <span className="absolute -top-px -left-px h-4 w-px bg-white/50" />
        <span className="absolute -top-px -left-px h-px w-4 bg-white/50" />
        <span className="absolute -right-px -bottom-px h-4 w-px bg-white/50" />
        <span className="absolute -right-px -bottom-px h-px w-4 bg-white/50" />
        <p className="text-[10px] tracking-[0.45em] text-zinc-500">INTERACTION</p>
        <p className="mt-4 text-4xl font-semibold tracking-tight text-white/90">KV</p>
      </div>
    </div>
  );
}

type Props = {
  className?: string;
};

export function InteractiveObject({ className = "" }: Props) {
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
      <div className={`border-t border-white/10 lg:border-t-0 lg:border-l ${className}`}>
        <MobileSignatureFallback />
      </div>
    );
  }

  return (
    <div
      data-cursor="play"
      className={`relative min-h-[min(72vh,680px)] border-t border-white/10 bg-[#080808] lg:min-h-[520px] lg:border-t-0 lg:border-l ${className}`}
    >
      <Canvas camera={{ position: [0, 0, 3.6], fov: 40 }} dpr={[1, 1.4]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <color attach="background" args={["#080808"]} />
        <Scene pointer={pointer} />
      </Canvas>
    </div>
  );
}
