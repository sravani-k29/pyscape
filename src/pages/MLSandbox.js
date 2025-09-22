import React, { useState } from "react";
import { motion } from "framer-motion";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { dracula } from "@uiw/codemirror-theme-dracula";

const MLSandbox = () => {
  const [code, setCode] = useState(`import numpy as np
import matplotlib.pyplot as plt

# Generate random sine wave data
x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y, label="sin(x)")
plt.legend()
plt.show()`);
  
  const [output, setOutput] = useState({ stdout: '', stderr: '', isLoading: false });
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput({ stdout: '', stderr: '', isLoading: true });

    try {
      const response = await fetch('http://localhost:5000/api/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language: 'python'
        }),
      });

      const result = await response.json();
      setOutput({
        stdout: result.stdout || '',
        stderr: result.stderr || '',
        isLoading: false
      });
    } catch (error) {
      setOutput({
        stdout: '',
        stderr: `Connection Error: ${error.message}`,
        isLoading: false
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold mb-2">ML Sandbox</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          A browser-based playground to experiment with Python, ML libraries, and
          data visualization. Think of it as a lightweight, Jupyter-inspired
          environment—right inside your browser.
        </p>
      </motion.div>

      {/* Notebook Card */}
      <motion.div
        className="card p-6 rounded-2xl shadow-md bg-dark-lighter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 border-b border-dark-lightest pb-3">
          <h2 className="text-lg font-semibold">Notebook Environment</h2>
          <div className="flex gap-3">
            <button className="btn-secondary py-1 px-3 text-sm rounded-md">
              + New Cell
            </button>
            <button
              className={`btn-primary py-1 px-3 text-sm rounded-md ${isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={runCode}
              disabled={isRunning}
            >
              {isRunning ? '⏳ Running...' : '▶ Run'}
            </button>
          </div>
        </div>

        {/* Code Cell with CodeMirror */}
        <div className="bg-dark rounded-md p-4 mb-6">
          <div className="flex items-center mb-3 text-xs text-gray-400">
            <span className="bg-dark-lightest rounded px-2 py-1 mr-2">
              Cell [1]
            </span>
            <span>Python</span>
          </div>
          <CodeMirror
            value={code}
            height="300px"
            extensions={[python()]}
            theme={dracula}
            onChange={(value) => setCode(value)}
            className="rounded-md overflow-hidden"
          />
        </div>

        {/* Output Panel */}
        <div className="bg-dark rounded-md p-4 mb-6">
          <div className="flex items-center mb-3 text-xs text-gray-400">
            <span className="bg-dark-lightest rounded px-2 py-1 mr-2">
              Output
            </span>
            {output.isLoading && <span className="text-blue-400">Running...</span>}
          </div>
          
          {/* Output Content */}
          <div className="min-h-[100px] max-h-[400px] overflow-y-auto">
            {output.stdout && (
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">stdout:</div>
                <pre className="text-green-400 text-sm whitespace-pre-wrap bg-dark-lightest p-3 rounded">
                  {output.stdout}
                </pre>
              </div>
            )}
            
            {output.stderr && (
              <div className="mb-4">
                <div className="text-xs text-gray-400 mb-1">stderr:</div>
                <pre className="text-red-400 text-sm whitespace-pre-wrap bg-dark-lightest p-3 rounded">
                  {output.stderr}
                </pre>
              </div>
            )}
            
            {!output.stdout && !output.stderr && !output.isLoading && (
              <div className="text-gray-500 italic text-center py-8">
                Click "Run" to execute your code and see the output here
              </div>
            )}
            
            {output.isLoading && (
              <div className="text-blue-400 text-center py-8 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400 mr-3"></div>
                Executing code...
              </div>
            )}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold mb-2">ML Sandbox Coming Soon 🚀</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Soon you’ll be able to run Python code, import popular ML libraries,
            and build quick prototypes directly in your browser—powered by{" "}
            <span className="font-medium text-gray-200">Pyodide</span> and{" "}
            <span className="font-medium text-gray-200">WebAssembly</span>.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-md mx-auto">
            <div className="bg-dark-lightest p-4 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <p className="text-xs text-gray-400">Data Viz</p>
            </div>
            <div className="bg-dark-lightest p-4 rounded-lg">
              <div className="text-3xl mb-2">🧠</div>
              <p className="text-xs text-gray-400">ML Models</p>
            </div>
            <div className="bg-dark-lightest p-4 rounded-lg">
              <div className="text-3xl mb-2">📝</div>
              <p className="text-xs text-gray-400">Notebook Style</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MLSandbox;
