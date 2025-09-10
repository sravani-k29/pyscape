import React from 'react';
import { motion } from 'framer-motion';

const Portfolio = () => {
  const projects = [
    {
      id: 1,
      title: 'Sentiment Analyzer',
      description: 'A model that analyzes text sentiment using NLP techniques.',
      date: '2023-09-05',
      keywords: ['NLP', 'Python', 'NLTK'],
      metrics: {
        accuracy: '87%',
        f1Score: '0.85',
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Portfolio</h1>
        <p className="text-gray-400">
          Showcase your completed projects and achievements.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {projects.length > 0 ? (
            <div className="card">
              <div className="p-4 border-b border-dark-lightest">
                <h2 className="text-xl font-semibold">Your Projects</h2>
              </div>
              <div className="divide-y divide-dark-lightest">
                {projects.map(project => (
                  <div key={project.id} className="p-6">
                    <h3 className="text-lg font-medium mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.keywords.map((keyword, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-dark-lightest px-2 py-1 rounded"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                    
                    <div className="bg-dark-lighter rounded-md p-4 mb-4">
                      <h4 className="text-sm font-medium mb-3">Performance Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-gray-400 mb-1">Accuracy</div>
                          <div className="text-lg font-medium text-primary">{project.metrics.accuracy}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-400 mb-1">F1 Score</div>
                          <div className="text-lg font-medium text-primary">{project.metrics.f1Score}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        Completed on {new Date(project.date).toLocaleDateString()}
                      </div>
                      <button className="btn-secondary py-1 px-3 text-sm">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="card p-6">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-dark-lightest rounded-full mb-4">
                  <span className="text-3xl">📁</span>
                </div>
                <h3 className="text-lg font-medium mb-2">No projects yet</h3>
                <p className="text-gray-400 mb-4">
                  Complete projects in the Project Labs to add them to your portfolio.
                </p>
                <button className="btn-primary">Go to Project Labs</button>
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Export Portfolio</h2>
            <p className="text-gray-400 text-sm mb-6">
              Generate a professional PDF of your portfolio to share with others.
            </p>
            <button className="btn-primary w-full">
              Export as PDF
            </button>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-dark-lightest rounded-md">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  🏆
                </div>
                <div>
                  <h3 className="font-medium">First Project</h3>
                  <p className="text-xs text-gray-400">Complete your first project</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-dark-lightest rounded-md opacity-50">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                  🔥
                </div>
                <div>
                  <h3 className="font-medium">5-Day Streak</h3>
                  <p className="text-xs text-gray-400">Learn for 5 consecutive days</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-dark-lightest rounded-md opacity-50">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
                  💯
                </div>
                <div>
                  <h3 className="font-medium">Perfect Score</h3>
                  <p className="text-xs text-gray-400">Get 100% on any challenge</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Portfolio;
