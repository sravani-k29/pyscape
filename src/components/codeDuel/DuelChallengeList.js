import React from 'react';
import { Link } from 'react-router-dom';

const DuelChallengeList = () => {
  const challenges = [
    {
      id: 1,
      title: "Find the Missing Number",
      description: "Given an array of integers from 1 to n with one number missing, find the missing number.",
      difficulty: "Easy",
      players: 24,
      timeLimit: 10 // minutes
    },
    {
      id: 2,
      title: "Valid Palindrome",
      description: "Check if a string is a valid palindrome considering only alphanumeric characters and ignoring case.",
      difficulty: "Easy",
      players: 18,
      timeLimit: 10 // minutes
    },
    {
      id: 3,
      title: "Two Sum",
      description: "Find two numbers in an array that add up to a specific target.",
      difficulty: "Easy",
      players: 32,
      timeLimit: 15 // minutes
    },
    {
      id: 4,
      title: "Binary Tree Level Order Traversal",
      description: "Given a binary tree, return the level order traversal of its nodes' values.",
      difficulty: "Medium",
      players: 12,
      timeLimit: 20 // minutes
    },
    {
      id: 5,
      title: "LRU Cache",
      description: "Design and implement a data structure for Least Recently Used (LRU) cache.",
      difficulty: "Hard",
      players: 8,
      timeLimit: 30 // minutes
    }
  ];

  // Define difficulty level colors
  const difficultyColors = {
    'Easy': 'bg-green-700/30 text-green-400',
    'Medium': 'bg-yellow-700/30 text-yellow-400',
    'Hard': 'bg-red-700/30 text-red-400'
  };

  return (
    <div className="card">
      <div className="p-4 border-b border-dark-lightest">
        <h2 className="text-xl font-semibold">Available Challenges</h2>
      </div>
      <div className="divide-y divide-dark-lightest">
        {challenges.map(challenge => (
          <div key={challenge.id} className="p-4 hover:bg-dark-lightest transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{challenge.title}</h3>
                <p className="text-sm text-gray-400">{challenge.description}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${difficultyColors[challenge.difficulty]}`}>
                {challenge.difficulty}
              </span>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex items-center text-xs text-gray-400">
                <span className="mr-4">
                  <span className="font-medium text-white">{challenge.timeLimit}</span> min time limit
                </span>
                <span>
                  <span className="font-medium text-white">{challenge.players}</span> players online
                </span>
              </div>
              <Link 
                to={`/duel/${challenge.id}`} 
                className="py-1 px-3 bg-primary hover:bg-primary-dark text-white text-sm rounded transition-colors"
              >
                Start Challenge
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DuelChallengeList;
