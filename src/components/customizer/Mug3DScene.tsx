import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Mug3DSceneProps {
  designTexture: HTMLCanvasElement | null;
  mugColor: string;
  autoRotate: boolean;
}

/**
 * Realistic 11oz ceramic mug — straight-walled cylinder with slight taper,
 * matching the classic sublimation mug shape from reference photos.
 *
 * Real 11oz mug proportions (≈):
 *   Height: 95mm, Top diameter: 82mm, Bottom diameter: 75mm
 *   Wall thickness: ~4mm, Rim: rounded ~2mm
 *
 * We scale to scene units where 1 unit ≈ 25mm.
 */

const SEG = 128; // lathe segments

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

  // Outer shell profile — from bottom center to rim, then inner wall
  const mugShape = useMemo(() => {
    const pts: THREE.Vector2[] = [];

    // ---- Bottom ----
    pts.push(new THREE.Vector2(0, 0)); // center of base
    pts.push(new THREE.Vector2(1.48, 0)); // base radius
    pts.push(new THREE.Vector2(1.50, 0.01)); // base edge rounding
    pts.push(new THREE.Vector2(1.52, 0.04));

    // ---- Outer wall — nearly straight with very subtle taper ----
    // Bottom ø ≈ 3.00 units, Top ø ≈ 3.28 units (slight taper outward)
    pts.push(new THREE.Vector2(1.52, 0.10));
    pts.push(new THREE.Vector2(1.53, 0.30));
    pts.push(new THREE.Vector2(1.54, 0.60));
    pts.push(new THREE.Vector2(1.56, 1.00));
    pts.push(new THREE.Vector2(1.58, 1.40));
    pts.push(new THREE.Vector2(1.59, 1.80));
    pts.push(new THREE.Vector2(1.61, 2.20));
    pts.push(new THREE.Vector2(1.62, 2.60));
    pts.push(new THREE.Vector2(1.63, 2.90));
    pts.push(new THREE.Vector2(1.64, 3.10));
    pts.push(new THREE.Vector2(1.64, 3.30));

    // ---- Rim — smooth rounded lip ----
    pts.push(new THREE.Vector2(1.65, 3.42));
    pts.push(new THREE.Vector2(1.67, 3.50));
    pts.push(new THREE.Vector2(1.68, 3.54));
    pts.push(new THREE.Vector2(1.68, 3.57));
    pts.push(new THREE.Vector2(1.67, 3.60));
    pts.push(new THREE.Vector2(1.65, 3.62));
    pts.push(new THREE.Vector2(1.62, 3.62));

    // ---- Inner wall top (leading back inside) ----
    pts.push(new THREE.Vector2(1.54, 3.58));
    pts.push(new THREE.Vector2(1.52, 3.52));
    pts.push(new THREE.Vector2(1.52, 3.40));
    pts.push(new THREE.Vector2(0, 3.40));

    return new THREE.LatheGeometry(pts, SEG);
  }, []);

  const materialProps = {
    color: bodyColor,
    roughness: 0.22,
    metalness: 0,
    clearcoat: 0.7,
    clearcoatRoughness: 0.08,
    reflectivity: 0.95,
    envMapIntensity: 1.6,
    sheen: 0.03,
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
    // Classic C-shaped handle — wider, rounder, matching reference photo
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.64, 3.05, 0),   // top attachment (near rim)
      new THREE.Vector3(1.90, 3.00, 0),
      new THREE.Vector3(2.15, 2.80, 0),
      new THREE.Vector3(2.30, 2.50, 0),
      new THREE.Vector3(2.38, 2.10, 0),   // widest point
      new THREE.Vector3(2.35, 1.70, 0),
      new THREE.Vector3(2.22, 1.35, 0),
      new THREE.Vector3(2.00, 1.10, 0),
      new THREE.Vector3(1.75, 0.95, 0),
      new THREE.Vector3(1.64, 0.85, 0),   // bottom attachment
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.13, 16, false);
  }, []);

  return (
    <mesh geometry={handleGeo} castShadow>
      <meshPhysicalMaterial
        color={mugColor}
        roughness={0.22}
        metalness={0}
        clearcoat={0.7}
        clearcoatRoughness={0.08}
        reflectivity={0.95}
        envMapIntensity={1.6}
      />
    </mesh>
  );
}

function MugInterior() {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0, 3.40));
    pts.push(new THREE.Vector2(1.48, 3.40));
    pts.push(new THREE.Vector2(1.48, 3.20));
    pts.push(new THREE.Vector2(1.46, 2.60));
    pts.push(new THREE.Vector2(1.44, 2.00));
    pts.push(new THREE.Vector2(1.42, 1.40));
    pts.push(new THREE.Vector2(1.40, 0.80));
    pts.push(new THREE.Vector2(1.38, 0.30));
    pts.push(new THREE.Vector2(1.36, 0.15));
    pts.push(new THREE.Vector2(0, 0.15));
    return new THREE.LatheGeometry(pts, SEG);
  }, []);

  return (
    <mesh geometry={geo} receiveShadow>
      <meshPhysicalMaterial
        color="#f5f1ea"
        roughness={0.4}
        metalness={0}
        clearcoat={0.25}
        clearcoatRoughness={0.2}
        envMapIntensity={0.7}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function MugBottom({ mugColor }: { mugColor: string }) {
  return (
    <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[1.48, 64]} />
      <meshPhysicalMaterial
        color={mugColor}
        roughness={0.55}
        metalness={0}
        envMapIntensity={0.4}
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
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.8, 0]}>
      <MugBody designTexture={designTexture} mugColor={mugColor} />
      <MugHandle mugColor={mugColor} />
      <MugInterior />
      <MugBottom mugColor={mugColor} />
    </group>
  );
}
