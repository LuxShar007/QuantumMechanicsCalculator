import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Sphere, Html } from '@react-three/drei';

function Particle({ position, size, color, label, subLabel }) {
    const meshRef = useRef();

    useFrame((state) => {
        meshRef.current.rotation.y += 0.01;
        meshRef.current.rotation.x += 0.005;
    });

    return (
        <group position={position}>
            <Sphere ref={meshRef} args={[1, 32, 32]} scale={[size, size, size]}>
                <meshStandardMaterial
                    color={color}
                    roughness={0.3}
                    metalness={0.7}
                    emissive={color}
                    emissiveIntensity={0.2}
                />
            </Sphere>
            <Html position={[0, size + 0.5, 0]} center>
                <div className="pointer-events-none text-center min-w-[100px]">
                    <div className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded backdrop-blur-sm whitespace-nowrap">{label}</div>
                    <div className="text-gray-300 text-xs mt-1 bg-black/50 px-2 rounded backdrop-blur-sm">{subLabel}</div>
                </div>
            </Html>
        </group>
    );
}

export default function ParticleComparison3D({
    sizeA = 1, labelA = "Electron", subLabelA = "Microscopic",
    sizeB = 1, labelB = "Baseball", subLabelB = "Macroscopic"
}) {
    return (
        <div className="w-full h-[400px] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <spotLight position={[-10, 10, -10]} intensity={0.5} />

                {/* Particle A (Left) */}
                <Particle
                    position={[-2.5, 0, 0]}
                    size={sizeA}
                    color="#60a5fa"
                    label={labelA}
                    subLabel={subLabelA}
                />

                {/* Particle B (Right) */}
                <Particle
                    position={[2.5, 0, 0]}
                    size={sizeB}
                    color="#f472b6"
                    label={labelB}
                    subLabel={subLabelB}
                />

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
