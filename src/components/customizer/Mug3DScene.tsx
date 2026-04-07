import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Mug3DSceneProps {
  designTexture: HTMLCanvasElement | null;
  mugColor: string;
  autoRotate: boolean;
}

// Programmatic 11oz mug geometry — no external model needed
function MugBody({ designTexture, mugColor }: { designTexture: HTMLCanvasElement | null; mugColor: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => {
    if (!designTexture) return null;
    const t = new THREE.CanvasTexture(designTexture);
    t.needsUpdate = true;
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    return t;
  }, [designTexture]);

  // Update texture every frame for real-time preview
  useFrame(() => {
    if (texture && designTexture) {
      texture.needsUpdate = true;
    }
  });

  const bodyColor = new THREE.Color(mugColor);

  // Create mug body — a lathe geometry for realistic shape
  const mugShape = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    // Bottom
    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(1.55, 0));
    pts.push(new THREE.Vector2(1.6, 0.05));
    // Lower body with slight curve
    pts.push(new THREE.Vector2(1.62, 0.15));
    pts.push(new THREE.Vector2(1.65, 0.5));
    pts.push(new THREE.Vector2(1.68, 1.0));
    pts.push(new THREE.Vector2(1.7, 1.5));
    pts.push(new THREE.Vector2(1.72, 2.0));
    pts.push(new THREE.Vector2(1.73, 2.5));
    pts.push(new THREE.Vector2(1.72, 3.0));
    pts.push(new THREE.Vector2(1.7, 3.3));
    // Rim
    pts.push(new THREE.Vector2(1.75, 3.45));
    pts.push(new THREE.Vector2(1.78, 3.5));
    pts.push(new THREE.Vector2(1.78, 3.55));
    pts.push(new THREE.Vector2(1.73, 3.58));
    // Inner rim
    pts.push(new THREE.Vector2(1.55, 3.55));
    pts.push(new THREE.Vector2(1.55, 3.5));
    pts.push(new THREE.Vector2(1.55, 3.3));
    pts.push(new THREE.Vector2(0, 3.3));

    return new THREE.LatheGeometry(pts, 64);
  }, []);

  return (
    <mesh ref={meshRef} geometry={mugShape} castShadow receiveShadow>
      {texture ? (
        <meshStandardMaterial
          map={texture}
          color={bodyColor}
          roughness={0.3}
          metalness={0.05}
          envMapIntensity={0.6}
        />
      ) : (
        <meshStandardMaterial
          color={bodyColor}
          roughness={0.3}
          metalness={0.05}
          envMapIntensity={0.6}
        />
      )}
    </mesh>
  );
}

// Mug handle — a torus-like shape
function MugHandle({ mugColor }: { mugColor: string }) {
  const handleRef = useRef<THREE.Mesh>(null);

  const handleGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.72, 2.9, 0),
      new THREE.Vector3(2.3, 2.7, 0),
      new THREE.Vector3(2.5, 2.2, 0),
      new THREE.Vector3(2.5, 1.7, 0),
      new THREE.Vector3(2.3, 1.2, 0),
      new THREE.Vector3(1.72, 1.0, 0),
    ]);
    return new THREE.TubeGeometry(curve, 20, 0.15, 12, false);
  }, []);

  return (
    <mesh ref={handleRef} geometry={handleGeo} castShadow>
      <meshStandardMaterial
        color={mugColor}
        roughness={0.3}
        metalness={0.05}
      />
    </mesh>
  );
}

// Interior of the mug
function MugInterior() {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0, 3.3));
    pts.push(new THREE.Vector2(1.5, 3.3));
    pts.push(new THREE.Vector2(1.5, 3.0));
    pts.push(new THREE.Vector2(1.48, 2.5));
    pts.push(new THREE.Vector2(1.45, 1.5));
    pts.push(new THREE.Vector2(1.42, 0.5));
    pts.push(new THREE.Vector2(1.4, 0.2));
    pts.push(new THREE.Vector2(0, 0.2));
    return new THREE.LatheGeometry(pts, 64);
  }, []);

  return (
    <mesh geometry={geo}>
      <meshStandardMaterial
        color="#f5f0e8"
        roughness={0.5}
        metalness={0}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export default function Mug3DScene({ designTexture, mugColor, autoRotate }: Mug3DSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.7, 0]}>
      <MugBody designTexture={designTexture} mugColor={mugColor} />
      <MugHandle mugColor={mugColor} />
      <MugInterior />
    </group>
  );
}
