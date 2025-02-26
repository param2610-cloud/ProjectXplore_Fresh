import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Globe, Layers, Users } from 'lucide-react';

export const ShowcaseSection = () => {
  return (
    <section id="showcase" className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg">
            Explore some of the amazing projects created and managed with ProjectXplore.
          </p>
        </motion.div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="software">Software</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 bg-gradient-to-b from-gray-900/80 to-gray-900/40 backdrop-blur-sm relative shadow-lg h-full">
                  <div className="h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gray-800/80 flex items-center justify-center">
                        {i % 3 === 0 ? (
                          <Code className="w-8 h-8 text-blue-400" />
                        ) : i % 3 === 1 ? (
                          <Layers className="w-8 h-8 text-indigo-400" />
                        ) : (
                          <Globe className="w-8 h-8 text-purple-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-white flex items-center justify-between">
                      Project Name {i}
                      <span className="text-xs py-1 px-2 bg-blue-900/30 text-blue-400 rounded-full">
                        {i % 3 === 0 ? 'Software' : i % 3 === 1 ? 'Hardware' : 'Research'}
                      </span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      By Team Innovators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 line-clamp-3">
                      A comprehensive solution that utilizes modern technologies to solve real-world
                      problems with innovative approaches and sustainable practices.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{Math.floor(Math.random() * 5) + 2} Members</span>
                    </div>
                    <Button variant="ghost" className="text-blue-400 p-0 hover:text-blue-300 hover:bg-transparent">
                      View Details
                    </Button>
                  </CardFooter>
                  <div className="absolute inset-0 border border-gray-800 rounded-lg pointer-events-none"></div>
                  <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="hardware" className="mt-0">
          <div className="flex justify-center items-center py-16">
            <p className="text-gray-400">Hardware projects will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="software" className="mt-0">
          <div className="flex justify-center items-center py-16">
            <p className="text-gray-400">Software projects will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="research" className="mt-0">
          <div className="flex justify-center items-center py-16">
            <p className="text-gray-400">Research projects will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 text-center">
        <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
          Explore All Projects
        </Button>
      </div>
    </div>
  </section>
  );
};
