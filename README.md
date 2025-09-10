# Pyscape - Adaptive Learning Platform

Pyscape is a web-based adaptive learning platform focused on Python, Artificial Intelligence, Machine Learning, Data Science, Generative AI, and Agentic AI. The platform provides personalized learning paths, interactive algorithm visualizations, project-based labs, real-time challenges, and an integrated portfolio system to showcase completed work.

## Core Features

1. **Adaptive Learning Platform**
   - Personalized learning paths
   - Gamified learning (XP, badges, levels)
   - Knowledge assessment quiz

2. **Algorithm Visualizer**
   - Interactive step-by-step algorithm visualization
   - Compare different algorithms

3. **Project Labs**
   - Guided practical projects
   - Performance metrics and visualization
   - Portfolio integration

4. **Real-time Learning Engagement**
   - AI news and updates dashboard
   - Real-time coding duels
   - In-browser ML sandbox

5. **Portfolio View**
   - Project showcasing
   - Performance metrics
   - Exportable as PDF

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Supabase (Postgres + Auth)
- **AI & Learning Engine**: OpenAI/Anthropic API, LangChain
- **Algorithm Visualizer**: D3.js / React-Vis
- **Real-time Components**: Supabase Realtime, WebSockets, Pyodide

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/pyscape.git
   cd pyscape
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   REACT_APP_SUPABASE_URL=your-supabase-project-url
   REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
   REACT_APP_OPENAI_API_KEY=your-openai-api-key
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
pyscape/
├── public/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── codeDuel/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── portfolio/
│   │   ├── projects/
│   │   ├── sandbox/
│   │   └── visualizer/
│   ├── context/
│   ├── hooks/
│   ├── pages/
│   ├── utils/
│   ├── App.js
│   └── index.js
└── package.json
```

## Deployment

To build the app for production:

```
npm run build
```

This creates an optimized build in the `build` folder that can be deployed to any static hosting service.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspiration from modern developer platforms and learning environments
- Algorithm visualizations inspired by AlgoViz and similar educational tools
