import React, { useState, useEffect } from 'react';
import { InlineMath, BlockMath } from '../components/MathDisplay';
import ScientificInput from '../components/ScientificInput';
import { formatHumanReadable } from '../utils/units';
import ParticleComparison3D from '../components/ParticleComparison3D';

export default function DeBroglie() {
    // Solve Target: 'wavelength', 'mass', 'velocity', 'voltage', 'energy'
    const [target, setTarget] = useState('wavelength');

    // Variables (in SI units standardly)
    const [lambda, setLambda] = useState(1.23e-9);
    const [mass, setMass] = useState(9.109e-31); // Electron
    const [velocity, setVelocity] = useState(6e5);
    const [voltage, setVoltage] = useState(100);

    // Units State
    const [units, setUnits] = useState({
        lambda: 'm',
        mass: 'kg',
        velocity: 'm/s',
        voltage: 'V',
        energy: 'eV' // derived
    });

    // Constants
    const h = 6.626e-34;
    const e = 1.602e-19;

    // Calculation Logic automatically runs when inputs change, but only updates the TARGET
    // Needs to be careful of loops. So we only calculate on render/memo for the display, 
    // OR we use a "Calculate" buffer.
    // Better: The interface shows INPUTS for non-target vars, and OUTPUT for target var.

    const calculateResult = () => {
        switch (target) {
            case 'wavelength': // h / mv or h / sqrt(2mE)
                // Using momentum normally
                if (mass * velocity === 0) return 0;
                return h / (mass * velocity); // meters
            case 'mass': // h / lambda * v
                if (lambda * velocity === 0) return 0;
                return h / (lambda * velocity);
            case 'velocity': // h / lambda * m
                if (lambda * mass === 0) return 0;
                return h / (lambda * mass);
            case 'voltage': // V = h^2 / (2 m e lambda^2)
                // derived from lambda = h / sqrt(2meV)
                if (mass * lambda === 0) return 0;
                return Math.pow(h, 2) / (2 * mass * e * Math.pow(lambda, 2));
        }
    };

    const resultSI = calculateResult();

    // Unit Conversion Helpers
    const convertInput = (val, type, direction = 'toSI') => {
        // Simplistic for now, stick to SI in state, convert for display?
        // No, let's keep state as SI. ScientificInput handles magnitude.
        // Unit dropdowns just change how we interpret? 
        // User wants "change unit as per numerical".
        // Let's implement minimal conversions e.g. Angstrom
        if (type === 'lambda') {
            if (units.lambda === 'Angstrom') return direction === 'toSI' ? val * 1e-10 : val * 1e10;
            if (units.lambda === 'nm') return direction === 'toSI' ? val * 1e-9 : val * 1e9;
        }
        return val;
    };

    // Helper handling change from inputs
    // We assume inputs give SI except for the Exponent part handling.

    const handlePropChange = (setter) => (val) => setter(val);

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">De Broglie Universal Solver</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Rearrange the equation to solve for any variable. Supports scientific notation inputs.
                </p>

                {/* 3D Viz */}
                <div className="mb-6">
                    <ParticleComparison3D
                        labelA={mass < 1e-25 ? "Your Particle" : "Electron"}
                        sizeA={0.5}
                        labelB={mass > 1e-5 ? "Your Object" : "Baseball"}
                        sizeB={2.5}
                    />
                    <p className="text-xs text-center text-gray-400 mt-2">
                        Visual Scale Comparison (Not to scale: factor is ~10³⁰)
                    </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center bg-gray-50 dark:bg-dark-900/50 p-4 rounded-xl border border-gray-200 dark:border-dark-700">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">Solve For:</span>
                    <select
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                        className="px-4 py-2 bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-600 rounded-lg font-medium text-science-700 dark:text-science-300 focus:ring-2 focus:ring-science-500 outline-none cursor-pointer"
                    >
                        <option value="wavelength">Wavelength (λ)</option>
                        <option value="velocity">Velocity (v)</option>
                        <option value="mass">Mass (m)</option>
                        <option value="voltage">Accelerated Potential (V)</option>
                    </select>

                    <div className="ml-auto text-xl font-mono text-gray-500">
                        {target === 'wavelength' && <InlineMath math="\lambda = \frac{h}{mv}" />}
                        {target === 'velocity' && <InlineMath math="v = \frac{h}{m\lambda}" />}
                        {target === 'mass' && <InlineMath math="m = \frac{h}{v\lambda}" />}
                        {target === 'voltage' && <InlineMath math="V = \frac{h^2}{2me\lambda^2}" />}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inputs Column */}
                <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-gray-100 dark:border-dark-700 p-6 space-y-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-700 pb-2">Known Values</h3>

                    {target !== 'wavelength' && target !== 'voltage' && (
                        <ScientificInput
                            label="Wavelength (λ)"
                            value={lambda}
                            onChange={setLambda}
                            unit={units.lambda}
                            onUnitChange={(u) => setUnits({ ...units, lambda: u })}
                            units={['m', 'nm', 'Angstrom']}
                        />
                    )}

                    {target !== 'mass' && (
                        <ScientificInput
                            label="Mass (m)"
                            value={mass}
                            onChange={setMass}
                            unit="kg"
                            units={['kg']}
                        />
                    )}

                    {target !== 'velocity' && target !== 'voltage' && (
                        <ScientificInput
                            label="Velocity (v)"
                            value={velocity}
                            onChange={setVelocity}
                            unit="m/s"
                        />
                    )}

                    {target !== 'wavelength' && target === 'voltage' && (
                        // If solving for Voltage, we usually need Lambda and Mass. Velocity is derived or irrelevant context.
                        <ScientificInput
                            label="Wavelength (λ)"
                            value={lambda}
                            onChange={setLambda}
                            unit="m"
                        />
                    )}
                </div>

                {/* Results Column */}
                <div className="bg-gradient-to-br from-science-600 to-science-900 rounded-2xl shadow-lg text-white p-8 flex flex-col justify-center">
                    <div className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">Calculated Result</div>

                    <div className="text-4xl md:text-5xl font-bold font-mono tracking-tight break-all">
                        {formatHumanReadable(resultSI)}
                    </div>

                    <div className="mt-2 text-white/60 font-medium">
                        {target === 'wavelength' && 'Meters (m)'}
                        {target === 'velocity' && 'm/s'}
                        {target === 'mass' && 'kg'}
                        {target === 'voltage' && 'Volts (V)'}
                    </div>

                    {/* Conversions / Extras */}
                    <div className="mt-8 bg-white/10 rounded-xl p-4 backdrop-blur space-y-2">
                        {target === 'wavelength' && (
                            <>
                                <div className="flex justify-between font-mono text-sm">
                                    <span className="text-white/60">Nanometers:</span>
                                    <span>{formatHumanReadable(resultSI * 1e9)} nm</span>
                                </div>
                                <div className="flex justify-between font-mono text-sm">
                                    <span className="text-white/60">Angstroms:</span>
                                    <span>{formatHumanReadable(resultSI * 1e10)} Å</span>
                                </div>
                            </>
                        )}
                        {target === 'velocity' && (
                            <div className="flex justify-between font-mono text-sm">
                                <span className="text-white/60">Kinetic Energy:</span>
                                <span>{formatHumanReadable(0.5 * mass * resultSI * resultSI / 1.602e-19)} eV</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
