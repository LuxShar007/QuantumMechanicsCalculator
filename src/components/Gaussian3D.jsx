import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

function GaussianCurve({ sigma = 1, color = "#a855f7" }) {
    const points = useMemo(() => {
        const pts = [];
        // Range -5 to 5
        for (let x = -5; x <= 5; x += 0.1) {
            // Gaussian: exp(-x^2 / (2*sigma^2))
            // Height scaled for visibility
            const y = Math.exp(-(x * x) / (2 * sigma * sigma)) * 2;
            pts.push(new THREE.Vector3(x, y, 0));
        }
        return pts;
    }, [sigma]);

    return (
        <Line
            points={points}
            color={color}
            lineWidth={4}
        />
    );
}

function GaussianSurface({ sigma = 1, color = "#a855f7" }) {
    // extruded shape or just a filled mesh under the curve
    const geometry = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(-5, 0);
        for (let x = -5; x <= 5; x += 0.1) {
            const y = Math.exp(-(x * x) / (2 * sigma * sigma)) * 2;
            shape.lineTo(x, y);
        }
        shape.lineTo(5, 0);
        shape.lineTo(-5, 0);

        const extrudeSettings = { depth: 1, bevelEnabled: false };
        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }, [sigma]);

    return (
        <mesh position={[0, 0, -0.5]} geometry={geometry}>
            <meshStandardMaterial
                color={color}
                transparent
                opacity={0.6}
                roughness={0.2}
                metalness={0.8}
            />
        </mesh>
    );
}

export default function Gaussian3D({ sigmaX = 1, sigmaP = 1 }) {
    return (
        <div className="w-full h-[400px] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
            <div className="absolute top-4 left-4 z-10 text-xs text-slate-400 font-mono pointer-events-none">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-purple-500 rounded-sm"></span>
                        <span>Position Δx</span>
                    </div>
                    {/* Momentum is inverse usually, visualization can show both or switch */}
                </div>
            </div>

            <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                {/* Ground Grid */}
                <gridHelper args={[20, 20, "#1e293b", "#0f172a"]} position={[0, 0, 0]} />

                {/* The main curve (Position) */}
                <group position={[0, 0, 1]}>
                    <Text position={[0, 2.5, 0]} fontSize={0.3} color="#d8b4fe">Position Distribution (Δx)</Text>
                    <GaussianSurface sigma={sigmaX} color="#a855f7" />
                    <GaussianCurve sigma={sigmaX} color="#ffffff" />
                </group>

                {/* The secondary curve (Momentum) - usually inverse relation */}
                <group position={[0, 0, -2]} scale={[1, 1, 1]}>
                    <Text position={[0, 2.5, 0]} fontSize={0.3} color="#6ee7b7">Momentum Distribution (Δp)</Text>
                    <GaussianSurface sigma={sigmaP} color="#10b981" />
                    <GaussianCurve sigma={sigmaP} color="#ffffff" />
                </group>

                <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />
            </Canvas>
        </div>
    );
}
