import React from 'react';
import { motion } from 'framer-motion';

const MLSandbox = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">ML Sandbox</h1>
        <p className="text-gray-400">
          Experiment with Python & ML code instantly in a Jupyter-like environment.
        </p>
      </motion.div>

      <motion.div
        className="card p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">In-Browser ML Environment</h2>
          <div className="flex gap-2">
            <button className="btn-secondary py-1 px-3 text-sm">New Notebook</button>
            <button className="btn-primary py-1 px-3 text-sm">Run</button>
          </div>
        </div>
        
        <div className="bg-dark-lighter rounded-md p-4 mb-4">
          <div className="flex mb-2">
            <div className="bg-dark-lightest rounded-sm px-2 py-1 text-xs mr-2">Cell [1]:</div>
            <div className="text-xs text-gray-400">Python</div>
          </div>
          <pre className="font-mono text-sm text-gray-300 bg-dark-lightest p-3 rounded-md">
            <code>{`import numpy as np
import matplotlib.pyplot as plt
            
# Generate some random data for a simple plot
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(8, 4))
plt.plot(x, y, 'b-', label='sin(x)')
plt.title('Simple Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.grid(True)
plt.legend()
plt.show()`}</code>
          </pre>
        </div>
        
        <div className="bg-dark-lighter rounded-md p-4 flex justify-center">
          <div className="text-center py-10 px-4">
            <h3 className="text-lg font-medium mb-2">ML Sandbox Coming Soon!</h3>
            <p className="text-gray-400 mb-6 max-w-lg">
              The ML Sandbox will let you run Python code, import popular ML libraries, 
              and test algorithms directly in your browser. Powered by WebAssembly and Pyodide.
            </p>
            <div className="flex justify-center gap-4 text-center">
              <div className="bg-dark-lightest p-3 rounded-md w-24">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-xs text-gray-400">Data Viz</div>
              </div>
              <div className="bg-dark-lightest p-3 rounded-md w-24">
                <div className="text-3xl mb-2">🧠</div>
                <div className="text-xs text-gray-400">ML Models</div>
              </div>
              <div className="bg-dark-lightest p-3 rounded-md w-24">
                <div className="text-3xl mb-2">📝</div>
                <div className="text-xs text-gray-400">Jupyter-like</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MLSandbox;
