import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Float, Sparkles, Html } from '@react-three/drei';

function MysticTree() {
  const { scene } = useGLTF('/models/mystic_tree.glb');

  return (
    <primitive 
      object={scene} 
      scale={2} 
      position={[0, -1.5, 0]} 
    />
  );
}

function Loader() {
  return (
    <Html center style={{ color: '#7dd3fc', fontFamily: 'serif', whiteSpace: 'nowrap' }}>
      <span>⏳ Cargando Árbol Místico...</span>
    </Html>
  );
}

useGLTF.preload('/models/mystic_tree.glb');

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#090d16', margin: 0, padding: 0, overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        {/* Luces cálidas y místicas para destacar los follajes */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} color="#38bdf8" />
        <pointLight position={[-5, 2, -2]} intensity={1} color="#a5f3fc" />

        <Suspense fallback={<Loader />}>
          <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
            <MysticTree />
          </Float>
        </Suspense>

        {/* Partículas flotando alrededor del árbol */}
        <Sparkles count={80} scale={6} size={3} speed={0.3} color="#7dd3fc" />

        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}