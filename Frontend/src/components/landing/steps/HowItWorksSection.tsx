import { motion } from 'framer-motion';
interface StepProps {
    number: string;
    title: string;
    description: string;
    index: number;
  }
const Step = ({ number, title, description, index }: StepProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center relative"
    >
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white mb-4">
          {number}
        </div>
        {index < 3 && (
          <div className="absolute top-7 left-full w-full h-px bg-gradient-to-r from-blue-500/50 to-transparent hidden md:block"></div>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 max-w-xs">{description}</p>
    </motion.div>
  );
};

const steps = [
    {
      number: "1",
      title: "Submit Your Idea",
      description: "Start by proposing your project idea with a detailed description, goals, and expected outcomes."
    },
    {
      number: "2",
      title: "Gather Collaborators",
      description: "Find and invite team members and mentors with the right skills and experience for your project."
    },
    {
      number: "3",
      title: "Document Progress",
      description: "Update your project regularly with new developments, challenges, solutions, and media attachments."
    },
    {
      number: "4",
      title: "Showcase Results",
      description: "Present your completed project as part of your professional portfolio for future opportunities."
    }
  ];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            How ProjectXplore Works
          </h2>
          <p className="text-gray-300 text-lg">
            Our streamlined process helps you take your projects from concept to completion
            with powerful tools at every step.
          </p>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <Step 
            key={index}
            number={step.number}
            title={step.title}
            description={step.description}
            index={index}
          />
        ))}
      </div>
    </div>
  </section>
  );
};
