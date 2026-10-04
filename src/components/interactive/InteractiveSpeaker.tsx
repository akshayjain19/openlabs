"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";
import { useAmbientAudio } from "@/hooks/useAmbientAudio";

function subscribeReduced(onStoreChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getReduced() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeMobile(onStoreChange: () => void) {
  const mq = window.matchMedia("(max-width: 768px)");
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 768px)").matches;
}

function useGrilleTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.fillStyle = "#151515";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#2c2c2c";
    const step = 8;
    const r = 1.2;
    for (let y = step / 2; y < size; y += step) {
      for (let x = step / 2; x < size; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    return tex;
  }, []);
}

type PointerRef = React.RefObject<{ x: number; y: number }>;

type ButtonProps = {
  label: string;
  position: [number, number, number];
  active: boolean;
  onPress: () => void;
  cursor: "on" | "off";
  onHover: (cursor: "on" | "off" | null) => void;
};

function HardwareButton({ label, position, active, onPress, cursor, onHover }: ButtonProps) {
  const [hover, setHover] = useState(false);
  const depressed = hover || active;

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onPress();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(true);
          onHover(cursor);
        }}
        onPointerOut={() => {
          setHover(false);
          onHover(null);
        }}
        position={[0, 0, depressed ? -0.012 : 0]}
      >
        <boxGeometry args={[0.15, 0.06, 0.04]} />
        <meshStandardMaterial color={active ? "#f7f2e8" : "#24201d"} metalness={0.22} roughness={0.48} />
      </mesh>
      <Text
        position={[0, 0, 0.031]}
        fontSize={0.032}
        color={active ? "#0a0a0a" : "#f4efe6"}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

