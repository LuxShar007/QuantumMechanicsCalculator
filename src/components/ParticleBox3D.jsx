import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line, Box } from '@react-three/drei';
import * as THREE from 'three';

function WaveString({ n, length = 10, amplitude = 2, color = "#8b5cf6", isProbability = false }) {
    const points = useMemo(() => {
        const pts = [];
        // Normalized x from -length/2 to length/2
        const segments = 100;
        const halfL = length / 2;

        for (let i = 0; i <= segments; i++) {
            const x = (i / segments) * length - halfL;
            // Map x to 0..PI for sin calculation
            // sin(n * pi * (x + halfL) / length)
            const normalizedX = (x + halfL) / length;
            let y = Math.sin(n * Math.PI * normalizedX);

            if (isProbability) {
                y = y * y; // Psi squared
            }

            pts.push(new THREE.Vector3(x, y * amplitude, 0));
        }
        return pts;
    }, [n, length, amplitude, isProbability]);

    const lineRef = useRef();

    useFrame(({ clock }) => {
        if (lineRef.current && !isProbability) {
            // Simple phase oscillation if we wanted time dependence, 
            // but stationary states are standing waves. 
            // The geometric shape stays, but the real/imag parts rotate. 
            // For a pure real plot of Psi, it oscillates up/down in time (Re part).
            // Let's settle for a static 'envelope' or simple oscillation.
            lineRef.current.scale.y = Math.cos(clock.getElapsedTime() * 2);
        }
    });

    return (
        <Line
            ref={lineRef}
            points={points}
            color={color}
            lineWidth={3}
        />
    );
}

export default function ParticleBox3D({ n = 1, length = 1 }) {
    // scale length for viz
    const vizLength = 8;

    return (
        <div className="w-full h-[400px] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
            <div className="absolute top-4 left-4 z-10 text-xs text-slate-400 font-mono pointer-events-none">
                <div className="flex gap-4">
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-purple-500 rounded-sm"></span> Ψ (Wave Function)
                    </span>
                    <span className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-indigo-500/50 rounded-sm"></span> |Ψ|² (Probability)
                    </span>
                </div>
            </div>

            <Canvas camera={{ position: [0, 2, 12], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Box Container */}
                <group>
                    {/* Visual Box */}
                    <Box args={[vizLength, 4, 4]} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#334155" wireframe transparent opacity={0.3} />
                    </Box>
                    <Text position={[0, -2.5, 0]} fontSize={0.4} color="#94a3b8">L = {length.toExponential(1)} m</Text>
                </group>

                {/* Wave Function (Oscillating) */}
                <group position={[0, 0, 0]}>
                    <WaveString n={n} length={vizLength} amplitude={1.5} color="#a78bfa" />
                </group>

                {/* Probability Density (Static on floor) */}
                <group position={[0, -1.8, 0]}>
                    <WaveString n={n} length={vizLength} amplitude={1.5} color="#6366f1" isProbability={true} />
                </group>

                {/* Nodes markers (optional) */}

                <OrbitControls enableZoom={true} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 1.5} />
            </Canvas>
        </div>
    );
}
