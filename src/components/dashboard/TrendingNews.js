import React from 'react';
import { Link } from 'react-router-dom';

const TrendingNews = () => {
  const newsItems = [
    {
      id: 1,
      source: 'The Verge',
      time: '2 hours ago',
      title: 'New AI Model from Google Challenges GPT-4\'s Dominance',
      description: 'Google\'s latest AI, "Gemini", has been released, showing impressive results in multimodal reasoning benchmarks, directly competing with OpenAI\'s flagship model...',
      imageUrl: '/images/news-1.jpg'
    },
    {
      id: 2,
      source: 'TechCrunch',
      time: '5 hours ago',
      title: 'The Rise of Small Language Models in Edge Computing',
      description: 'Small language models are gaining traction for their efficiency and privacy advantages in edge computing applications...',
    },
    {
      id: 3,
      source: 'Towards Data Science',
      time: '1 day ago',
      title: 'Python 3.12: What\'s New for ML Developers',
      description: 'The latest Python release brings performance improvements and new features specifically beneficial for machine learning workflows...',
    }
  ];

  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="text-primary mr-2">🔍</span> Explore AI Trends
        </h2>
        <Link to="/news" className="text-primary hover:text-primary-light text-sm">View all</Link>
      </div>
      
      <div className="space-y-6">
        {newsItems.map((item) => (
          <div key={item.id} className="border-b border-dark-lightest pb-4 last:border-0">
            <div className="flex flex-col md:flex-row gap-4">
              {item.imageUrl && (
                <div className="flex-shrink-0">
                  <div className="bg-dark-lightest w-32 h-32 rounded-md flex items-center justify-center text-3xl">
                    AI
                  </div>
                </div>
              )}
              <div>
                <div className="flex items-center text-xs text-gray-400 mb-1">
                  <span>{item.source}</span>
                  <span className="mx-2">•</span>
                  <span>{item.time}</span>
                </div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
                <Link to={`/news/${item.id}`} className="text-primary text-sm mt-2 inline-block">
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNews;
