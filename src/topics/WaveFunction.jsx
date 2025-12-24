import React, { useState } from 'react';
import { InlineMath, BlockMath } from '../components/MathDisplay';
import { Activity, CheckCircle, XCircle } from 'lucide-react';
import WaveFunction3D from '../components/WaveFunction3D';

export default function WaveFunction() {
    const [k, setK] = useState(2);
    const [omega, setOmega] = useState(1);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="bg-white dark:bg-dark-800 rounded-3xl p-8 lg:p-12 border border-neutral-100 dark:border-dark-700 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-sm mb-4">
                        <Activity size={18} />
                        <span>Core Concept</span>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Wave Function <span className="text-science-600 dark:text-science-400">&</span> Probability</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mb-8">
                        The bridge between the quantum world and physical reality. While <InlineMath math="\Psi" /> itself is abstract, its square modulus <InlineMath math="|\Psi|^2" /> tells us where a particle is likely to be.
                    </p>

                    {/* 3D Visualization */}
                    <div className="bg-black/20 dark:bg-black/40 rounded-2xl p-6 backdrop-blur-sm border border-black/5 dark:border-white/5">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Interactive 3D Visualization</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <WaveFunction3D k={k} omega={omega} />
                            </div>
                            <div className="space-y-6 flex flex-col justify-center">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Wave Number (k)</label>
                                    <input
                                        type="range" min="1" max="10" step="0.1"
                                        value={k} onChange={(e) => setK(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-dark-600 rounded-lg appearance-none cursor-pointer accent-science-500"
                                    />
                                    <div className="text-xs text-gray-500 mt-1">Spatial frequency</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Angular Frequency (ω)</label>
                                    <input
                                        type="range" min="0.1" max="5" step="0.1"
                                        value={omega} onChange={(e) => setOmega(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-dark-600 rounded-lg appearance-none cursor-pointer accent-science-500"
                                    />
                                    <div className="text-xs text-gray-500 mt-1">Temporal oscillation speed</div>
                                </div>
                                <div className="p-4 bg-science-50 dark:bg-science-900/20 rounded-lg">
                                    <p className="text-sm text-science-800 dark:text-science-200 italic">
                                        "The Helix rotates in time. The Real (Y) and Imaginary (Z) parts oscillate, but the magnitude <InlineMath math="|A|" /> remains constant."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Significance Card */}
                <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 border border-neutral-100 dark:border-dark-700 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-science-100 dark:bg-science-900/30 flex items-center justify-center text-science-600 dark:text-science-400">
                            <Activity size={24} />
                        </div>
                        Physical Significance
                    </h2>

                    <div className="space-y-6">
                        <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-900/50 border border-gray-100 dark:border-dark-800">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">The Wave Function (<InlineMath math="\Psi" />)</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                A complex quantity that contains all the dynamic information about a system. It has no direct physical meaning and cannot be measured directly.
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-6 top-full h-8 w-px bg-gray-200 dark:bg-dark-700 -ml-px z-0"></div>
                            {/* Arrow indicator could go here */}
                        </div>

                        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Probability Density (<InlineMath math="|\Psi|^2" />)</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                                Max Born interpretation: The probability of finding the particle at position <InlineMath math="x" /> at time <InlineMath math="t" /> is proportional to the square of the absolute value of the wave function.
                            </p>
                            <div className="bg-white dark:bg-dark-900 rounded-lg p-3 text-center shadow-sm">
                                <BlockMath math="P(x,t) = |\Psi(x,t)|^2 = \Psi^* \cdot \Psi" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conditions Card */}
                <div className="bg-white dark:bg-dark-800 rounded-2xl p-8 border border-neutral-100 dark:border-dark-700 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
                            <CheckCircle size={24} />
                        </div>
                        Standard Conditions
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        For a wave function to be physically acceptable, it must satisfy well-behaved conditions:
                    </p>

                    <ul className="space-y-4">
                        {[
                            { title: 'Finite', desc: 'Must not go to infinity anywhere.', math: '\\Psi \\to \\text{finite}' },
                            { title: 'Single-Valued', desc: 'Only one probability value per position.', math: '\\Psi(x) = \\text{unique}' },
                            { title: 'Continuous', desc: 'No breaks or jumps in the function or its derivative.', math: '\\frac{d\\Psi}{dx} = \\text{continuous}' }
                        ].map((item, idx) => (
                            <li key={idx} className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors">
                                <div className="shrink-0 mt-1">
                                    <div className="w-6 h-6 rounded-full bg-science-100 dark:bg-science-900/50 flex items-center justify-center text-science-600 dark:text-science-400 text-xs font-bold">
                                        {idx + 1}
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.desc}</p>
                                    <div className="text-xs text-science-600 dark:text-science-400 font-mono"><InlineMath math={item.math} /></div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-700">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm uppercase tracking-wide">Normalization</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                            The particle must exist *somewhere* in space, so total probability is 1.
                        </p>
                        <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-xl text-center">
                            <BlockMath math="\int_{-\infty}^{+\infty} |\Psi(x,t)|^2 \, dx = 1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
