import React, { useState } from 'react';
import { InlineMath, BlockMath } from '../components/MathDisplay';
import { formatHumanReadable } from '../utils/units';
import Graph3D from '../components/Graph3D';

export default function ElectronWavelength() {
    const [voltage, setVoltage] = useState(100); // Volts

    // Method 1: Easy formula (Non-relativistic)
    // lambda (Angstrom) = 12.27 / sqrt(V)
    const lambdaAngstrom = voltage > 0 ? (12.27 / Math.sqrt(voltage)) : 0;

    // Method 2: Precise calculation
    const h = 6.626e-34;
    const m = 9.109e-31;
    const e = 1.602e-19;
    const lambdaPrecise = voltage > 0 ? (h / Math.sqrt(2 * m * e * voltage)) : 0; // in meters

    // Generate graph data (Curve of lambda vs V)
    const graphData = React.useMemo(() => {
        const data = [];
        // Range from 10V to 1000V
        for (let v = 10; v <= 1000; v += 10) {
            data.push({ x: v, y: 12.27 / Math.sqrt(v) });
        }
        return data;
    }, []);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Electron Wavelength Short-Cut</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    For electrons accelerated by a potential difference <InlineMath math="V" />, we can use the simplified formula:
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="flex flex-col gap-8 items-center justify-center bg-science-50 dark:bg-science-900/20 p-6 rounded-xl border border-science-100 dark:border-science-800">
                        <div className="text-center">
                            <div className="text-sm font-bold text-science-700 dark:text-science-300 uppercase tracking-wide mb-2">Formula</div>
                            <BlockMath math="\lambda (\text{\AA}) = \frac{12.27}{\sqrt{V}}" />
                        </div>
                        <div className="text-center">
                            <div className="text-sm font-bold text-science-700 dark:text-science-300 uppercase tracking-wide mb-2">Result</div>
                            <div className="text-4xl font-bold text-science-600 dark:text-science-400 font-mono">
                                {formatHumanReadable(lambdaAngstrom)} Å
                            </div>
                        </div>
                    </div>

                    {/* 3D Graph */}
                    <Graph3D
                        data={graphData}
                        xLabel="Voltage (V)"
                        yLabel="Wavelength (Å)"
                        title="λ vs V Relationship"
                    />
                </div>
            </div>

            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-8">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Calculator</h3>
                <div className="max-w-md">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Accelerating Potential (V)</label>
                    <div className="relative">
                        <input
                            type="number"
                            value={voltage}
                            onChange={(e) => setVoltage(parseFloat(e.target.value))}
                            className="w-full px-4 py-3 border border-gray-200 dark:border-dark-600 rounded-lg outline-none focus:ring-2 focus:ring-science-500 text-lg bg-white dark:bg-dark-900 text-gray-900 dark:text-white"
                        />
                        <span className="absolute right-4 top-3.5 text-gray-500 dark:text-gray-400 font-medium">Volts</span>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-dark-700 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-500 dark:text-gray-400">
                    <div>
                        <span className="block font-medium text-gray-900 dark:text-white mb-1">Standard Calculation (m)</span>
                        <span className="font-mono">{formatHumanReadable(lambdaPrecise)} m</span>
                    </div>
                    <div>
                        <span className="block font-medium text-gray-900 dark:text-white mb-1">Using Shortcut (nm)</span>
                        <span className="font-mono">{formatHumanReadable(lambdaAngstrom / 10)} nm</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