function SpeakerModel({
  pointer,
  playing,
  reducedMotion,
  onPressOn,
  onPressOff,
  onHoverControl,
}: {
  pointer: PointerRef;
  playing: boolean;
  reducedMotion: boolean;
  onPressOn: () => void;
  onPressOff: () => void;
  onHoverControl: (cursor: "on" | "off" | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const wooferRef = useRef<THREE.Mesh>(null);
  const wooferRingRef = useRef<THREE.Mesh>(null);
  const grilleRef = useRef<THREE.Mesh>(null);
  const ledRef = useRef<THREE.Mesh>(null);
  const body = useRef({ rx: 0, ry: 0, vx: 0, vy: 0 });
  const grilleTex = useGrilleTexture();
  const motionScale = reducedMotion ? 0.15 : 1;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const targetRy = -0.1 + pointer.current.x * 0.16 * motionScale;
    const targetRx = 0.02 - pointer.current.y * 0.055 * motionScale;
    const k = reducedMotion ? 0.02 : 0.035;
    const d = reducedMotion ? 0.9 : 0.82;

    body.current.vy += (targetRy - body.current.ry) * k;
    body.current.vx += (targetRx - body.current.rx) * k;
    body.current.vy *= d;
    body.current.vx *= d;
    body.current.ry += body.current.vy;
    body.current.rx += body.current.vx;

    if (groupRef.current) {
      const alive = playing ? Math.sin(t * 18) * 0.0025 * motionScale : Math.sin(t * 0.9) * 0.0015 * motionScale;
      groupRef.current.rotation.y = body.current.ry;
      groupRef.current.rotation.x = body.current.rx;
      groupRef.current.position.y = alive;
    }

    if (playing && wooferRef.current) {
      const pulse =
        (Math.sin(t * 9) * 0.012 + Math.sin(t * 2.7) * 0.008 + Math.sin(t * 15) * 0.004) *
        motionScale;
      wooferRef.current.position.z = 0.322 + pulse;
      if (wooferRingRef.current) {
        wooferRingRef.current.scale.setScalar(1 + pulse * 0.45);
      }
      if (grilleRef.current) {
        grilleRef.current.position.z = 0.286 + pulse * 0.12;
      }
    } else if (wooferRef.current) {
      wooferRef.current.position.z = THREE.MathUtils.lerp(wooferRef.current.position.z, 0.322, 0.08);
      if (wooferRingRef.current) {
        wooferRingRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
      }
    }

    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshStandardMaterial;
      const glow = playing ? 0.75 + Math.sin(t * 2) * 0.18 : 0.05;
      mat.emissiveIntensity = glow * motionScale;
    }
  });

  return (
    <group ref={groupRef} scale={1.28} rotation={[0.02, -0.1, 0]}>
      <RoundedBox args={[1.16, 1.02, 0.46]} radius={0.09} smoothness={6} castShadow receiveShadow>
        <meshStandardMaterial color="#d8d0c1" roughness={0.42} metalness={0.2} />
      </RoundedBox>

      <RoundedBox args={[0.86, 0.78, 0.045]} radius={0.035} smoothness={4} position={[0, -0.02, 0.255]}>
        <meshStandardMaterial color="#111111" roughness={0.62} metalness={0.18} />
      </RoundedBox>

      <mesh ref={grilleRef} position={[0, -0.02, 0.286]}>
        <planeGeometry args={[0.76, 0.68]} />
        <meshStandardMaterial map={grilleTex ?? undefined} color="#161616" roughness={0.85} metalness={0.08} />
      </mesh>

      <mesh ref={wooferRef} position={[0, -0.18, 0.322]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.23, 0.26, 0.05, 72]} />
        <meshStandardMaterial color="#eee7da" roughness={0.34} metalness={0.22} />
      </mesh>
      <mesh ref={wooferRingRef} position={[0, -0.18, 0.354]}>
        <torusGeometry args={[0.205, 0.018, 16, 72]} />
        <meshStandardMaterial color="#101010" roughness={0.34} metalness={0.48} />
      </mesh>
      <mesh position={[0, -0.18, 0.365]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.075, 0.085, 0.025, 48]} />
        <meshStandardMaterial color="#111111" roughness={0.35} metalness={0.45} />
      </mesh>

      <mesh position={[0, 0.22, 0.322]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.082, 0.095, 0.032, 48]} />
        <meshStandardMaterial color="#f8f3ea" roughness={0.36} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.22, 0.35]}>
        <torusGeometry args={[0.082, 0.008, 12, 48]} />
        <meshStandardMaterial color="#111111" roughness={0.36} metalness={0.5} />
      </mesh>

      <RoundedBox args={[0.48, 0.15, 0.04]} radius={0.018} smoothness={3} position={[0, 0.43, 0.31]}>
        <meshStandardMaterial color="#171412" roughness={0.72} metalness={0.12} />
      </RoundedBox>

      <mesh ref={ledRef} position={[-0.18, 0.43, 0.345]}>
        <sphereGeometry args={[0.018, 18, 18]} />
        <meshStandardMaterial
          color={playing ? "#c9ffb0" : "#39332c"}
          emissive={playing ? "#8dff65" : "#15110f"}
          emissiveIntensity={playing ? 0.9 : 0.08}
          roughness={0.4}
        />
      </mesh>

      <HardwareButton
        label="ON"
        position={[0.02, 0.43, 0.34]}
        active={playing}
        onPress={onPressOn}
        cursor="on"
        onHover={onHoverControl}
      />
      <HardwareButton
        label="OFF"
        position={[0.2, 0.43, 0.34]}
        active={!playing}
        onPress={onPressOff}
        cursor="off"
        onHover={onHoverControl}
      />
    </group>
  );
}

function Scene({
  playing,
  reducedMotion,
  onPressOn,
  onPressOff,
  onHoverControl,
}: {
  playing: boolean;
  reducedMotion: boolean;
  onPressOn: () => void;
  onPressOff: () => void;
  onHoverControl: (cursor: "on" | "off" | null) => void;
}) {
  const pointer = useRef({ x: 0, y: 0 });
  const { gl } = useThree();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    gl.domElement.addEventListener("pointermove", onMove);
    return () => gl.domElement.removeEventListener("pointermove", onMove);
  }, [gl]);

  return (
    <>
      <ambientLight intensity={0.62} />
      <directionalLight position={[3, 4, 5]} intensity={1.05} color="#fff7ed" />
      <directionalLight position={[-4, 2, 3]} intensity={0.42} color="#d7e2ff" />
      <pointLight position={[0, 0.8, 1.6]} intensity={0.35} color="#ffffff" />
      <SpeakerModel
        pointer={pointer}
        playing={playing}
        reducedMotion={reducedMotion}
        onPressOn={onPressOn}
        onPressOff={onPressOff}
        onHoverControl={onHoverControl}
      />
    </>
  );
}

