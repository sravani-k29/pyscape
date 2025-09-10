import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SortingVisualizer from '../components/visualizer/SortingVisualizer';
import PathfindingVisualizer from '../components/visualizer/PathfindingVisualizer';
import DataStructureVisualizer from '../components/visualizer/DataStructureVisualizer';

const AlgorithmVisualizer = () => {
  const [activeTab, setActiveTab] = useState('sorting');
  
  const tabs = [
    { id: 'sorting', label: 'Sorting Algorithms' },
    { id: 'pathfinding', label: 'Pathfinding' },
    { id: 'dataStructure', label: 'Data Structures' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Algorithm Visualizer</h1>
        <p className="text-gray-400">
          Interact with common algorithms to understand how they work step-by-step.
        </p>
      </motion.div>

      <div className="mb-6">
        <div className="border-b border-dark-lightest flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`py-3 px-5 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        {activeTab === 'sorting' && <SortingVisualizer />}
        {activeTab === 'pathfinding' && <PathfindingVisualizer />}
        {activeTab === 'dataStructure' && <DataStructureVisualizer />}
      </motion.div>
    </div>
  );
};

export default AlgorithmVisualizer;
