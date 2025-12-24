import React, { useMemo, useState } from 'react';
import { InlineMath, BlockMath } from '../components/MathDisplay';
import { formatHumanReadable } from '../utils/units';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import ScientificInput from '../components/ScientificInput';

export default function Tunneling() {
    // Inputs (SI Units internal)
    const [energy, setEnergy] = useState(3 * 1.602e-19); // 3 eV default
    const [potential, setPotential] = useState(4 * 1.602e-19); // 4 eV
    const [width, setWidth] = useState(2e-9); // 2 nm
    const [mass, setMass] = useState(9.109e-31); // Electron

    // Constants
    const h_bar = 1.0545718e-34;

    const T = useMemo(() => {
        if (energy >= potential) return 1;
        const E = energy;
        const V = potential;
        const ratio = E / V;
        const prefactor = 16 * ratio * (1 - ratio);
        const k = Math.sqrt(2 * mass * (V - E)) / h_bar;
        const exponent = -2 * width * k;
        return prefactor * Math.exp(exponent);
    }, [energy, potential, width, mass]);

    const data = useMemo(() => {
        // Visualization logic remains mostly same...
        const points = [];
        const barrierStart = 3;
        const barrierEnd = 5;
        const k_inc = 2;
        const alpha = Math.min(2, Math.max(0.2, -Math.log(T) / (barrierEnd - barrierStart)));

        for (let x = 0; x <= 10; x += 0.05) {
            let psi = 0;
            let barrierHeight = 0;
            if (x < barrierStart) {
                psi = Math.sin(k_inc * x * 2);
            } else if (x >= barrierStart && x <= barrierEnd) {
                psi = Math.sin(k_inc * barrierStart * 2) * Math.exp(-alpha * (x - barrierStart));
                barrierHeight = 1;
            } else {
                const decayFactor = Math.exp(-alpha * (barrierEnd - barrierStart));
                psi = Math.sin(k_inc * barrierStart * 2) * decayFactor * Math.sin(k_inc * (x - barrierEnd + 1.6));
            }
            points.push({ x: x.toFixed(2), psi, barrier: barrierHeight });
        }
        return points;
    }, [T]);

    const setExample20_8 = () => {
        setEnergy(3 * 1.602e-19);
        setPotential(4 * 1.602e-19);
        setWidth(2.0e-9);
        setMass(9.109e-31);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tunneling Solver</h2>
                    <button onClick={setExample20_8} className="mt-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline">Load Ex 20.8</button>
                </div>
                <div className="text-right">
                    <div className="text-3xl font-bold text-science-600 dark:text-science-400">{formatHumanReadable(T * 100)}%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Transmission Probability</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6 space-y-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Parameters</h3>
                    <ScientificInput
                        label="Particle Energy (E)" valueSI={energy} onChange={setEnergy}
                        type="energy" defaultUnit="eV"
                    />
                    <ScientificInput
                        label="Barrier Potential (V)" valueSI={potential} onChange={setPotential}
                        type="energy" defaultUnit="eV"
                    />
                    <ScientificInput
                        label="Barrier Width (L)" valueSI={width} onChange={setWidth}
                        type="length" defaultUnit="nm"
                    />
                    <ScientificInput
                        label="Mass (m)" valueSI={mass} onChange={setMass}
                        type="mass" defaultUnit="me"
                    />
                </div>

                <div className="lg:col-span-2 bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Visualization</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
                                <YAxis hide domain={[-1.5, 1.5]} />
                                <Area type="step" dataKey="barrier" fill="#e2e8f0" stroke="none" fillOpacity={0.5} />
                                <Area type="monotone" dataKey="psi" stroke="#8b5cf6" fill="url(#colorPsi)" fillOpacity={0.2} strokeWidth={2} />
                                <defs>
                                    <linearGradient id="colorPsi" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="30%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
