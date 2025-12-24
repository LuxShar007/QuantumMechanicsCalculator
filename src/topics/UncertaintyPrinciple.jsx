import React, { useState } from 'react';
import { InlineMath, BlockMath } from '../components/MathDisplay';
import ScientificInput from '../components/ScientificInput';
import { formatHumanReadable } from '../utils/units';

export default function UncertaintyPrinciple() {
    const [mode, setMode] = useState('pos-mom');

    // Stores in SI
    const [deltaX, setDeltaX] = useState(1e-10);
    const [mass, setMass] = useState(9.109e-31);
    const [deltaT, setDeltaT] = useState(1e-8);
    const [inputType, setInputType] = useState('x');

    const pmResults = (() => {
        const limit = 1.054e-34; // h_bar
        if (inputType === 'x') {
            const dp = limit / deltaX;
            const dv = dp / mass;
            return { dp, dv };
        }
        return {};
    })();

    const etResults = (() => {
        const limit = 1.054e-34;
        const de = limit / deltaT;
        const freq = de / 6.626e-34;
        return { de, freq };
    })();

    const loadExample20_4 = () => {
        setMode('energy-time');
        setDeltaT(1e-8);
    };

    const loadExample20_5 = () => {
        setMode('pos-mom');
        setInputType('x');
        setDeltaX(10e-9);
        setMass(9.109e-31);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Heisenberg Uncertainty Principle</h2>
                <div className="flex gap-4 justify-center">
                    <button onClick={loadExample20_4} className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 font-medium text-sm transition-colors">Ex 20.4 (Energy)</button>
                    <button onClick={loadExample20_5} className="px-4 py-2 bg-science-50 dark:bg-science-900/30 text-science-700 dark:text-science-300 rounded-lg hover:bg-science-100 dark:hover:bg-science-900/50 font-medium text-sm transition-colors">Ex 20.5 (Position)</button>
                </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 overflow-hidden">
                <div className="border-b border-gray-100 dark:border-dark-700 flex">
                    <button onClick={() => setMode('pos-mom')} className={`flex-1 py-3 text-sm font-medium ${mode === 'pos-mom' ? 'bg-science-50 dark:bg-science-900/20 text-science-700 dark:text-science-400 border-b-2 border-science-500' : 'text-gray-500 dark:text-gray-400'}`}>Position-Momentum</button>
                    <button onClick={() => setMode('energy-time')} className={`flex-1 py-3 text-sm font-medium ${mode === 'energy-time' ? 'bg-science-50 dark:bg-science-900/20 text-science-700 dark:text-science-400 border-b-2 border-science-500' : 'text-gray-500 dark:text-gray-400'}`}>Energy-Time</button>
                </div>

                <div className="p-6 lg:p-8">
                    {mode === 'pos-mom' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Inputs</h3>
                                <ScientificInput
                                    label="Uncertainty Position (Δx)"
                                    valueSI={deltaX} onChange={setDeltaX}
                                    type="length" defaultUnit="nm"
                                />
                                <ScientificInput
                                    label="Mass (m)"
                                    valueSI={mass} onChange={setMass}
                                    type="mass" defaultUnit="me"
                                />
                            </div>

                            <div className="bg-gray-50 dark:bg-dark-900 rounded-xl p-6 space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Minimum Uncertainties</h3>
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Momentum (<InlineMath math="\Delta p" />)</div>
                                    <div className="text-xl font-bold text-science-600 dark:text-science-400 font-mono">{formatHumanReadable(pmResults.dp)} kg·m/s</div>
                                </div>
                                <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Velocity (<InlineMath math="\Delta v" />)</div>
                                    <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{formatHumanReadable(pmResults.dv)} m/s</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === 'energy-time' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Inputs</h3>
                                <ScientificInput
                                    label="Uncertainty Time (Δt)"
                                    valueSI={deltaT} onChange={setDeltaT}
                                    type="time" defaultUnit="s"
                                />
                            </div>

                            <div className="bg-gray-50 dark:bg-dark-900 rounded-xl p-6 space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Minimum Uncertainties</h3>
                                <div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Energy (<InlineMath math="\Delta E" />)</div>
                                    <div className="text-xl font-bold text-science-600 dark:text-science-400 font-mono">{formatHumanReadable(pmResults.de || etResults.de)} J</div>
                                    <div className="text-sm font-mono text-science-500 dark:text-science-400">= {formatHumanReadable((pmResults.de || etResults.de) / 1.602e-19)} eV</div>
                                </div>
                                <div className="pt-4 border-t border-gray-200 dark:border-dark-700">
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Frequency (<InlineMath math="\Delta \nu" />)</div>
                                    <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{formatHumanReadable(pmResults.freq || etResults.freq)} Hz</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
