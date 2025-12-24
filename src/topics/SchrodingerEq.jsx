import React, { useState } from 'react';
import { InlineMath, BlockMath } from '../components/MathDisplay';

export default function SchrodingerEquations() {
    const [tab, setTab] = useState('time-dependent'); // 'time-dependent' or 'time-independent'

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Schrödinger's Equations</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    The fundamental equation of Quantum Mechanics, describing how the quantum state of a physical system changes over time.
                </p>
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={() => setTab('time-dependent')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === 'time-dependent' ? 'bg-science-600 text-white' : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'}`}
                    >
                        Time Dependent Derivation
                    </button>
                    <button
                        onClick={() => setTab('time-independent')}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${tab === 'time-independent' ? 'bg-science-600 text-white' : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'}`}
                    >
                        Time Independent Derivation
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-8 lg:p-12">

                {tab === 'time-dependent' && (
                    <div className="space-y-8 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-dark-700">Derivation of Time Dependent Schrödinger Equation</h3>

                        <div className="space-y-4">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Step 1: Consider a free particle wave function</p>
                            <p className="text-gray-600 dark:text-gray-300">A particle moving in positive x-direction with energy <InlineMath math="E" /> and momentum <InlineMath math="p" /> can be described by:</p>
                            <div className="bg-science-50 dark:bg-science-900/20 p-4 rounded-xl text-center">
                                <BlockMath math="\psi(x,t) = A e^{-i(Et - px)/\hbar}" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Step 2: Differentiate with respect to time (<InlineMath math="t" />)</p>
                            <p className="text-gray-600 dark:text-gray-300">Taking the partial derivative <InlineMath math="\frac{\partial}{\partial t}" />:</p>
                            <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-xl text-center">
                                <BlockMath math="\frac{\partial \psi}{\partial t} = -i\frac{E}{\hbar} A e^{-i(Et - px)/\hbar} = -i\frac{E}{\hbar} \psi" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Rearranging to find <InlineMath math="E\psi" />:</p>
                            <div className="text-center font-bold text-gray-700 dark:text-gray-300">
                                <BlockMath math="E\psi = i\hbar \frac{\partial \psi}{\partial t} \quad \dots(1)" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Step 3: Differentiate with respect to position (<InlineMath math="x" />) twice</p>
                            <p className="text-gray-600 dark:text-gray-300">First derivative:</p>
                            <div className="text-center">
                                <BlockMath math="\frac{\partial \psi}{\partial x} = i\frac{p}{\hbar} \psi" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Second derivative:</p>
                            <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-xl text-center">
                                <BlockMath math="\frac{\partial^2 \psi}{\partial x^2} = i^2\frac{p^2}{\hbar^2} \psi = -\frac{p^2}{\hbar^2} \psi" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Rearranging to find <InlineMath math="p^2\psi" />:</p>
                            <div className="text-center font-bold text-gray-700 dark:text-gray-300">
                                <BlockMath math="p^2\psi = -\hbar^2 \frac{\partial^2 \psi}{\partial x^2} \quad \dots(2)" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Step 4: Use Total Energy Relation</p>
                            <p className="text-gray-600 dark:text-gray-300">Total Energy <InlineMath math="E" /> is sum of Kinetic (<InlineMath math="K" />) and Potential (<InlineMath math="V" />) energy:</p>
                            <div className="text-center">
                                <BlockMath math="E = K + V = \frac{p^2}{2m} + V" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Multiply entire equation by <InlineMath math="\psi" />:</p>
                            <div className="text-center">
                                <BlockMath math="E\psi = \frac{p^2\psi}{2m} + V\psi" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Step 5: Substitute (1) and (2) into Energy Equation</p>
                            <div className="bg-science-50 dark:bg-science-900/20 p-6 rounded-xl text-center border-2 border-science-100 dark:border-science-800 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 bg-science-500 text-white text-xs px-2 py-1 rounded-br">Final Equation</div>
                                <BlockMath math="i\hbar \frac{\partial \psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \psi}{\partial x^2} + V\psi" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-center italic">
                                This is the One-Dimensional Time-Dependent Schrödinger Equation.
                            </p>
                        </div>
                    </div>
                )}

                {tab === 'time-independent' && (
                    <div className="space-y-8 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white pb-4 border-b border-gray-100 dark:border-dark-700">Derivation of Time Independent Schrödinger Equation</h3>

                        <div className="space-y-4">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Step 1: Separation of Variables</p>
                            <p className="text-gray-600 dark:text-gray-300">Assuming potential <InlineMath math="V" /> depends only on <InlineMath math="x" /> (not <InlineMath math="t" />), the wave function can be written as product of spatial and temporal parts:</p>
                            <div className="bg-science-50 dark:bg-science-900/20 p-4 rounded-xl text-center">
                                <BlockMath math="\Psi(x,t) = \psi(x) \cdot \phi(t)" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Step 2: Substitute into Time-Dependent Equation</p>
                            <div className="text-center text-sm text-gray-500 dark:text-gray-400 mb-2">Recall: <InlineMath math="i\hbar \frac{\partial \Psi}{\partial t} = -\frac{\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V(x)\Psi" /></div>

                            <p className="text-gray-600 dark:text-gray-300">Left Side (Time Derivative):</p>
                            <div className="text-center"><BlockMath math="i\hbar \psi(x) \frac{d\phi}{dt}" /></div>

                            <p className="text-gray-600 dark:text-gray-300">Right Side (Space Derivative):</p>
                            <div className="text-center"><BlockMath math="-\frac{\hbar^2}{2m} \phi(t) \frac{d^2\psi}{dx^2} + V(x)\psi(x)\phi(t)" /></div>
                        </div>

                        <div className="space-y-4">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Step 3: Divide by <InlineMath math="\psi(x)\phi(t)" /></p>
                            <p className="text-gray-600 dark:text-gray-300">Dividing both sides allows us to separate variables:</p>
                            <div className="bg-gray-50 dark:bg-dark-900 p-4 rounded-xl text-center">
                                <BlockMath math="i\hbar \frac{1}{\phi(t)} \frac{d\phi}{dt} = -\frac{\hbar^2}{2m} \frac{1}{\psi(x)} \frac{d^2\psi}{dx^2} + V(x)" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                LHS depends only on <InlineMath math="t" />. RHS depends only on <InlineMath math="x" />.
                                For them to be equal for all <InlineMath math="x,t" />, both must equal a constant <InlineMath math="E" /> (Total Energy).
                            </p>
                        </div>

                        <div className="space-y-6">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Step 4: Solved for Spatial Part</p>
                            <p className="text-gray-600 dark:text-gray-300">Equating the spatial part (RHS) to <InlineMath math="E" />:</p>
                            <div className="text-center">
                                <BlockMath math="-\frac{\hbar^2}{2m} \frac{1}{\psi} \frac{d^2\psi}{dx^2} + V = E" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">Multiply by <InlineMath math="\psi" /> and rearrange:</p>
                            <div className="bg-science-50 dark:bg-science-900/20 p-6 rounded-xl text-center border-2 border-science-100 dark:border-science-800 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 bg-science-500 text-white text-xs px-2 py-1 rounded-br">Final Equation</div>
                                <BlockMath math="\frac{d^2\psi}{dx^2} + \frac{2m}{\hbar^2}(E - V)\psi = 0" />
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 text-center italic">
                                This is the Time-Identependent Schrödinger Equation.
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
