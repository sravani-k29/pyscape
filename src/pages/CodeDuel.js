import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DuelChallengeList from '../components/codeDuel/DuelChallengeList';
import DuelLeaderboard from '../components/codeDuel/DuelLeaderboard';

const CodeDuel = () => {
  const [activeTab, setActiveTab] = useState('challenges');
  
  const tabs = [
    { id: 'challenges', label: 'Challenges' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'history', label: 'Your History' }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Code Duel</h1>
        <p className="text-gray-400">
          Challenge other learners and climb the leaderboard in real-time coding battles.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'challenges' && <DuelChallengeList />}
          {activeTab === 'leaderboard' && <DuelLeaderboard />}
          {activeTab === 'history' && (
            <div className="card p-6">
              <div className="text-center py-10">
                <h3 className="text-lg font-medium mb-2">No recent duels</h3>
                <p className="text-gray-400 mb-4">
                  You haven't participated in any coding duels yet.
                </p>
                <button className="btn-primary">Find a Match</button>
              </div>
            </div>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Match</h2>
            <p className="text-gray-400 text-sm mb-6">
              Start a random coding challenge against another user.
            </p>
            <button className="btn-primary w-full mb-6">Find a Match</button>
            
            <div className="border-t border-dark-lightest pt-6">
              <h3 className="font-medium mb-2">Your Stats</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-dark-lightest p-3 rounded-md text-center">
                  <div className="text-2xl font-semibold text-primary">0</div>
                  <div className="text-xs text-gray-400">Wins</div>
                </div>
                <div className="bg-dark-lightest p-3 rounded-md text-center">
                  <div className="text-2xl font-semibold text-red-500">0</div>
                  <div className="text-xs text-gray-400">Losses</div>
                </div>
                <div className="bg-dark-lightest p-3 rounded-md text-center">
                  <div className="text-2xl font-semibold">0</div>
                  <div className="text-xs text-gray-400">Rank</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeDuel;
