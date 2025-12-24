// Utility to format numbers "humanly"
export const formatHumanReadable = (num) => {
    if (num === 0) return "0";
    const absNum = Math.abs(num);

    // If number is within "normal" range (0.001 to 100,000), use standard string
    if (absNum >= 0.001 && absNum < 100000) {
        return num.toLocaleString(undefined, { maximumSignificantDigits: 6 });
    }

    // Otherwise use clean scientific notation: 1.23 × 10⁻¹⁹
    const exponent = Math.floor(Math.log10(absNum));
    const mantissa = num / Math.pow(10, exponent);

    // Super script mapping for exponents
    const superscripts = {
        '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
        '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
    };

    const exponentStr = exponent.toString().split('').map(char => superscripts[char] || char).join('');

    return `${mantissa.toFixed(2)} × 10${exponentStr}`;
};

export const CONVERSIONS = {
    length: {
        'm': 1,
        'cm': 1e-2,
        'mm': 1e-3,
        'μm': 1e-6,
        'nm': 1e-9,
        'Å': 1e-10,
        'pm': 1e-12,
        'fm': 1e-15
    },
    mass: {
        'kg': 1,
        'g': 1e-3,
        'mg': 1e-6,
        'μg': 1e-9,
        'me': 9.10938356e-31, // Electron mass
        'mp': 1.6726219e-27,   // Proton mass
        'amu': 1.66053906660e-27
    },
    energy: {
        'J': 1,
        'eV': 1.602176634e-19,
        'keV': 1.602176634e-16,
        'MeV': 1.602176634e-13,
        'GeV': 1.602176634e-10
    },
    time: {
        's': 1,
        'ms': 1e-3,
        'μs': 1e-6,
        'ns': 1e-9,
        'ps': 1e-12,
        'fs': 1e-15
    },
    velocity: {
        'm/s': 1,
        'km/s': 1e3,
        'km/h': 0.277778, // 1 km/h = 1000/3600 m/s
        'c': 299792458
    },
    momentum: {
        'kg·m/s': 1,
        // no other common ones, maybe gc? eV/c?
    },
    voltage: {
        'V': 1,
        'kV': 1e3,
        'mV': 1e-3,
        'μV': 1e-6
    },
    charge: {
        'C': 1,
        'e': 1.602176634e-19,
        'mC': 1e-3,
        'μC': 1e-6,
        'nC': 1e-9
    }
};

export const UNIT_LABELS = {
    'm': 'Meters', 'nm': 'Nanometers', 'Å': 'Ångströms',
    'kg': 'Kilograms', 'g': 'Grams', 'me': 'Electron Mass',
    'J': 'Joules', 'eV': 'Electron Volts',
    's': 'Seconds', 'ns': 'Nanoseconds'
};

// Helper to get formatted value
export const formatScientific = (num) => {
    if (num === 0) return { base: 0, exp: 0 };
    const str = num.toExponential(10); // High precision intermediate
    const [base, exp] = str.split('e');
    return { base: parseFloat(base), exp: parseInt(exp) };
};
