import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { globeConfig, sampleArcs } from '@/components/home/Globeconts';
import { useRouter } from 'next/navigation';
// Option 1: Dynamic import with SSR disabled
import dynamic from 'next/dynamic';

const World = dynamic(
    () => import("@/components/ui/globe").then((m) => m.World),
    {
        ssr: false,
    }
);
const HeroParticles = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-blue-500/20"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        width: `${Math.max(4, Math.random() * 12)}px`,
                        height: `${Math.max(4, Math.random() * 12)}px`,
                        animation: `float ${Math.max(15, Math.random() * 40)}s infinite linear`,
                        animationDelay: `${Math.random() * 5}s`,
                        opacity: Math.random() * 0.5 + 0.3
                    }}
                />
            ))}
        </div>
    );
};

export const HeroSection = () => {
     const router = useRouter();
    return (
        <section id="home" className="pt-28 pb-20 relative">
            <HeroParticles />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1"
                    >
                        <div className="space-y-6 max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 border border-blue-800/50 text-blue-400 text-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Now in Public Beta
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"> Connect Across the Globe to <span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent"> Build Tomorrow&apos;s Projects </span> </h1> <p className="text-lg text-gray-300 leading-relaxed"> ProjectXplore brings developers worldwide together to transform ideas into reality with collaborative tools, structured workflows, and portfolio showcases all in one powerful platform. </p>

                            <div className="flex flex-wrap gap-4">
                                <Button onClick={()=>router.replace("/auth/signup")} size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 gap-2">
                                    Start Creating <ArrowRight className="w-4 h-4" />
                                </Button>

                            </div>

                            <div className="pt-6">
                                <p className="text-gray-400 text-sm mb-2">Trusted by teams at</p>
                                <div className="flex flex-wrap gap-6 items-center">
                                    {['MIT', 'Stanford', 'Berkeley', 'Georgia Tech', 'ETH Zurich'].map((name, i) => (
                                        <div key={i} className="text-gray-500 font-semibold text-lg">
                                            {name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex-1 hidden md:block"
                    >
                        <div className="relative h-[600px]">
                            {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl opacity-30 blur-xl"></div>
                <div className="relative h-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900/80 backdrop-blur-sm shadow-2xl">
                  <div className="h-8 bg-gray-900 border-b border-gray-800 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <div className="relative h-[calc(100%-2rem)]">
                  </div>
                </div> */}
                            <World globeConfig={globeConfig} data={sampleArcs} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
