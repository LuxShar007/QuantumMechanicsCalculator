import React, { useState, useEffect } from 'react';
import { CONVERSIONS } from '../utils/units';

export default function ScientificInput({
    label,
    value,      // Allow 'value'
    valueSI,    // OR 'valueSI'
    onChange,
    type,
    defaultUnit,
    unit: controlledUnit,
    onUnitChange: setControlledUnit,
    units: explicitOptions,
    disabled = false
}) {
    // DEBUG LOGS
    console.log(`[ScientificInput ${label}] Render`, { label, value, valueSI, controlledUnit, type });

    // 1. Resolve the actual numeric value from props
    // Use valueSI if present, otherwise value.
    const rawValue = valueSI !== undefined ? valueSI : value;

    // 2. Resolve Unit Handling
    const unitOptions = explicitOptions || (type ? Object.keys(CONVERSIONS[type] || {}) : []);

    // Internal state for unit if not controlled
    const [internalUnit, setInternalUnit] = useState(defaultUnit || unitOptions[0] || '');

    const currentUnit = controlledUnit !== undefined ? controlledUnit : internalUnit;

    const handleUnitChange = (e) => {
        const u = e.target.value;
        if (setControlledUnit) {
            setControlledUnit(u);
        } else {
            setInternalUnit(u);
        }
    };

    // Calculate conversion factor
    let factor = 1;
    if (type && CONVERSIONS[type] && CONVERSIONS[type][currentUnit]) {
        factor = CONVERSIONS[type][currentUnit];
    } else if (!type && currentUnit) {
        const allTypeKeys = Object.keys(CONVERSIONS);
        for (const t of allTypeKeys) {
            if (CONVERSIONS[t][currentUnit]) {
                factor = CONVERSIONS[t][currentUnit];
                break;
            }
        }
        if (factor === 1) {
            if (currentUnit === 'nm') factor = 1e-9;
            if (currentUnit === 'Angstrom' || currentUnit === 'Å') factor = 1e-10;
            if (currentUnit === 'mm') factor = 1e-3;
            if (currentUnit === 'cm') factor = 1e-2;
            if (currentUnit === 'km') factor = 1e3;
        }
    }

    const displayVal = (rawValue !== null && rawValue !== undefined) ? (rawValue / factor) : 0;

    console.log(`[ScientificInput ${label}] rawValue: ${rawValue}, factor: ${factor}, displayVal: ${displayVal}`);

    // 3. User Input Handling (Stable Editing)
    const [baseStr, setBaseStr] = useState("0");
    const [expStr, setExpStr] = useState("0");

    function splitValue(num) {
        if (!num && num !== 0) return { b: "0", e: "0" };
        const s = num.toExponential(6);
        const [bStr, eStr] = s.split('e');
        let cleanedBase = parseFloat(bStr).toString();
        return { b: cleanedBase, e: eStr ? eStr.replace('+', '') : '0' };
    }

    useEffect(() => {
        if (rawValue === null || rawValue === undefined) return;

        const currentLocalVal = parseFloat(baseStr) * Math.pow(10, parseFloat(expStr));
        const currentSI = currentLocalVal * factor;
        const isDifferent = Math.abs(currentSI - rawValue) > Math.abs(rawValue) * 1e-9 + 1e-15;

        if (isDifferent) {
            console.log(`[ScientificInput ${label}] Syncing from props. rawValue=${rawValue}, currentLocalSI=${currentSI}`);
            const { b, e } = splitValue(displayVal);
            setBaseStr(b);
            setExpStr(e);
        }
    }, [rawValue, factor, currentUnit]);

    const reportChange = (newBase, newExp) => {
        const b = parseFloat(newBase);
        const e = parseFloat(newExp);
        if (!isNaN(b) && !isNaN(e)) {
            const val = b * Math.pow(10, e);
            console.log(`[ScientificInput ${label}] Reporting Change:`, val * factor);
            onChange(val * factor);
        }
    };

    const handleBaseChange = (e) => {
        const val = e.target.value;
        setBaseStr(val);
        reportChange(val, expStr);
    };

    const handleExpChange = (e) => {
        const val = e.target.value;
        setExpStr(val);
        reportChange(baseStr, val);
    };

    return (
        <div className={`bg-neutral-50 dark:bg-dark-800/50 p-3 rounded-xl border border-neutral-200 dark:border-dark-700 transition-colors ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex justify-between mb-1.5 items-center">
                <label className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{label}</label>
                {unitOptions.length > 0 && (
                    <select
                        value={currentUnit}
                        onChange={handleUnitChange}
                        className="text-xs bg-transparent border-none outline-none text-science-600 dark:text-science-400 font-bold text-right cursor-pointer hover:text-science-700 dark:hover:text-science-300 transition-colors"
                    >
                        {unitOptions.map(u => <option key={u} value={u} className="bg-white dark:bg-dark-800 text-neutral-900 dark:text-white">{u}</option>)}
                    </select>
                )}
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="number"
                    step="any"
                    value={baseStr}
                    onChange={handleBaseChange}
                    className="w-full min-w-0 bg-white dark:bg-dark-900 border border-neutral-300 dark:border-dark-600 rounded-lg px-3 py-1.5 text-neutral-900 dark:text-white outline-none focus:border-science-500 focus:ring-1 focus:ring-science-500/20 font-mono text-sm transition-all"
                />
                <span className="text-neutral-400 dark:text-neutral-500 font-serif text-sm">× 10</span>
                <div className="relative w-24 flex-shrink-0">
                    <input
                        type="number"
                        value={expStr}
                        onChange={handleExpChange}
                        className="w-full bg-white dark:bg-dark-900 border border-neutral-300 dark:border-dark-600 rounded-lg px-3 py-1.5 text-sm text-neutral-900 dark:text-white outline-none focus:border-science-500 focus:ring-1 focus:ring-science-500/20 font-mono transition-all"
                    />
                    <span className="absolute -top-2 -right-1 text-[9px] font-bold text-neutral-400 dark:text-neutral-500 bg-neutral-50 dark:bg-dark-800 px-1 select-none">pow</span>
                </div>
            </div>
        </div>
    );
}
