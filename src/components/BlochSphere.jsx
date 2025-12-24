import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function StateVector({ theta, phi }) {
    // Convert spherical (physics convention: Z is up) to Three.js (Y is up)
    // Bloch Sphere: |0> is usually Z+ (North), |1> is Z- (South).
    // Let's align visual Y+ with |0> for simplicity in Three.js default camera.
    // |0> = Y+ (0, 1, 0)
    // |1> = Y- (0, -1, 0)
    // theta is angle from |0> (Y+).
    // phi is angle around Y axis (in XZ plane).

    // Coordinates:
    // y = cos(theta)
    // x = sin(theta) * cos(phi)
    // z = sin(theta) * sin(phi)

    const x = Math.sin(theta) * Math.cos(phi);
    const y = Math.cos(theta);
    const z = Math.sin(theta) * Math.sin(phi);

    const endPoint = new THREE.Vector3(x, y, z);
    const origin = new THREE.Vector3(0, 0, 0);

    return (
        <group>
            {/* The Arrow Shaft */}
            <Line
                points={[origin, endPoint]}
                color="#ec4899" // Pink/Magenta for the quantum state
                lineWidth={3}
            />
            {/* The Arrow Head */}
            <mesh position={[x, y, z]} rotation={[0, -phi, 0]}>
                {/* LookAt logic is simpler with a library helper, but manual sphere marker is fine */}
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={0.5} />
            </mesh>

            {/* Projection Line to XZ Plane (Helpful for Phase) */}
            <Line
                points={[endPoint, new THREE.Vector3(x, -1, z)]}
                color="#475569"
                lineWidth={1}
                dashed
                dashScale={2}
            />
        </group>
    );
}

function GridSphere() {
    return (
        <group>
            {/* Main Transparent Sphere */}
            <Sphere args={[1, 32, 32]}>
                <meshStandardMaterial
                    color="#1e293b" // Slate 800
                    transparent
                    opacity={0.1}
                    wireframe={false}
                />
            </Sphere>
            {/* Wireframe Overlay */}
            <Sphere args={[1, 16, 16]}>
                <meshBasicMaterial
                    color="#334155" // Slate 700
                    wireframe
                    transparent
                    opacity={0.3}
                />
            </Sphere>
            {/* Equator Ring */}
            <Line
                points={new THREE.EllipseCurve(0, 0, 1, 1, 0, 2 * Math.PI, false, 0).getPoints(50).map(p => new THREE.Vector3(p.x, 0, p.y))}
                color="#64748b"
                lineWidth={1}
            />
        </group>
    );
}

function Axes() {
    return (
        <group>
            {/* Y Axis (|0> to |1>) */}
            <Line points={[new THREE.Vector3(0, 1.2, 0), new THREE.Vector3(0, -1.2, 0)]} color="#94a3b8" lineWidth={1} transparent opacity={0.5} />
            <Text position={[0, 1.3, 0]} fontSize={0.2} color="white">|0⟩</Text>
            <Text position={[0, -1.3, 0]} fontSize={0.2} color="white">|1⟩</Text>

            {/* X Axis (|+>) */}
            <Line points={[new THREE.Vector3(1.2, 0, 0), new THREE.Vector3(-1.2, 0, 0)]} color="#94a3b8" lineWidth={1} transparent opacity={0.5} />
            <Text position={[1.3, 0, 0]} fontSize={0.15} color="#94a3b8">+x</Text>

            {/* Z Axis (|+i>) */}
            <Line points={[new THREE.Vector3(0, 0, 1.2), new THREE.Vector3(0, 0, -1.2)]} color="#94a3b8" lineWidth={1} transparent opacity={0.5} />
            <Text position={[0, 0, 1.3]} fontSize={0.15} color="#94a3b8">+y</Text>
        </group>
    );
}

export default function BlochSphere({ theta = 0, phi = 0 }) {
    return (
        <div className="w-full h-[400px] bg-slate-950 rounded-xl overflow-hidden relative border border-slate-800">
            <div className="absolute top-4 left-4 z-10 text-xs text-slate-400 font-mono pointer-events-none">
                <div>θ: {(theta * 180 / Math.PI).toFixed(1)}°</div>
                <div>φ: {(phi * 180 / Math.PI).toFixed(1)}°</div>
                <div className="text-science-400 mt-1">Drag to Rotate</div>
            </div>
            <Canvas camera={{ position: [2, 1.5, 2.5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Axes />
                <GridSphere />
                <StateVector theta={theta} phi={phi} />

                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div>
    );
}