function SpeakerCanvas({
  playing,
  reducedMotion,
  onPressOn,
  onPressOff,
  dpr,
  onHoverControl,
}: {
  playing: boolean;
  reducedMotion: boolean;
  onPressOn: () => void;
  onPressOff: () => void;
  dpr: number;
  onHoverControl: (cursor: "on" | "off" | null) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0.02, 1.62], fov: 32 }}
      dpr={[1, dpr]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Scene
        playing={playing}
        reducedMotion={reducedMotion}
        onPressOn={onPressOn}
        onPressOff={onPressOff}
        onHoverControl={onHoverControl}
      />
    </Canvas>
  );
}

type Props = {
  className?: string;
  variant?: "hero" | "section";
};

export function InteractiveSpeaker({ className = "", variant = "section" }: Props) {
  const { playing, blocked, turnOn, turnOff } = useAmbientAudio("/audio/rain.mp3");
  const reducedMotion = useSyncExternalStore(subscribeReduced, getReduced, () => false);
  const mobile = useSyncExternalStore(subscribeMobile, getMobile, () => true);
  const dpr = mobile ? 1.25 : 1.5;
  const [cursorHint, setCursorHint] = useState<"play" | "on" | "off">("play");

  const handleOn = useCallback(() => {
    void turnOn();
  }, [turnOn]);

  const handleOff = useCallback(() => {
    turnOff();
  }, [turnOff]);

  const onHoverControl = useCallback((c: "on" | "off" | null) => {
    setCursorHint(c ?? "play");
  }, []);

  const sizeClass =
    variant === "hero"
      ? "min-h-[280px] md:min-h-[360px] lg:min-h-[420px]"
      : "min-h-[min(52vh,480px)] lg:min-h-[min(58vh,560px)]";

  return (
    <div
      className={`relative flex w-full flex-col items-center ${sizeClass} ${className}`}
      data-cursor={cursorHint}
    >
      <div className="w-full flex-1 min-h-0">
        <SpeakerCanvas
          playing={playing}
          reducedMotion={reducedMotion}
          onPressOn={handleOn}
          onPressOff={handleOff}
          dpr={dpr}
          onHoverControl={onHoverControl}
        />
      </div>

      <div className="mt-1 flex flex-col items-center gap-2 md:mt-2">
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
          <span
            aria-hidden
            className={`h-2 w-2 rounded-full ${playing ? "bg-[#a7ff82] shadow-[0_0_16px_rgba(167,255,130,0.8)]" : "bg-zinc-700"}`}
          />
          <span className="min-w-14 text-center text-[9px] font-medium tracking-[0.28em] text-zinc-500">
            {playing ? "PLAYING" : "OFF"}
          </span>
          <button
            type="button"
            aria-pressed={playing}
            onClick={handleOn}
            data-cursor="on"
            className={`min-h-9 min-w-14 rounded-full border px-4 text-[10px] font-semibold tracking-[0.22em] transition ${
              playing
                ? "border-white bg-[#eee7da] text-black"
                : "border-white/15 bg-[#171412] text-zinc-300 hover:border-white/35"
            }`}
          >
            ON
          </button>
          <button
            type="button"
            aria-pressed={!playing}
            onClick={handleOff}
            data-cursor="off"
            className={`min-h-9 min-w-14 rounded-full border px-4 text-[10px] font-semibold tracking-[0.22em] transition ${
              !playing
                ? "border-white bg-[#eee7da] text-black"
                : "border-white/15 bg-[#171412] text-zinc-300 hover:border-white/35"
            }`}
          >
            OFF
          </button>
        </div>
        <p className="text-[9px] tracking-[0.28em] text-zinc-600">TURN ON FOR RAIN.</p>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-2 md:bottom-6 md:left-6">
        {blocked ? (
          <p className="text-[10px] tracking-[0.25em] text-zinc-500">AUDIO BLOCKED</p>
        ) : null}
      </div>

    </div>
  );
}
