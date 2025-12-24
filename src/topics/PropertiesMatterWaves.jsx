import React, { useMemo } from 'react';
import { InlineMath, BlockMath } from '../components/MathDisplay';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export default function PropertiesMatterWaves() {
    // Generate Wave Packet Data (Group vs Phase Velocity)
    // Superposition of two waves with slightly different frequencies
    const data = useMemo(() => {
        const points = [];
        const k1 = 10, k2 = 12; // Wave numbers
        const xMax = 10;

        for (let x = 0; x <= xMax; x += 0.05) {
            const y1 = Math.sin(k1 * x);
            const y2 = Math.sin(k2 * x);
            const wavePacket = y1 + y2; // Superposition
            const envelope = 2 * Math.cos((k1 - k2) * x / 2); // Envelope

            points.push({
                x: x.toFixed(2),
                wave: wavePacket,
                envelope: Math.abs(envelope), // Show magnitude of envelope
                envelopeNeg: -Math.abs(envelope)
            });
        }
        return points;
    }, []);

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Properties of Matter Waves</h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    Matter waves, or de Broglie waves, exhibit specific properties that distinguish them from classical waves and electromagnetic waves.
                    A key concept is the distinction between **Phase Velocity** and **Group Velocity**, which explains how "particle" localized information travels.
                </p>
            </div>

            {/* Key Components Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-science-50 dark:bg-science-900/20 rounded-2xl p-6 border border-science-100 dark:border-science-800">
                    <h3 className="text-xl font-semibold text-science-900 dark:text-science-100 mb-2">Phase Velocity (<InlineMath math="v_p" />)</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                        The rate at which the phase of the wave propagates in space. It is the velocity of the individual ripples in the wave packet.
                    </p>
                    <div className="bg-white/60 dark:bg-dark-900/60 rounded-lg p-4 backdrop-blur-sm">
                        <BlockMath math="v_p = \frac{\omega}{k} = \frac{E}{p}" />
                    </div>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
                    <h3 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-2">Group Velocity (<InlineMath math="v_g" />)</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                        The velocity with which the overall shape of the wave packet (envelope) propagates. This represents the velocity of the particle itself.
                    </p>
                    <div className="bg-white/60 dark:bg-dark-900/60 rounded-lg p-4 backdrop-blur-sm">
                        <BlockMath math="v_g = \frac{d\omega}{dk} = v_{particle}" />
                    </div>
                </div>
            </div>

            {/* Theory List */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Key Characteristics</h3>
                <ul className="space-y-4">
                    {[
                        "Lighter is the particle, greater is the wavelength (for same velocity).",
                        "Greater is the velocity, smaller is the wavelength (for same mass).",
                        "Matter waves are not electromagnetic in nature.",
                        "The wave velocity (phase velocity) can be greater than the speed of light (c), but group velocity is always < c.",
                        "Wave nature is significant only for microscopic particles (electrons, protons) and negligible for macroscopic bodies."
                    ].map((item, i) => (
                        <li key={i} className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-science-500 mt-2.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Visualization */}
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-dark-700 pb-4">
                    Visualizing a Wave Packet (Particle Representation)
                </h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" strokeOpacity={0.1} />
                            <XAxis dataKey="x" hide />
                            <YAxis hide domain={[-2.5, 2.5]} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#f3f4f6' }}
                                itemStyle={{ color: '#f3f4f6' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="wave"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                dot={false}
                                name="Matter Wave"
                            />
                            <Line
                                type="monotone"
                                dataKey="envelope"
                                stroke="#94a3b8"
                                strokeDasharray="5 5"
                                strokeWidth={1}
                                dot={false}
                                name="Envelope"
                            />
                            <Line
                                type="monotone"
                                dataKey="envelopeNeg"
                                stroke="#94a3b8"
                                strokeDasharray="5 5"
                                strokeWidth={1}
                                dot={false}
                                name="Envelope"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
                    A localized "Wave Packet" formed by the superposition of waves.
                    The **Envelope** travels at Group Velocity (particle speed).
                </p>
            </div>
        </div>
    );
}
