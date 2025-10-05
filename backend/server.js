const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Create temp directory for code execution
const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Language configurations
const LANGUAGE_CONFIG = {
  python: {
    command: 'python',
    extension: '.py',
    timeout: 10000 // 10 seconds
  },
  javascript: {
    command: 'node',
    extension: '.js',
    timeout: 10000
  },
  // Add more languages as needed
};

// Code execution endpoint
app.post('/api/run', async (req, res) => {
  const { code, language = 'python' } = req.body;

  if (!code) {
    return res.status(400).json({ 
      error: 'Code is required',
      stdout: '',
      stderr: 'Error: No code provided'
    });
  }

  if (!LANGUAGE_CONFIG[language]) {
    return res.status(400).json({
      error: `Language '${language}' is not supported`,
      stdout: '',
      stderr: `Error: Unsupported language '${language}'`
    });
  }

  const config = LANGUAGE_CONFIG[language];
  const fileId = uuidv4();
  const fileName = `code_${fileId}${config.extension}`;
  const filePath = path.join(TEMP_DIR, fileName);

  try {
    // Write code to temporary file
    fs.writeFileSync(filePath, code);

    // Execute the code
    const result = await executeCode(config.command, filePath, config.timeout);
    
    // Clean up
    fs.unlinkSync(filePath);

    res.json(result);
  } catch (error) {
    // Clean up on error
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.status(500).json({
      error: 'Execution failed',
      stdout: '',
      stderr: error.message
    });
  }
});

// Execute code with timeout
function executeCode(command, filePath, timeout) {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    
    const child = spawn(command, [filePath], {
      timeout: timeout,
      killSignal: 'SIGTERM'
    });

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      resolve({
        stdout: stdout,
        stderr: stderr,
        exitCode: code,
        error: code !== 0 ? 'Process exited with non-zero code' : null
      });
    });

    child.on('error', (error) => {
      resolve({
        stdout: stdout,
        stderr: stderr + error.message,
        exitCode: -1,
        error: error.message
      });
    });
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    stdout: '',
    stderr: 'Internal server error'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📁 Temp directory: ${TEMP_DIR}`);
});