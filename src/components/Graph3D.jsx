import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';

function DataPoint({ position, value, label }) {
    return (
        <group position={position}>
            <Sphere args={[0.15, 16, 16]}>
                <meshStandardMaterial
                    color="#f43f5e"
                    emissive="#f43f5e"
                    emissiveIntensity={0.5}
                />
            </Sphere>
            {(label) && (
                <Html position={[0, 0.3, 0]} center>
                    <div className="text-[10px] text-white bg-black/50 px-1 rounded backdrop-blur-sm pointer-events-none whitespace-nowrap">
                        {label}
                    </div>
                </Html>
            )}
        </group>
    );
}

export default function Graph3D({ data = [], xLabel = "X", yLabel = "Y", title = "3D Graph" }) {
    // Normalize data to fit in -5 to 5 box
    const normalizedPoints = useMemo(() => {
        if (!data.length) return [];

        const xValues = data.map(d => d.x);
        const yValues = data.map(d => d.y);

        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);

        return data.map(d => {
            // Map X to -4..4
            const nx = ((d.x - minX) / (maxX - minX || 1)) * 8 - 4;
            // Map Y to -2..4 (height)
            const ny = ((d.y - minY) / (maxY - minY || 1)) * 6 - 2;
            return {
                vec: new THREE.Vector3(nx, ny, 0),
                origX: d.x,
                origY: d.y
            };
        });
    }, [data]);

    const linePoints = useMemo(() => normalizedPoints.map(p => p.vec), [normalizedPoints]);

    return (
        <div className="w-full h-[400px] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
            <div className="absolute top-4 left-4 z-10 text-white font-bold">{title}</div>

            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Axes */}
                <group position={[-4.5, -3, 0]}>
                    <Line points={[[0, 0, 0], [9, 0, 0]]} color="#475569" lineWidth={2} />
                    <Line points={[[0, 0, 0], [0, 7, 0]]} color="#475569" lineWidth={2} />
                    <Text position={[9.5, 0, 0]} fontSize={0.3} color="#94a3b8">{xLabel}</Text>
                    <Text position={[0, 7.5, 0]} fontSize={0.3} color="#94a3b8">{yLabel}</Text>
                </group>

                {/* Data Line */}
                <Line points={linePoints} color="#60a5fa" lineWidth={3} />

                {/* Points */}
                {normalizedPoints.map((p, i) => (
                    // Show label only for start, end, and middle
                    <DataPoint
                        key={i}
                        position={p.vec}
                        value={p.origY}
                        label={(i === 0 || i === normalizedPoints.length - 1 || i === Math.floor(normalizedPoints.length / 2))
                            ? `${p.origY.toExponential(1)}`
                            : null}
                    />
                ))}

                <OrbitControls enableZoom={true} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />

                <gridHelper args={[20, 20, "#1e293b", "#0f172a"]} position={[0, -3, 0]} rotation={[0, 0, 0]} />
            </Canvas>
        </div>
    );
}
