import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {Button} from '@/components/ui/button'

const CTAsection = () => {
  return (
    <section className="py-20 relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative px-6 py-16 md:py-20 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Project Management?
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of developers, engineers, and innovators who are using
              ProjectXplore to create, collaborate, and showcase amazing projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 gap-2">
                Get Started for Free <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-700 text-gray-200 hover:bg-gray-800/50"
              >
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default CTAsection