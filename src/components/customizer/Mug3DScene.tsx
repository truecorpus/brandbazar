import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Mug3DSceneProps {
  designTexture: HTMLCanvasElement | null;
  mugColor: string;
  autoRotate: boolean;
}

/**
 * Realistic 11oz ceramic mug — nearly straight cylinder matching reference photos.
 * Real mug: Height ~95mm, Top Ø ~82mm, Bottom Ø ~76mm — very subtle taper.
 * Scene units: 1 unit ≈ 1 arbitrary, scaled to fit nicely in viewport.
 */

const SEG = 128;

function MugBody({
  designTexture,
  mugColor,
}: {
  designTexture: HTMLCanvasElement | null;
  mugColor: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useMemo(() => {
    if (!designTexture) return null;
    const t = new THREE.CanvasTexture(designTexture);
    t.needsUpdate = true;
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.ClampToEdgeWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 16;
    return t;
  }, [designTexture]);

  useFrame(() => {
    if (texture && designTexture) {
      texture.needsUpdate = true;
    }
  });

  const bodyColor = new THREE.Color(mugColor);

  const mugShape = useMemo(() => {
    const pts: THREE.Vector2[] = [];

    // Scale: mug is about 2.4 units tall, ~1.0 radius
    // Real 11oz mug is almost a straight cylinder with very minimal taper

    // ---- Base disc center ----
    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(0.92, 0));       // base radius
    pts.push(new THREE.Vector2(0.94, 0.01));     // tiny base rounding
    pts.push(new THREE.Vector2(0.95, 0.03));

    // ---- Outer wall — nearly straight ----
    pts.push(new THREE.Vector2(0.95, 0.08));
    pts.push(new THREE.Vector2(0.955, 0.30));
    pts.push(new THREE.Vector2(0.96, 0.60));
    pts.push(new THREE.Vector2(0.965, 0.90));
    pts.push(new THREE.Vector2(0.97, 1.20));
    pts.push(new THREE.Vector2(0.975, 1.50));
    pts.push(new THREE.Vector2(0.98, 1.80));
    pts.push(new THREE.Vector2(0.985, 2.00));
    pts.push(new THREE.Vector2(0.99, 2.15));
    pts.push(new THREE.Vector2(0.99, 2.25));

    // ---- Rim — smooth rounded lip ----
    pts.push(new THREE.Vector2(0.995, 2.32));
    pts.push(new THREE.Vector2(1.005, 2.37));
    pts.push(new THREE.Vector2(1.01, 2.40));
    pts.push(new THREE.Vector2(1.01, 2.42));
    pts.push(new THREE.Vector2(1.005, 2.44));
    pts.push(new THREE.Vector2(0.995, 2.45));
    pts.push(new THREE.Vector2(0.98, 2.45));

    // ---- Inner lip going down ----
    pts.push(new THREE.Vector2(0.93, 2.43));
    pts.push(new THREE.Vector2(0.92, 2.40));
    pts.push(new THREE.Vector2(0.92, 2.35));
    pts.push(new THREE.Vector2(0, 2.35));

    return new THREE.LatheGeometry(pts, SEG);
  }, []);

  const materialProps = {
    color: bodyColor,
    roughness: 0.2,
    metalness: 0,
    clearcoat: 0.8,
    clearcoatRoughness: 0.06,
    reflectivity: 1.0,
    envMapIntensity: 1.8,
    sheen: 0.02,
    sheenColor: new THREE.Color("#ffffff"),
  };

  return (
    <mesh ref={meshRef} geometry={mugShape} castShadow receiveShadow>
      {texture ? (
        <meshPhysicalMaterial {...materialProps} map={texture} />
      ) : (
        <meshPhysicalMaterial {...materialProps} />
      )}
    </mesh>
  );
}

function MugHandle({ mugColor }: { mugColor: string }) {
  const handleGeo = useMemo(() => {
    // Classic C-handle — proportional to the smaller mug body
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.99, 2.05, 0),    // top attach near rim
      new THREE.Vector3(1.18, 2.00, 0),
      new THREE.Vector3(1.35, 1.85, 0),
      new THREE.Vector3(1.45, 1.60, 0),
      new THREE.Vector3(1.48, 1.30, 0),     // widest point
      new THREE.Vector3(1.45, 1.00, 0),
      new THREE.Vector3(1.35, 0.78, 0),
      new THREE.Vector3(1.18, 0.62, 0),
      new THREE.Vector3(1.05, 0.55, 0),
      new THREE.Vector3(0.99, 0.50, 0),     // bottom attach
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.08, 16, false);
  }, []);

  return (
    <mesh geometry={handleGeo} castShadow>
      <meshPhysicalMaterial
        color={mugColor}
        roughness={0.2}
        metalness={0}
        clearcoat={0.8}
        clearcoatRoughness={0.06}
        reflectivity={1.0}
        envMapIntensity={1.8}
      />
    </mesh>
  );
}

function MugInterior() {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0, 2.35));
    pts.push(new THREE.Vector2(0.88, 2.35));
    pts.push(new THREE.Vector2(0.88, 2.20));
    pts.push(new THREE.Vector2(0.87, 1.80));
    pts.push(new THREE.Vector2(0.86, 1.40));
    pts.push(new THREE.Vector2(0.85, 1.00));
    pts.push(new THREE.Vector2(0.84, 0.60));
    pts.push(new THREE.Vector2(0.83, 0.25));
    pts.push(new THREE.Vector2(0.82, 0.12));
    pts.push(new THREE.Vector2(0, 0.12));
    return new THREE.LatheGeometry(pts, SEG);
  }, []);

  return (
    <mesh geometry={geo} receiveShadow>
      <meshPhysicalMaterial
        color="#f0ece5"
        roughness={0.35}
        metalness={0}
        clearcoat={0.2}
        clearcoatRoughness={0.25}
        envMapIntensity={0.6}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function MugBottom({ mugColor }: { mugColor: string }) {
  return (
    <mesh position={[0, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[0.92, 64]} />
      <meshPhysicalMaterial
        color={mugColor}
        roughness={0.5}
        metalness={0}
        envMapIntensity={0.3}
      />
    </mesh>
  );
}

export default function Mug3DScene({
  designTexture,
  mugColor,
  autoRotate,
}: Mug3DSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      <MugBody designTexture={designTexture} mugColor={mugColor} />
      <MugHandle mugColor={mugColor} />
      <MugInterior />
      <MugBottom mugColor={mugColor} />
    </group>
  );
}
