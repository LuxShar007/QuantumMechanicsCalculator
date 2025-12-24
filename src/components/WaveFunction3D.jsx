import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

function ComplexWave({ k = 5, omega = 2, amplitude = 1 }) {
    const lineRef = useRef();
    const timeRef = useRef(0);

    // Create points for the helix
    const points = useMemo(() => {
        const ptrs = [];
        for (let x = -5; x <= 5; x += 0.05) {
            ptrs.push(new THREE.Vector3(x, 0, 0));
        }
        return ptrs;
    }, []);

    useFrame((state, delta) => {
        timeRef.current += delta * omega; // Time evolution

        const positions = lineRef.current.geometry.attributes.position.array;

        let i = 0;
        for (let x = -5; x <= 5; x += 0.05) {
            // psi = A * exp(i(kx - wt))
            // Re = A cos(kx - wt) -> Y axis
            // Im = A sin(kx - wt) -> Z axis

            const phase = k * x - timeRef.current;
            const re = amplitude * Math.cos(phase);
            const im = amplitude * Math.sin(phase);

            // Update Y and Z, keep X fixed
            positions[i * 3] = x;
            positions[i * 3 + 1] = re;
            positions[i * 3 + 2] = im;
            i++;
        }
        lineRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group>
            <line ref={lineRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={points.length}
                        array={new Float32Array(points.length * 3)} // Init empty
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#06b6d4" linewidth={3} toneMapped={false} />
            </line>
        </group>
    );
}

function AxesHelper() {
    return (
        <group>
            {/* X Axis (Position) */}
            <Line points={[new THREE.Vector3(-6, 0, 0), new THREE.Vector3(6, 0, 0)]} color="#475569" lineWidth={1} />
            <Text position={[6.2, 0, 0]} fontSize={0.3} color="#94a3b8">x</Text>

            {/* Y Axis (Real) */}
            <Line points={[new THREE.Vector3(0, -2, 0), new THREE.Vector3(0, 2, 0)]} color="#475569" lineWidth={1} dashed dashScale={2} />
            <Text position={[0, 2.2, 0]} fontSize={0.3} color="#22d3ee">Re</Text>

            {/* Z Axis (Imaginary) */}
            <Line points={[new THREE.Vector3(0, 0, -2), new THREE.Vector3(0, 0, 2)]} color="#475569" lineWidth={1} dashed dashScale={2} />
            <Text position={[0, 0, 2.2]} fontSize={0.3} color="#ec4899">Im</Text>
        </group>
    );
}

export default function WaveFunction3D({ k = 2, omega = 1, showImaginary = true }) {
    return (
        <div className="w-full h-[400px] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
            <div className="absolute top-4 left-4 z-10 text-xs text-slate-400 font-mono pointer-events-none">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-1 bg-cyan-500 rounded-full"></span>
                    <span>Complex Wave Function Ψ</span>
                </div>
                <div className="text-science-400 mt-2">Scale: Real (Y) vs Imag (Z)</div>
            </div>

            <Canvas camera={{ position: [4, 3, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <AxesHelper />
                <ComplexWave k={k} omega={omega} />
                <OrbitControls enableZoom={true} enablePan={true} />
            </Canvas>
        </div>
    );
}
