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
    ctx.fillStyle = "#141414";
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = "#0a0a0a";
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
        position={[0, depressed ? -0.008 : 0, 0]}
      >
        <boxGeometry args={[0.16, 0.048, 0.036]} />
        <meshStandardMaterial
          color={active ? "#f5f5f5" : "#bdbdbd"}
          metalness={0.15}
          roughness={0.55}
        />
      </mesh>
      <Text
        position={[0, 0, 0.022]}
        fontSize={0.028}
        color="#0a0a0a"
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
  const grilleRef = useRef<THREE.Mesh>(null);
  const ledRef = useRef<THREE.Mesh>(null);
  const body = useRef({ rx: 0, ry: 0, vx: 0, vy: 0 });
  const grilleTex = useGrilleTexture();
  const motionScale = reducedMotion ? 0.15 : 1;

  useFrame(({ clock }) => {
    const targetRy = pointer.current.x * 0.32 * motionScale;
    const targetRx = -pointer.current.y * 0.1 * motionScale;
    const k = reducedMotion ? 0.02 : 0.035;
    const d = reducedMotion ? 0.9 : 0.82;

    body.current.vy += (targetRy - body.current.ry) * k;
    body.current.vx += (targetRx - body.current.rx) * k;
    body.current.vy *= d;
    body.current.vx *= d;
    body.current.ry += body.current.vy;
    body.current.rx += body.current.vx;

    if (groupRef.current) {
      groupRef.current.rotation.y = body.current.ry;
      groupRef.current.rotation.x = body.current.rx;
    }

    const t = clock.getElapsedTime();
    if (playing && wooferRef.current) {
      const pulse =
        (Math.sin(t * 9) * 0.012 + Math.sin(t * 2.7) * 0.008 + Math.sin(t * 15) * 0.004) *
        motionScale;
      wooferRef.current.position.z = 0.14 + pulse;
      if (grilleRef.current) {
        grilleRef.current.position.z = 0.195 + pulse * 0.15;
      }
    } else if (wooferRef.current) {
      wooferRef.current.position.z = THREE.MathUtils.lerp(wooferRef.current.position.z, 0.14, 0.08);
    }

    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshStandardMaterial;
      const glow = playing ? 0.35 + Math.sin(t * 2) * 0.12 : 0.04;
      mat.emissiveIntensity = glow * motionScale;
    }
  });

  return (
    <group ref={groupRef}>
      <RoundedBox args={[1.35, 0.78, 0.52]} radius={0.06} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color="#0c0c0c" roughness={0.82} metalness={0.08} />
      </RoundedBox>

      <mesh position={[0.68, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.52, 0.78]} />
        <meshStandardMaterial color="#111111" roughness={0.9} metalness={0.05} />
      </mesh>

      <mesh ref={grilleRef} position={[0.265, 0, 0.2]}>
        <planeGeometry args={[0.62, 0.52]} />
        <meshStandardMaterial
          map={grilleTex ?? undefined}
          color="#1a1a1a"
          roughness={0.95}
          metalness={0.02}
        />
      </mesh>

      <mesh ref={wooferRef} position={[0.08, -0.06, 0.14]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.04, 48]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.65} metalness={0.05} />
      </mesh>
      <mesh position={[0.08, -0.06, 0.165]}>
        <torusGeometry args={[0.12, 0.012, 12, 48]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.4} metalness={0.35} />
      </mesh>

      <mesh position={[0.08, 0.2, 0.14]}>
        <cylinderGeometry args={[0.055, 0.06, 0.03, 32]} />
        <meshStandardMaterial color="#efefef" roughness={0.5} metalness={0.08} />
      </mesh>

      <mesh position={[-0.55, 0.22, 0.18]}>
        <boxGeometry args={[0.22, 0.08, 0.02]} />
        <meshStandardMaterial color="#080808" roughness={0.85} />
      </mesh>

      <mesh ref={ledRef} position={[-0.42, 0.22, 0.2]}>
        <sphereGeometry args={[0.012, 16, 16]} />
        <meshStandardMaterial
          color={playing ? "#f0f0f0" : "#333333"}
          emissive={playing ? "#cccccc" : "#111111"}
          emissiveIntensity={playing ? 0.4 : 0.04}
          roughness={0.4}
        />
      </mesh>

      <HardwareButton
        label="ON"
        position={[-0.52, 0.22, 0.22]}
        active={playing}
        onPress={onPressOn}
        cursor="on"
        onHover={onHoverControl}
      />
      <HardwareButton
        label="OFF"
        position={[-0.34, 0.22, 0.22]}
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
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 5]} intensity={0.85} color="#ffffff" />
      <directionalLight position={[-4, 2, 3]} intensity={0.25} color="#cccccc" />
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
      camera={{ position: [0, 0.05, 2.35], fov: 38 }}
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
      className={`relative w-full ${sizeClass} ${className}`}
      data-cursor={cursorHint}
    >
      <SpeakerCanvas
        playing={playing}
        reducedMotion={reducedMotion}
        onPressOn={handleOn}
        onPressOff={handleOff}
        dpr={dpr}
        onHoverControl={onHoverControl}
      />

      <div className="pointer-events-none absolute bottom-4 left-4 flex flex-col gap-2 md:bottom-6 md:left-6">
        {blocked ? (
          <p className="text-[10px] tracking-[0.25em] text-zinc-500">AUDIO BLOCKED</p>
        ) : null}
      </div>

      <div className="sr-only">
        <button type="button" onClick={handleOn}>
          Turn ambient rain on
        </button>
        <button type="button" onClick={handleOff}>
          Turn ambient rain off
        </button>
      </div>
    </div>
  );
}
