import React, { useState } from 'react';
import { InlineMath, BlockMath } from '../components/MathDisplay';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import BlochSphere from '../components/BlochSphere';

export default function Qubit() {
    const [alpha, setAlpha] = useState(0.707); // Default 1/sqrt(2)
    const beta = Math.sqrt(Math.max(0, 1 - alpha * alpha));

    const prob0 = alpha * alpha;
    const prob1 = beta * beta;

    // Calculate theta (polar angle) for Bloch Sphere
    // alpha = cos(theta/2) -> theta = 2 * acos(alpha)
    // Range: alpha 0->1 implies theta PI->0.
    // Usually |0> is North (theta=0). So if alpha=1, theta should be 0.
    const theta = 2 * Math.acos(alpha);

    const data = [
        { name: '|0⟩', prob: prob0 },
        { name: '|1⟩', prob: prob1 },
    ];

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-3xl bg-science-900 border border-science-800 text-white p-8 lg:p-12 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-science-500 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full blur-[100px] opacity-20 -ml-16 -mb-16"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-science-800/50 border border-science-700 text-science-200 text-xs font-bold uppercase tracking-wider mb-6">
                        Quantum Computing
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Qubits & <span className="text-transparent bg-clip-text bg-gradient-to-r from-science-300 to-pink-300">Superposition</span>
                    </h1>
                    <p className="text-science-100 text-lg max-w-2xl leading-relaxed">
                        The fundamental unit of quantum information. Unlike a classical bit (0 or 1), a qubit exists in a complex linear superposition of both states until observed.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Theory Column */}
                <div className="space-y-6">
                    {/* Concept Card */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 border border-neutral-100 dark:border-dark-700 shadow-sm md:hover:shadow-md transition-shadow">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-science-100 dark:bg-science-900/50 flex items-center justify-center text-science-600 dark:text-science-400 font-mono text-sm">01</span>
                            Superposition Principle
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            A qubit state <InlineMath math="|\psi\rangle" /> is a linear combination of the basis states <InlineMath math="|0\rangle" /> and <InlineMath math="|1\rangle" />:
                        </p>
                        <div className="bg-science-50 dark:bg-dark-900/50 p-6 rounded-xl text-center border border-science-100 dark:border-dark-800 mb-6">
                            <BlockMath math="|\psi\rangle = \alpha|0\rangle + \beta|1\rangle" />
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Here, coefficients <InlineMath math="\alpha" /> and <InlineMath math="\beta" /> are complex numbers (amplitudes), satisfying the normalization condition <InlineMath math="|\alpha|^2 + |\beta|^2 = 1" />.
                        </p>
                    </div>

                    {/* Classical vs Quantum */}
                    <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 border border-neutral-100 dark:border-dark-700 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Classical vs Quantum</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-900/50 border border-gray-100 dark:border-dark-700 text-center">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Classical Bit</div>
                                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">0 <span className="text-sm font-normal text-gray-400">or</span> 1</div>
                                <div className="text-xs text-gray-500">Binary State</div>
                            </div>
                            <div className="p-4 rounded-xl bg-gradient-to-br from-science-50 to-pink-50 dark:from-science-900/20 dark:to-pink-900/20 border border-science-100 dark:border-science-800 text-center">
                                <div className="text-xs font-bold text-science-500 uppercase tracking-wider mb-2">Qubit</div>
                                <div className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1 font-mono">α|0⟩ + β|1⟩</div>
                                <div className="text-xs text-science-600 dark:text-science-400">Infinite Possibilities</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Viz Column */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 border border-neutral-100 dark:border-dark-700 shadow-sm h-full flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-science-500 uppercase tracking-wider mb-1">Interactive Simulation</h3>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Measurement Probability</h2>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                                Adjust the amplitude <InlineMath math="\alpha" />. Note how probability is <InlineMath math="|\alpha|^2" />.
                            </p>
                        </div>

                        {/* Slider */}
                        <div className="mb-8">
                            <div className="flex justify-between text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                <span>State |0⟩ Dominant</span>
                                <span>State |1⟩ Dominant</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="1" step="0.01"
                                value={alpha}
                                onChange={(e) => setAlpha(parseFloat(e.target.value))}
                                className="w-full h-3 bg-gray-200 dark:bg-dark-700 rounded-full appearance-none cursor-pointer accent-science-600 hover:accent-science-500 transition-all"
                            />
                            <div className="flex justify-between mt-2 text-xs font-mono text-gray-400">
                                <span>α = 1, β = 0</span>
                                <span>α = 0, β = 1</span>
                            </div>
                        </div>

                        {/* 3D Bloch Sphere */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Bloch Sphere Representation (3D)</h3>
                            <BlochSphere theta={theta} phi={0} />
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                Visualizing the state vector <InlineMath math="|\psi\rangle" /> on the unit sphere.
                                <br />North Pole = <InlineMath math="|0\rangle" />, South Pole = <InlineMath math="|1\rangle" />.
                            </p>
                        </div>

                        {/* Chart */}
                        <div className="flex-1 min-h-[250px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                                    <XAxis
                                        dataKey="name"
                                        tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 'bold' }}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis
                                        hide
                                        domain={[0, 1]}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    />
                                    <Bar dataKey="prob" radius={[8, 8, 8, 8]} animationDuration={300}>
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#8b5cf6' : '#ec4899'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>

                            {/* Overlay Values */}
                            <div className="absolute top-0 w-full flex justify-around pointer-events-none">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-science-600 mb-1">{(prob0 * 100).toFixed(1)}%</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Probability P(0)</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-pink-500 mb-1">{(prob1 * 100).toFixed(1)}%</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Probability P(1)</div>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-neutral-100 dark:border-dark-700">
                            <div className="p-3 bg-neutral-50 dark:bg-dark-900 rounded-lg text-center">
                                <div className="text-xs text-gray-500 mb-1">Amplitude α</div>
                                <div className="font-mono font-bold text-gray-800 dark:text-gray-200">{alpha.toFixed(3)}</div>
                            </div>
                            <div className="p-3 bg-neutral-50 dark:bg-dark-900 rounded-lg text-center">
                                <div className="text-xs text-gray-500 mb-1">Amplitude β</div>
                                <div className="font-mono font-bold text-gray-800 dark:text-gray-200">{beta.toFixed(3)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
