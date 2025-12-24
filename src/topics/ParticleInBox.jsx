import React, { useState, useMemo } from 'react';
import { InlineMath, BlockMath } from '../components/MathDisplay';
import { formatHumanReadable } from '../utils/units';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ScientificInput from '../components/ScientificInput';
import ParticleBox3D from '../components/ParticleBox3D';
import * as tf from '@tensorflow/tfjs';

export default function ParticleInBox() {
    // Store everything in SI Units
    const [length, setLength] = useState(1e-9); // 1 nm
    const [mass, setMass] = useState(9.10938356e-31); // Electron mass
    const [n, setN] = useState(1);
    const [nFinal, setNFinal] = useState(null);

    // Constants
    const h = 6.626e-34;
    const eVtoJ = 1.602e-19;

    // Calculation (Standard SI)
    const calculateEnergy = (qNum) => {
        if (!qNum) return 0;
        return (Math.pow(qNum, 2) * Math.pow(h, 2)) / (8 * mass * Math.pow(length, 2));
    };

    const energy = calculateEnergy(n);
    const energyFinal = nFinal ? calculateEnergy(nFinal) : null;
    const deltaE = energyFinal ? (energyFinal - energy) : null;
    const lambda = (2 * length) / n;

    // Visualization Data
    const graphData = useMemo(() => {
        return tf.tidy(() => {
            const numPoints = 100;
            const xTensor = tf.linspace(0, length, numPoints);
            const prefactor = Math.sqrt(2 / length);

            const argument = xTensor.mul(n * Math.PI).div(length);
            const psi = argument.sin().mul(prefactor);
            const prob = psi.square();

            let psi2 = null;
            if (nFinal) {
                const arg2 = xTensor.mul(nFinal * Math.PI).div(length);
                psi2 = arg2.sin().mul(prefactor);
            }

            const xVals = xTensor.dataSync();
            const psiVals = psi.dataSync();
            const probVals = prob.dataSync();
            const psi2Vals = psi2 ? psi2.dataSync() : null;

            const data = [];
            for (let i = 0; i < numPoints; i++) {
                data.push({
                    x: xVals[i] * 1e9, // Plot in nm for readability
                    psi: psiVals[i],
                    prob: probVals[i],
                    psi2: psi2Vals ? psi2Vals[i] : null
                });
            }
            return data;
        });
    }, [length, n, nFinal, mass]);

    // Presets
    const setExample20_12 = () => {
        setMass(9.109e-31);
        setLength(0.1e-9);
        setN(1);
        setNFinal(4);
    };
    const setExample20_13 = () => {
        setMass(9.109e-31);
        setLength(1e-9);
        setN(1);
        setNFinal(2);
    };
    const setExample20_14 = () => {
        setMass(9.109e-31);
        setLength(1e-10);
        setN(1);
        setNFinal(null);
    };
    const setExample20_15_Dust = () => {
        setMass(1e-9); // 1e-6 g
        setLength(1e-4); // 0.1 mm
        setN(1);
        setNFinal(2);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Particle in a Rigid Box</h2>
                <div className="flex flex-wrap gap-2 text-sm">
                    <button onClick={setExample20_12} className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors">Ex 20.12</button>
                    <button onClick={setExample20_13} className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors">Ex 20.13</button>
                    <button onClick={setExample20_14} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors">Ex 20.14</button>
                    <button onClick={setExample20_15_Dust} className="px-3 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors">Ex 20.15 (Macroscopic)</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">System Parameters</h3>
                        <div className="space-y-4">
                            <ScientificInput
                                label="Box Length (L)"
                                valueSI={length}
                                onChange={setLength}
                                type="length"
                                defaultUnit="nm"
                            />
                            <ScientificInput
                                label="Particle Mass (m)"
                                valueSI={mass}
                                onChange={setMass}
                                type="mass"
                                defaultUnit="me"
                            />

                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">State n₁</label>
                                    <input
                                        type="number" min="1" step="1"
                                        value={n}
                                        onChange={(e) => setN(parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-200 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">State n₂ (Opt)</label>
                                    <input
                                        type="number" min="1" step="1"
                                        value={nFinal || ''}
                                        placeholder="-"
                                        onChange={(e) => setNFinal(e.target.value ? parseInt(e.target.value) : null)}
                                        className="w-full px-3 py-2 border border-gray-200 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-900 text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-gray-100 dark:border-dark-700 space-y-4">
                            <div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Energy (n={n})</div>
                                <div className="text-xl font-bold text-science-600 dark:text-science-400">{formatHumanReadable(energy / eVtoJ)} eV</div>
                                <div className="text-xs text-gray-400 font-mono">= {formatHumanReadable(energy)} J</div>
                            </div>
                            {energyFinal !== null && (
                                <div className="bg-gray-50 dark:bg-dark-900 p-3 rounded text-sm">
                                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                                        <span>ΔE:</span>
                                        <span className="font-bold">{formatHumanReadable(Math.abs(deltaE) / eVtoJ)} eV</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    {/* 3D Viz */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-1 overflow-hidden">
                        <ParticleBox3D n={n} length={length} />
                    </div>

                    <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6">
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={graphData} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="x" label={{ value: 'Position (nm)', position: 'insideBottom', offset: -10 }} />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="psi" stroke="#8b5cf6" strokeWidth={3} dot={false} name={`Ψ (n=${n})`} />
                                    <Line type="monotone" dataKey="prob" stroke="#8b5cf6" strokeWidth={1} strokeDasharray="5 5" dot={false} name={`|Ψ|²`} />
                                    {nFinal && <Line type="monotone" dataKey="psi2" stroke="#ec4899" strokeWidth={2} dot={false} name={`Ψ (n=${nFinal})`} />}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
