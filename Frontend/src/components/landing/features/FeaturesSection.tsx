import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Rocket, Globe, Users, Code, Layers, CheckCircle, LucideIcon } from 'lucide-react';
interface FeatureCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    index: number;
  }
  
const FeatureCard = ({ icon: Icon, title, description, index }: FeatureCardProps) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group"
      >
        <Card className="h-full border-0 bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-sm relative overflow-hidden shadow-lg">
          <CardHeader className="pb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-xl text-white">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{description}</p>
          </CardContent>
          <div className="absolute inset-0 border border-gray-800 rounded-lg pointer-events-none"></div>
          <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        </Card>
      </motion.div>
    );
  };

const features = [
    {
      icon: Rocket,
      title: "Project Lifecycle Management",
      description: "Manage your project from ideation to execution with comprehensive tracking, documentation, and collaboration tools."
    },
    {
      icon: Layers,
      title: "Structured Project Creation",
      description: "Create projects with detailed specifications, technical requirements, features, milestones, and deliverables."
    },
    {
      icon: Users,
      title: "Room-based Collaboration",
      description: "Work together with your team in virtual rooms with real-time updates, discussions, and media sharing."
    },
    {
      icon: Code,
      title: "Technical Documentation",
      description: "Document your tech stack, programming languages, frameworks, and database choices with proper versioning."
    },
    {
      icon: Globe,
      title: "Project Portfolio",
      description: "Generate a comprehensive portfolio showcasing your projects, skills, and achievements to the world."
    },
    {
      icon: CheckCircle,
      title: "Progress Tracking",
      description: "Track milestones, deliverables, and success metrics with visual progress indicators and updates."
    }
  ];

export const FeaturesSection = () => {
  return (
          <section id="features" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Everything You Need to Build Amazing Projects
                  </h2>
                  <p className="text-gray-300 text-lg">
                    ProjectXplore provides a complete toolkit for technical project management,
                    from initial concept to final portfolio showcase.
                  </p>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <FeatureCard 
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
  );
};
