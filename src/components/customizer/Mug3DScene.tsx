import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Mug3DSceneProps {
  designTexture: HTMLCanvasElement | null;
  mugColor: string;
  autoRotate: boolean;
}

function MugBody({ designTexture, mugColor }: { designTexture: HTMLCanvasElement | null; mugColor: string }) {
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
    // Bottom flat
    pts.push(new THREE.Vector2(0, 0));
    pts.push(new THREE.Vector2(1.50, 0));
    pts.push(new THREE.Vector2(1.55, 0.02));
    pts.push(new THREE.Vector2(1.58, 0.06));
    // Lower body — subtle taper
    pts.push(new THREE.Vector2(1.60, 0.12));
    pts.push(new THREE.Vector2(1.62, 0.30));
    pts.push(new THREE.Vector2(1.64, 0.60));
    pts.push(new THREE.Vector2(1.66, 1.00));
    pts.push(new THREE.Vector2(1.68, 1.40));
    pts.push(new THREE.Vector2(1.69, 1.80));
    pts.push(new THREE.Vector2(1.70, 2.20));
    pts.push(new THREE.Vector2(1.71, 2.60));
    pts.push(new THREE.Vector2(1.72, 3.00));
    pts.push(new THREE.Vector2(1.71, 3.20));
    // Rim — rounded lip
    pts.push(new THREE.Vector2(1.73, 3.35));
    pts.push(new THREE.Vector2(1.76, 3.44));
    pts.push(new THREE.Vector2(1.78, 3.48));
    pts.push(new THREE.Vector2(1.79, 3.52));
    pts.push(new THREE.Vector2(1.78, 3.56));
    pts.push(new THREE.Vector2(1.75, 3.58));
    pts.push(new THREE.Vector2(1.70, 3.58));
    // Inner wall top
    pts.push(new THREE.Vector2(1.58, 3.55));
    pts.push(new THREE.Vector2(1.56, 3.50));
    pts.push(new THREE.Vector2(1.56, 3.30));
    pts.push(new THREE.Vector2(0, 3.30));

    return new THREE.LatheGeometry(pts, 128);
  }, []);

  const materialProps = {
    color: bodyColor,
    roughness: 0.28,
    metalness: 0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    reflectivity: 0.9,
    envMapIntensity: 1.5,
    sheen: 0.05,
    sheenColor: new THREE.Color("#ffffff"),
  };

  return (
    <mesh ref={meshRef} geometry={mugShape} castShadow receiveShadow>
      {texture ? (
        <meshPhysicalMaterial
          {...materialProps}
          map={texture}
        />
      ) : (
        <meshPhysicalMaterial {...materialProps} />
      )}
    </mesh>
  );
}

function MugHandle({ mugColor }: { mugColor: string }) {
  const handleGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.72, 2.95, 0),
      new THREE.Vector3(2.15, 2.80, 0),
      new THREE.Vector3(2.40, 2.45, 0),
      new THREE.Vector3(2.48, 2.00, 0),
      new THREE.Vector3(2.45, 1.55, 0),
      new THREE.Vector3(2.30, 1.20, 0),
      new THREE.Vector3(2.05, 1.00, 0),
      new THREE.Vector3(1.72, 0.95, 0),
    ]);
    return new THREE.TubeGeometry(curve, 32, 0.14, 16, false);
  }, []);

  return (
    <mesh geometry={handleGeo} castShadow>
      <meshPhysicalMaterial
        color={mugColor}
        roughness={0.28}
        metalness={0}
        clearcoat={0.6}
        clearcoatRoughness={0.1}
        reflectivity={0.9}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function MugInterior() {
  const geo = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0, 3.30));
    pts.push(new THREE.Vector2(1.52, 3.30));
    pts.push(new THREE.Vector2(1.52, 3.10));
    pts.push(new THREE.Vector2(1.50, 2.60));
    pts.push(new THREE.Vector2(1.48, 2.00));
    pts.push(new THREE.Vector2(1.46, 1.40));
    pts.push(new THREE.Vector2(1.44, 0.80));
    pts.push(new THREE.Vector2(1.42, 0.30));
    pts.push(new THREE.Vector2(1.40, 0.15));
    pts.push(new THREE.Vector2(0, 0.15));
    return new THREE.LatheGeometry(pts, 128);
  }, []);

  return (
    <mesh geometry={geo} receiveShadow>
      <meshPhysicalMaterial
        color="#f8f4ee"
        roughness={0.45}
        metalness={0}
        clearcoat={0.3}
        clearcoatRoughness={0.2}
        envMapIntensity={0.8}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Bottom disc
function MugBottom({ mugColor }: { mugColor: string }) {
  return (
    <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[1.50, 64]} />
      <meshPhysicalMaterial
        color={mugColor}
        roughness={0.6}
        metalness={0}
        envMapIntensity={0.5}
      />
    </mesh>
  );
}

export default function Mug3DScene({ designTexture, mugColor, autoRotate }: Mug3DSceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.75, 0]}>
      <MugBody designTexture={designTexture} mugColor={mugColor} />
      <MugHandle mugColor={mugColor} />
      <MugInterior />
      <MugBottom mugColor={mugColor} />
    </group>
  );
}
