import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Atom,
    Activity,
    Zap,
    Radio,
    Box,
    GitMerge,
    Cpu,
    Menu,
    X,
    ChevronRight,
    Sun,
    Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    // Enforce Dark Mode Permanently (Back to Pitch Black)
    useEffect(() => {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }, []);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 1024);
            if (window.innerWidth < 1024) setIsSidebarOpen(false);
            else setIsSidebarOpen(true);
        };
        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const navItems = [
        { name: 'De Broglie Hypothesis', path: '/de-broglie-hypothesis', icon: Atom },
        { name: 'Electron Wavelength', path: '/electron-wavelength', icon: Zap },
        { name: 'Matter Wave Properties', path: '/matter-wave-properties', icon: Activity },
        { name: 'Uncertainty Principle', path: '/uncertainty-principle', icon: Activity },
        { name: 'Wave Function', path: '/wave-function', icon: Radio },
        { name: 'Schrödinger Equations', path: '/schrodinger-equations', icon: GitMerge },
        { name: 'Particle in a Box', path: '/particle-in-box', icon: Box },
        { name: 'Quantum Tunneling', path: '/tunneling', icon: ChevronRight },
        { name: 'Qubits & Computing', path: '/qubit', icon: Cpu },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-dark-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 w-full bg-white/80 dark:bg-dark-900/80 backdrop-blur-md z-50 border-b border-neutral-200 dark:border-dark-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-science-600 dark:text-science-400">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                    <span>Quantum Solver</span>
                </div>
                <div className="flex items-center gap-4">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-neutral-600 dark:text-neutral-300">
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <motion.div
                initial={false}
                animate={{
                    x: isSidebarOpen ? 0 : -280,
                    opacity: isMobile && !isSidebarOpen ? 0 : 1
                }}
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                className={`fixed top-0 left-0 h-full w-[280px] bg-white dark:bg-dark-900 border-r border-neutral-200 dark:border-dark-800 z-40 shadow-xl lg:shadow-none flex flex-col`}
            >
                <div className="p-6 border-b border-neutral-100 dark:border-dark-800 hidden lg:flex items-center justify-between">
                    <div className="flex items-center gap-3 font-bold text-xl text-neutral-900 dark:text-white">
                        <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                        Quantum Mechanics Calculator
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                        ${isActive
                                    ? 'bg-science-50 dark:bg-science-900/20 text-science-700 dark:text-science-300 font-semibold shadow-sm'
                                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-dark-800 hover:text-neutral-900 dark:hover:text-neutral-200'
                                }
                    `}
                            onClick={() => isMobile && setIsSidebarOpen(false)}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon size={18} className="opacity-70 group-hover:opacity-100" />
                                    <span className="text-sm tracking-wide">{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="ml-auto w-1.5 h-1.5 rounded-full bg-science-500 dark:bg-science-400"
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-neutral-100 dark:border-dark-800">
                    <div className="bg-gradient-to-br from-science-500 to-science-700 rounded-xl p-4 text-white shadow-lg shadow-science-500/20">
                        <h4 className="font-bold text-sm mb-1">Numerical Solver</h4>
                        <p className="text-xs text-science-100 opacity-90">v1.2.0 • Interactive Modules</p>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ${isSidebarOpen && !isMobile ? 'ml-[280px]' : 'ml-0'}`}
            >
                <div className="max-w-7xl mx-auto p-4 lg:p-8 pt-20 lg:pt-8 min-h-screen">
                    {children}
                </div>
            </div>

            {/* Overlay for mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
