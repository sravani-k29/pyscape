# PyScape Backend - Code Execution API

This backend provides a secure API for executing Python and JavaScript code in a sandboxed environment.

## Features

- ✅ Code execution for Python and JavaScript
- ✅ Sandboxed execution with timeouts
- ✅ CORS support for React frontend
- ✅ Error handling and security measures
- ✅ Temporary file management

## Setup Instructions

### 1. Install Dependencies

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

### 2. Install Required Runtimes

Make sure you have Python and Node.js installed on your system:

- **Python**: Download from [python.org](https://python.org) (3.8+ recommended)
- **Node.js**: Already installed (for JavaScript execution)

### 3. Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

### 4. Test the API

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

Test code execution:
```bash
curl -X POST http://localhost:5000/api/run \
  -H "Content-Type: application/json" \
  -d '{"code": "print(\"Hello World!\")", "language": "python"}'
```

## API Endpoints

### POST /api/run

Execute code in a sandboxed environment.

**Request Body:**
```json
{
  "code": "print('Hello World!')",
  "language": "python"
}
```

**Response:**
```json
{
  "stdout": "Hello World!\n",
  "stderr": "",
  "exitCode": 0,
  "error": null
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Supported Languages

- **Python** (`.py`)
- **JavaScript** (`.js`)

## Security Features

- Execution timeout (10 seconds default)
- Temporary file cleanup
- CORS protection
- Input validation
- Process isolation

## Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

## Troubleshooting

1. **Port already in use**: Change PORT in `.env` file
2. **Python not found**: Ensure Python is in your system PATH
3. **CORS errors**: Check the frontend URL in server.js
4. **Timeout errors**: Increase MAX_EXECUTION_TIME in `.env`

## Production Deployment

For production, consider:
- Using Docker containers for better isolation
- Implementing rate limiting
- Adding authentication
- Using a process manager like PM2
- Setting up proper logging