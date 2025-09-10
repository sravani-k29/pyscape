import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const navItems = [
    { to: '/', icon: '🏠', label: 'Dashboard', exact: true },
    { to: '/learn', icon: '📚', label: 'Learn' },
    { to: '/visualizer', icon: '📊', label: 'Visualizer' },
    { to: '/projects', icon: '🧪', label: 'Project Labs' },
    { to: '/duel', icon: '⚔️', label: 'Code Duel' },
    { to: '/sandbox', icon: '🧩', label: 'ML Sandbox' },
    { to: '/portfolio', icon: '📁', label: 'Portfolio' }
  ];

  return (
    <nav className="bg-dark-lighter w-64 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <motion.h1 
          className="text-2xl font-bold text-primary flex items-center" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-3xl mr-2">C</span> Pyscape
        </motion.h1>
      </div>

      <div className="flex-1">
        {navItems.map((item, index) => (
          <motion.div
            key={item.to}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <NavLink
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center p-3 mb-2 rounded-md transition-all ${
                  isActive
                    ? 'bg-primary text-white font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-dark-lightest'
                }`
              }
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </motion.div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-dark-lightest">
        <div className="flex items-center p-3 text-gray-400">
          <span className="w-8 h-8 bg-dark-lightest rounded-full flex items-center justify-center mr-2">
            👤
          </span>
          <span>User Profile</span>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
