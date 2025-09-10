import React from 'react';
import { Link } from 'react-router-dom';

const MLSandboxPreview = () => {
  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="text-primary mr-2">🧩</span> ML Sandbox
        </h2>
        <Link to="/sandbox" className="text-primary hover:text-primary-light text-sm">Open</Link>
      </div>
      
      <div className="text-center py-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-dark-lightest rounded-full mb-4">
          <span className="text-3xl">🧪</span>
        </div>
        <h3 className="text-lg font-medium mb-2">Experiment with Python & ML code</h3>
        <p className="text-gray-400 text-sm mb-4">Instantly in a Jupyter-like environment.</p>
        <Link to="/sandbox" className="btn-primary inline-block">
          Launch Sandbox
        </Link>
      </div>
    </div>
  );
};

export default MLSandboxPreview;
