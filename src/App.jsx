import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';

import DeBroglie from './topics/DeBroglie';
import ParticleInBox from './topics/ParticleInBox';
import PropertiesMatterWaves from './topics/PropertiesMatterWaves';
import Tunneling from './topics/Tunneling';
import Qubit from './topics/Qubit';
import UncertaintyPrinciple from './topics/UncertaintyPrinciple';
import SchrodingerEquations from './topics/SchrodingerEq';
import ElectronWavelength from './topics/ElectronWavelength';
import WaveFunction from './topics/WaveFunction';

// Placeholder for topics not yet implemented
const Placeholder = ({ title }) => (
  <div className="bg-white dark:bg-dark-800 rounded-2xl shadow-sm border border-neutral-100 dark:border-dark-700 p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
    <div className="w-16 h-16 bg-neutral-50 dark:bg-dark-900 rounded-full flex items-center justify-center mb-4 text-neutral-400 dark:text-neutral-500">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
    <p className="text-gray-500 dark:text-gray-400 max-w-md">
      This numerical solver module is under development.
    </p>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/de-broglie-hypothesis" replace />} />

        <Route path="/de-broglie-hypothesis" element={
          <PageTransition><DeBroglie /></PageTransition>
        } />

        <Route path="/electron-wavelength" element={
          <PageTransition><ElectronWavelength /></PageTransition>
        } />
        <Route path="/matter-wave-properties" element={
          <PageTransition><PropertiesMatterWaves /></PageTransition>
        } />
        <Route path="/uncertainty-principle" element={
          <PageTransition><UncertaintyPrinciple /></PageTransition>
        } />
        <Route path="/wave-function" element={
          <PageTransition><WaveFunction /></PageTransition>
        } />
        <Route path="/schrodinger-significance" element={
          <PageTransition><Placeholder title="Significance of Schrödinger's Equations" /></PageTransition>
        } />
        <Route path="/schrodinger-equations" element={
          <PageTransition><SchrodingerEquations /></PageTransition>
        } />
        <Route path="/particle-in-box" element={
          <PageTransition><ParticleInBox /></PageTransition>
        } />
        <Route path="/tunneling" element={
          <PageTransition><Tunneling /></PageTransition>
        } />
        <Route path="/qubit" element={
          <PageTransition><Qubit /></PageTransition>
        } />

        <Route path="*" element={
          <PageTransition><Placeholder title="Topic Not Found" /></PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;
