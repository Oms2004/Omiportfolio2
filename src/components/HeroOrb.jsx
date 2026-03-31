import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

/* ========== Interactive Orb Mesh ========== */
function Orb({ mouse }) {
  const meshRef = useRef();
  const originalPositions = useRef(null);
  const { theme } = useTheme();

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.6, 5);
    return geo;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mesh = meshRef.current;
    const time = state.clock.elapsedTime;

    // Store original positions on first frame
    const posAttr = mesh.geometry.attributes.position;
    if (!originalPositions.current) {
      originalPositions.current = new Float32Array(posAttr.array);
    }

    const orig = originalPositions.current;

    // Animate vertices with noise-like displacement
    for (let i = 0; i < posAttr.count; i++) {
      const ox = orig[i * 3];
      const oy = orig[i * 3 + 1];
      const oz = orig[i * 3 + 2];

      const displacement =
        Math.sin(ox * 2.5 + time * 0.8) * 0.06 +
        Math.cos(oy * 3.0 + time * 0.6) * 0.05 +
        Math.sin(oz * 2.0 + time * 1.0) * 0.04;

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const nx = ox / len;
      const ny = oy / len;
      const nz = oz / len;

      posAttr.array[i * 3] = ox + nx * displacement;
      posAttr.array[i * 3 + 1] = oy + ny * displacement;
      posAttr.array[i * 3 + 2] = oz + nz * displacement;
    }
    posAttr.needsUpdate = true;

    // Float up/down gently
    mesh.position.y = Math.sin(time * 0.5) * 0.15;

    // React to mouse — push away from pointer
    const targetRotX = mouse.current[1] * 0.4;
    const targetRotY = mouse.current[0] * 0.4;
    mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.05;
    mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.05;

    // Push orb position slightly away from mouse
    const pushX = -mouse.current[0] * 0.3;
    const pushY = -mouse.current[1] * 0.3;
    mesh.position.x += (pushX - mesh.position.x) * 0.03;
  });

  const color = theme === 'dark' ? '#a78bfa' : '#7c3aed';
  const emissive = theme === 'dark' ? '#6d28d9' : '#4c1d95';

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        wireframe
      />
    </mesh>
  );
}

/* ========== Particle Field ========== */
function Particles({ mouse }) {
  const pointsRef = useRef();
  const { theme } = useTheme();

  const [positions, velocities] = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posAttr = pointsRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < posAttr.count; i++) {
      posAttr.array[i * 3] += velocities[i * 3] + Math.sin(time * 0.3 + i) * 0.001;
      posAttr.array[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(time * 0.2 + i) * 0.001;
      posAttr.array[i * 3 + 2] += velocities[i * 3 + 2];

      // Swirl around mouse
      posAttr.array[i * 3] += mouse.current[0] * 0.001;
      posAttr.array[i * 3 + 1] += mouse.current[1] * 0.001;

      // Wrap around
      for (let axis = 0; axis < 3; axis++) {
        const limit = axis < 2 ? 6 : 4;
        if (posAttr.array[i * 3 + axis] > limit) posAttr.array[i * 3 + axis] = -limit;
        if (posAttr.array[i * 3 + axis] < -limit) posAttr.array[i * 3 + axis] = limit;
      }
    }
    posAttr.needsUpdate = true;
  });

  const particleColor = theme === 'dark' ? '#22d3ee' : '#0891b2';

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={particleColor}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

/* ========== Mouse Tracker ========== */
function MouseTracker({ mouse }) {
  const { viewport } = useThree();

  useFrame((state) => {
    mouse.current[0] = (state.pointer.x * viewport.width) / 2;
    mouse.current[1] = (state.pointer.y * viewport.height) / 2;
  });

  return null;
}

/* ========== Main HeroOrb Canvas ========== */
export default function HeroOrb() {
  const mouse = useRef([0, 0]);

  return (
    <div id="hero-canvas" className="absolute inset-0" style={{ touchAction: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#a78bfa" />
        <pointLight position={[-5, -3, 3]} intensity={0.6} color="#22d3ee" />
        <MouseTracker mouse={mouse} />
        <Orb mouse={mouse} />
        <Particles mouse={mouse} />
      </Canvas>
    </div>
  );
}
