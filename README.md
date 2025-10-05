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
   REACT_APP_GNEWS_API_KEY=your-gnews-api-key
   ```

4. **Set up Supabase Database**:
   
   Go to your Supabase dashboard → SQL Editor and run the following SQL to create the required tables:

   ```sql
   -- Create the profiles table
   CREATE TABLE public.profiles (
     id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
     full_name TEXT,
     nickname TEXT,
     gender TEXT,
     role TEXT,
     organization TEXT,
     bio TEXT,
     avatar_url TEXT,
     profile_complete BOOLEAN DEFAULT FALSE,
     onboarding_completed BOOLEAN DEFAULT FALSE,
     selected_topics TEXT[],
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Enable Row Level Security
   ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

   -- Create policies to allow authenticated users to manage their own profiles
   CREATE POLICY "Users can view their own profile" 
   ON public.profiles 
   FOR SELECT 
   USING (auth.uid() = id);

   CREATE POLICY "Users can insert their own profile" 
   ON public.profiles 
   FOR INSERT 
   WITH CHECK (auth.uid() = id);

   CREATE POLICY "Users can update their own profile" 
   ON public.profiles 
   FOR UPDATE 
   USING (auth.uid() = id);

   -- Create an updated_at trigger
   CREATE OR REPLACE FUNCTION public.handle_updated_at()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = NOW();
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql;

   CREATE TRIGGER profiles_updated_at
     BEFORE UPDATE ON public.profiles
     FOR EACH ROW
     EXECUTE FUNCTION public.handle_updated_at();
   ```

   **If you already have an existing profiles table**, run this migration:
   ```sql
   -- Add the selected_topics column to existing table
   ALTER TABLE public.profiles 
   ADD COLUMN selected_topics TEXT[] DEFAULT NULL;
   
   -- Add comment for documentation
   COMMENT ON COLUMN public.profiles.selected_topics IS 'Array of topic IDs selected by user during onboarding';
   ```

5. Start the development server:
   ```
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Profiles Table

The `profiles` table stores user profile information:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key, references auth.users(id) |
| full_name | TEXT | User's full name |
| nickname | TEXT | User's preferred nickname |
| gender | TEXT | User's gender |
| role | TEXT | User's role (Student, Professional, etc.) |
| organization | TEXT | User's organization/school |
| bio | TEXT | User's biography |
| avatar_url | TEXT | URL to user's avatar image |
| profile_complete | BOOLEAN | Whether profile setup is complete |
| onboarding_completed | BOOLEAN | Whether topic selection is complete |
| selected_topics | TEXT[] | Array of selected topic IDs |
| created_at | TIMESTAMPTZ | Record creation timestamp |
| updated_at | TIMESTAMPTZ | Last update timestamp |

### Row Level Security (RLS)

The profiles table uses RLS policies to ensure users can only access their own data:
- Users can SELECT their own profile
- Users can INSERT their own profile
- Users can UPDATE their own profile

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
