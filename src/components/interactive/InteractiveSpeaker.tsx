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
    ctx.fillStyle = "#161514";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#34312d";
    const step = 8;
    for (let y = step / 2; y < size; y += step) {
      for (let x = step / 2; x < size; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, 1.25, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4.5, 3);
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
        <boxGeometry args={[0.14, 0.052, 0.036]} />
        <meshStandardMaterial color={active ? "#eadfc8" : "#211915"} metalness={0.2} roughness={0.5} />
      </mesh>
      <Text position={[0, 0, 0.03]} fontSize={0.027} color={active ? "#111" : "#f2eadb"} anchorX="center" anchorY="middle">
        {label}
      </Text>
    </group>
  );
}

function RetroPlayerModel({
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
  const grilleRef = useRef<THREE.Mesh>(null);
  const dialRef = useRef<THREE.Mesh>(null);
  const dialRingRef = useRef<THREE.Mesh>(null);
  const ledRef = useRef<THREE.Mesh>(null);
  const displayRef = useRef<THREE.Mesh>(null);
  const body = useRef({ rx: 0, ry: 0, vx: 0, vy: 0 });
  const grilleTex = useGrilleTexture();
  const motionScale = reducedMotion ? 0.12 : 1;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const targetRy = -0.1 + pointer.current.x * 0.14 * motionScale;
    const targetRx = 0.015 - pointer.current.y * 0.045 * motionScale;
    body.current.vy += (targetRy - body.current.ry) * 0.032;
    body.current.vx += (targetRx - body.current.rx) * 0.032;
    body.current.vy *= 0.84;
    body.current.vx *= 0.84;
    body.current.ry += body.current.vy;
    body.current.rx += body.current.vx;

    if (groupRef.current) {
      const breathing = playing ? Math.sin(t * 11) * 0.0024 : Math.sin(t * 0.8) * 0.0015;
      groupRef.current.rotation.y = body.current.ry;
      groupRef.current.rotation.x = body.current.rx;
      groupRef.current.position.y = breathing * motionScale;
    }

    if (playing && dialRef.current) {
      const pulse = (Math.sin(t * 5.8) * 0.008 + Math.sin(t * 2.2) * 0.005) * motionScale;
      dialRef.current.position.z = 0.358 + pulse;
      dialRingRef.current?.scale.setScalar(1 + pulse * 0.22);
      if (grilleRef.current) grilleRef.current.position.z = 0.316 + pulse * 0.08;
    } else if (dialRef.current) {
      dialRef.current.position.z = THREE.MathUtils.lerp(dialRef.current.position.z, 0.358, 0.08);
      dialRingRef.current?.scale.lerp(new THREE.Vector3(1, 1, 1), 0.08);
    }

    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = (playing ? 0.72 + Math.sin(t * 1.8) * 0.14 : 0.05) * motionScale;
    }

    if (displayRef.current) {
      const mat = displayRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = playing ? 0.22 + Math.sin(t * 1.3) * 0.04 : 0.035;
    }
  });

  return (
    <group ref={groupRef} scale={1.24} rotation={[0.015, -0.1, 0]}>
      <mesh position={[0, 0.55, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.48, 0.022, 14, 72, Math.PI]} />
        <meshStandardMaterial color="#cbb885" roughness={0.35} metalness={0.45} />
      </mesh>

      <RoundedBox args={[1.58, 0.82, 0.5]} radius={0.1} smoothness={7} castShadow receiveShadow>
        <meshStandardMaterial color="#b48455" roughness={0.52} metalness={0.08} />
      </RoundedBox>
      <RoundedBox args={[1.46, 0.7, 0.04]} radius={0.065} smoothness={5} position={[0, -0.02, 0.275]}>
        <meshStandardMaterial color="#eadfc8" roughness={0.38} metalness={0.16} />
      </RoundedBox>

      <RoundedBox args={[0.75, 0.48, 0.045]} radius={0.035} smoothness={4} position={[-0.36, -0.06, 0.31]}>
        <meshStandardMaterial color="#181614" roughness={0.78} metalness={0.1} />
      </RoundedBox>
      <mesh ref={grilleRef} position={[-0.36, -0.06, 0.338]}>
        <planeGeometry args={[0.64, 0.38]} />
        <meshStandardMaterial map={grilleTex ?? undefined} color="#171717" roughness={0.88} metalness={0.12} />
      </mesh>

      <mesh ref={dialRef} position={[0.43, -0.09, 0.358]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.205, 0.23, 0.07, 80]} />
        <meshStandardMaterial color="#e9dcc0" roughness={0.31} metalness={0.34} />
      </mesh>
      <mesh ref={dialRingRef} position={[0.43, -0.09, 0.4]}>
        <torusGeometry args={[0.19, 0.017, 16, 80]} />
        <meshStandardMaterial color="#ad956d" roughness={0.3} metalness={0.55} />
      </mesh>
      <mesh position={[0.43, -0.09, 0.415]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.052, 0.063, 0.018, 40]} />
        <meshStandardMaterial color="#2a2119" roughness={0.4} metalness={0.4} />
      </mesh>

      <RoundedBox args={[0.42, 0.12, 0.034]} radius={0.018} smoothness={3} position={[0.39, 0.24, 0.34]}>
        <meshStandardMaterial color="#15130f" roughness={0.56} metalness={0.14} />
      </RoundedBox>
      <mesh ref={displayRef} position={[0.39, 0.24, 0.362]}>
        <planeGeometry args={[0.31, 0.062]} />
        <meshStandardMaterial
          color={playing ? "#d5c091" : "#2b261d"}
          emissive={playing ? "#b59b64" : "#090806"}
          emissiveIntensity={playing ? 0.2 : 0.03}
          roughness={0.5}
        />
      </mesh>

      <RoundedBox args={[0.38, 0.1, 0.04]} radius={0.018} smoothness={3} position={[0.39, 0.08, 0.345]}>
        <meshStandardMaterial color="#211915" roughness={0.7} metalness={0.18} />
      </RoundedBox>
      <mesh ref={ledRef} position={[0.21, 0.08, 0.38]}>
        <sphereGeometry args={[0.017, 18, 18]} />
        <meshStandardMaterial
          color={playing ? "#d8c883" : "#3d3327"}
          emissive={playing ? "#d8b95e" : "#15110f"}
          emissiveIntensity={playing ? 0.9 : 0.08}
          roughness={0.4}
        />
      </mesh>

      <HardwareButton label="ON" position={[0.34, 0.08, 0.375]} active={playing} onPress={onPressOn} cursor="on" onHover={onHoverControl} />
      <HardwareButton label="OFF" position={[0.52, 0.08, 0.375]} active={!playing} onPress={onPressOff} cursor="off" onHover={onHoverControl} />

      <mesh position={[-0.81, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.44, 0.7]} />
        <meshStandardMaterial color="#815a39" roughness={0.58} metalness={0.08} />
      </mesh>
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
      <ambientLight intensity={0.68} />
      <directionalLight position={[3, 4, 5]} intensity={1.08} color="#fff7ed" />
      <directionalLight position={[-4, 2, 3]} intensity={0.38} color="#f0f0f0" />
      <pointLight position={[0, 0.8, 1.6]} intensity={0.35} color="#ffffff" />
      <RetroPlayerModel
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
      camera={{ position: [0, 0.04, 1.95], fov: 33 }}
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
  const { playing, blocked, turnOn, turnOff } = useAmbientAudio("/audio/pondering.mp3");
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
    <div className={`relative flex w-full flex-col items-center ${sizeClass} ${className}`} data-cursor={cursorHint}>
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
            className={`h-2 w-2 rounded-full ${playing ? "bg-[#d8c883] shadow-[0_0_16px_rgba(216,200,131,0.75)]" : "bg-zinc-700"}`}
          />
          <span className="min-w-28 text-center text-[9px] font-medium tracking-[0.2em] text-zinc-500">
            {playing ? "NOW PLAYING" : "OFF"}
          </span>
          <button
            type="button"
            aria-pressed={playing}
            onClick={handleOn}
            data-cursor="on"
            className={`min-h-9 min-w-14 rounded-full border px-4 text-[10px] font-semibold tracking-[0.22em] transition ${
              playing ? "border-white bg-[#eee7da] text-black" : "border-white/15 bg-[#171412] text-zinc-300 hover:border-white/35"
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
              !playing ? "border-white bg-[#eee7da] text-black" : "border-white/15 bg-[#171412] text-zinc-300 hover:border-white/35"
            }`}
          >
            OFF
          </button>
        </div>
        <p className="text-[9px] tracking-[0.28em] text-zinc-600">
          {playing ? "PONDERING — ARULO" : "TURN IT ON."}
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-2 md:bottom-6 md:left-6">
        {blocked ? <p className="text-[10px] tracking-[0.25em] text-zinc-500">AUDIO BLOCKED</p> : null}
      </div>
    </div>
  );
}
