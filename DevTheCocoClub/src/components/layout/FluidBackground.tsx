import React from 'react';

export const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 opacity-60">
      {/* Top Right Khaki Organic Fluid Wave */}
      <svg
        className="absolute -top-32 -right-32 w-[600px] h-[600px] text-khaki-100/60 blur-2xl animate-float-slow"
        viewBox="0 0 500 500"
        fill="currentColor"
      >
        <path d="M421.5,315.5Q376,381,304.5,417.5Q233,454,166.5,409.5Q100,365,69.5,296.5Q39,228,79.5,166Q120,104,188,71.5Q256,39,328.5,70.5Q401,102,434,176Q467,250,421.5,315.5Z" />
      </svg>

      {/* Middle Left Terracotta / Red Robin Fluid Orb */}
      <svg
        className="absolute top-1/3 -left-48 w-[700px] h-[700px] text-redRobin-50/50 blur-3xl"
        viewBox="0 0 500 500"
        fill="currentColor"
      >
        <path d="M433.5,317.5Q395,385,324.5,418.5Q254,452,185,419.5Q116,387,77.5,318.5Q39,250,75,180.5Q111,111,180.5,73.5Q250,36,321.5,72Q393,108,432.5,179Q472,250,433.5,317.5Z" />
      </svg>

      {/* Bottom Right Oyster Fluid Gradient */}
      <svg
        className="absolute -bottom-40 right-10 w-[650px] h-[650px] text-oyster-200/50 blur-2xl animate-pulse-glow"
        viewBox="0 0 500 500"
        fill="currentColor"
      >
        <path d="M410.5,313Q365,376,298,416.5Q231,457,163.5,416Q96,375,64.5,307.5Q33,240,70,174Q107,108,178.5,74.5Q250,41,323,73Q396,105,426,177.5Q456,250,410.5,313Z" />
      </svg>

      {/* Subtle brand marble vector lines */}
      <div className="absolute inset-0 pattern-wave opacity-25" />
    </div>
  );
};
