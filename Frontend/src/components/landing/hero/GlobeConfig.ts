// GlobeConfig.ts
import { RefObject } from 'react';
import ThreeGlobe from 'three-globe';

// Type definitions
export interface ArcData {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

export interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

// Globe configuration
export const enhancedGlobeConfig: GlobeConfig = {
  pointSize: 1.5,
  globeColor: "#0f1729", // Darker blue for better contrast
  showAtmosphere: true,
  atmosphereColor: "#4299e1", // Blue glow
  atmosphereAltitude: 0.15,
  emissive: "#172554",
  emissiveIntensity: 0.2,
  shininess: 0.9,
  polygonColor: "rgba(72, 187, 255, 0.7)",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#4299e1",
  arcTime: 2500, // Slightly slower arcs for better visibility
  arcLength: 0.95,
  rings: 2,
  maxRings: 4,
  autoRotate: true,
  autoRotateSpeed: 0.5
};

// Project transfer animation data
export const projectTransferArcs: ArcData[] = [
  // North America to Europe
  {
    order: 0,
    startLat: 37.7749,
    startLng: -122.4194, // San Francisco
    endLat: 51.5074,
    endLng: -0.1278, // London
    arcAlt: 0.5,
    color: "#3b82f6" // Blue
  },
  {
    order: 1,
    startLat: 40.7128,
    startLng: -74.0060, // New York
    endLat: 48.8566,
    endLng: 2.3522, // Paris
    arcAlt: 0.4,
    color: "#4f46e5" // Indigo
  },
  // Asia connections
  {
    order: 2,
    startLat: 35.6762,
    startLng: 139.6503, // Tokyo
    endLat: 22.3193,
    endLng: 114.1694, // Hong Kong
    arcAlt: 0.3,
    color: "#6366f1" // Indigo/blue
  },
  {
    order: 3,
    startLat: 1.3521,
    startLng: 103.8198, // Singapore
    endLat: -33.8688,
    endLng: 151.2093, // Sydney
    arcAlt: 0.5,
    color: "#8b5cf6" // Purple
  },
  // Cross-continental collaboration
  {
    order: 4,
    startLat: 37.7749,
    startLng: -122.4194, // San Francisco
    endLat: 28.6139,
    endLng: 77.2090, // New Delhi
    arcAlt: 0.7,
    color: "#a855f7" // Purple
  },
  {
    order: 5,
    startLat: 55.7558,
    startLng: 37.6173, // Moscow
    endLat: -33.9249,
    endLng: 18.4241, // Cape Town
    arcAlt: 0.6,
    color: "#d946ef" // Fuchsia
  },
  // Academic institutions (matching your trusted teams)
  {
    order: 6,
    startLat: 42.3601,
    startLng: -71.0942, // MIT (Boston)
    endLat: 37.4275,
    endLng: -122.1697, // Stanford
    arcAlt: 0.3,
    color: "#ec4899" // Pink
  },
  {
    order: 7,
    startLat: 37.8719,
    startLng: -122.2585, // Berkeley
    endLat: 33.7756,
    endLng: -84.3963, // Georgia Tech
    arcAlt: 0.3,
    color: "#f43f5e" // Rose
  },
  {
    order: 8,
    startLat: 47.3769,
    startLng: 8.5417, // ETH Zurich
    endLat: 55.7558,
    endLng: 37.6173, // Moscow
    arcAlt: 0.4,
    color: "#3b82f6" // Blue
  },
  // Additional connections
  {
    order: 9,
    startLat: -22.9068,
    startLng: -43.1729, // Rio
    endLat: 19.4326,
    endLng: -99.1332, // Mexico City
    arcAlt: 0.3,
    color: "#38bdf8" // Sky
  },
  {
    order: 10,
    startLat: 31.2304,
    startLng: 121.4737, // Shanghai
    endLat: -37.8136,
    endLng: 144.9631, // Melbourne
    arcAlt: 0.5,
    color: "#818cf8" // Indigo
  }
];

// Animation Helper function to create pulsing effect
export const createPulsingEffect = (
  globeRef: RefObject<ThreeGlobe>, 
  data: ArcData[]
): NodeJS.Timeout => {
  // Animation states
  let activePulses: ArcData[] = [];
  let activeConnections: ArcData[] = [];
  
  const startPulse = (): void => {
    if (!globeRef.current) return;
    
    // Generate new pulses
    const newPulseIndexes = genRandomNumbers(0, data.length, Math.min(3, data.length));
    const newPulses = data.filter((_, i) => newPulseIndexes.includes(i));
    
    // Add to active pulses
    activePulses = [...activePulses, ...newPulses];
    
    // Update globe rings
    globeRef.current.ringsData(activePulses);
    
    // Add visible connections
    const connectionsToAdd = data.filter((_, i) => newPulseIndexes.includes(i));
    activeConnections = [...activeConnections, ...connectionsToAdd];
    
    // Update visible arcs
    globeRef.current.arcsData(activeConnections);
    
    // Remove older pulses
    setTimeout(() => {
      if (!globeRef.current) return;
      activePulses = activePulses.filter(p => !newPulses.includes(p));
      globeRef.current.ringsData(activePulses);
    }, 3000);
  };
  
  // Start initial pulse
  startPulse();
  
  // Return interval to be cleared on component unmount
  return setInterval(startPulse, 2000);
};

// Helper function for generating random numbers
export const genRandomNumbers = (min: number, max: number, count: number): number[] => {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (arr.indexOf(r) === -1) arr.push(r);
  }
  return arr;
};