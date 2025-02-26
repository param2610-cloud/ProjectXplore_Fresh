'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Rocket,
   
    Menu,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/landing/hero/HeroSection';
import { FeaturesSection } from '@/components/landing/features/FeaturesSection';
import { ShowcaseSection } from '@/components/landing/showcase/ShowcaseSection';
import CTAsection from '@/components/landing/cta/CTAsection';
import Footer from '@/components/landing/footer/Footer';
import { useRouter } from 'next/navigation';
import ProjectXploreLogo from '@/components/logo/ProjectXplore';





const GradientBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl" />
            <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-600/20 to-cyan-600/20 blur-3xl" />
        </div>
    );
};

interface NavItemProps {
    title: string;
    href: string;
    isActive?: boolean;
}

const NavItem = ({ title, href, isActive }: NavItemProps) => {
    return (
        <Link
            href={href}
            className={`relative px-3 py-2 transition-colors ${isActive
                    ? 'text-white font-medium'
                    : 'text-gray-300 hover:text-white'
                }`}
        >
            {title}
            {isActive && (
                <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500"
                />
            )}
        </Link>
    );
};







// Main component
export default function ProjectXploreLanding() {
    const [activeSection, setActiveSection] = useState('home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router  = useRouter();

    // Update active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id') || '';

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(sectionId);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);




    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <GradientBackground />

            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-gray-800/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                           <ProjectXploreLogo className='w-[240px] h-[80px]'/>
                        </div>

                        {/* Desktop Menu */}
                        <nav className="hidden md:flex space-x-4">
                            <NavItem title="Home" href="#home" isActive={activeSection === 'home'} />
                            <NavItem title="Features" href="#features" isActive={activeSection === 'features'} />
                            <NavItem title="How It Works" href="#how-it-works" isActive={activeSection === 'how-it-works'} />
                            <NavItem title="Showcase" href="#showcase" isActive={activeSection === 'showcase'} />
                        </nav>

                        <div className="hidden md:flex gap-4">
                            <Button onClick={()=>router.replace("/auth/signin")} variant="outline" className="border-gray-700 text-gray-300 hover:text-white text-black">
                                Sign In
                            </Button>
                            <Button onClick={()=>router.replace("/auth/signup")} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                                Get Started
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md border border-gray-700"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden fixed top-16 left-0 w-full bg-gray-900/95 backdrop-blur-lg z-40 border-b border-gray-800"
                    >
                        <div className="py-4 px-6 flex flex-col gap-4">
                            {['home', 'features', 'how-it-works', 'showcase'].map(section => (
                                <Link
                                    key={section}
                                    href={`#${section}`}
                                    className={`py-2 ${activeSection === section ? 'text-blue-400' : 'text-gray-300'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-800">
                                <Button variant="outline" className="border-gray-700 text-gray-300">
                                    Sign In
                                </Button>
                                <Button className="bg-gradient-to-r from-blue-500 to-indigo-600">
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <HeroSection />

            {/* Features Section */}
            <FeaturesSection />

            {/* How It Works Section */}


            {/* Showcase Section */}
            <ShowcaseSection />

            {/* CTA Section */}
            <CTAsection />

            {/* Footer */}
            <Footer />

            {/* Back to top button */}
            <div className="fixed bottom-8 right-8 z-50">
                <Link
                    href="#home"
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                </Link>
            </div>

            {/* Cookie consent banner */}
            {/* <div className="fixed bottom-0 inset-x-0 pb-2 sm:pb-5 z-40">
        <Drawer open={true}>
          <DrawerTrigger asChild>
            <div></div>
          </DrawerTrigger>
          <DrawerContent className="bg-gray-900 border-t border-gray-800">
            <div className="max-w-full   mx-auto px-4 sm:px-6 lg:px-8">
              <div className="w-full flex-grow py-3 flex items-center justify-between">
                <div className="w-0 flex-1 flex items-center">
                  <DrawerHeader className="p-0">
                    <DrawerTitle className="text-white">Cookie Notice</DrawerTitle>
                    <DrawerDescription className="text-gray-400">
                      We use cookies to enhance your browsing experience, analyze site traffic, and personalize content.
                    </DrawerDescription>
                  </DrawerHeader>
                </div>
                <div className="mt-2 sm:mt-0 sm:ml-6 flex gap-3 flex-shrink-0">
                  <Button variant="outline" className="border-gray-700 text-gray-300">
                    Customize
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-indigo-600">
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div> */}
        </div>
    );
}
