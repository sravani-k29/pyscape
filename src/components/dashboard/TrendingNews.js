import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TrendingNews = () => {
  const [articles, setArticles] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const queries = [
        "Artificial Intelligence AND (education OR research OR learning OR teaching)",
        "Python AND (tutorial OR course OR learning OR beginner OR projects OR careers)",
        "Deep Learning AND (research OR papers OR study OR tutorial OR student)",
        "ChatGPT OR OpenAI OR Claude OR Gemini AND (education OR learning OR study OR exam)",
        "LLM OR Large Language Model OR Generative AI AND (education OR learning OR research OR classroom OR teaching)",
        "EdTech OR Educational Technology OR Online Learning OR MOOCs OR Coursera OR Udemy"
      ];

      let allFetched = [];

      try {
        for (const q of queries) {
          const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
            q
          )}&lang=en&max=10&apikey=${process.env.REACT_APP_GNEWS_API_KEY}`;

          const res = await fetch(url);
          const data = await res.json();
          if (data.articles) {
            allFetched = [...allFetched, ...data.articles];
          }
        }

        const uniqueArticles = Array.from(
          new Map(allFetched.map((a) => [a.url, a])).values()
        );

        setAllArticles(uniqueArticles);        // save all
        setArticles(uniqueArticles.slice(0, 3)); // top 3 only
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-white text-center mt-4">Loading AI news...</p>;
  if (!articles.length) return <p className="text-white text-center mt-4">No news found.</p>;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        🤖 Latest AI & Tech Trends
      </h2>

      <div className="flex flex-col gap-3">
        {articles.map((a) => (
          <div
            key={a.url}
            className="flex gap-3 bg-gray-700 p-3 rounded-md hover:bg-gray-600 transition cursor-pointer"
          >
            {a.image && (
              <img
                src={a.image}
                alt={a.title}
                className="w-20 h-20 object-cover rounded-md flex-shrink-0"
              />
            )}
            <div className="flex flex-col justify-between">
              <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2">{a.title}</h3>
              <p className="text-gray-300 text-xs md:text-sm line-clamp-3">{a.description}</p>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-xs md:text-sm mt-1 hover:underline"
              >
                Read more →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <Link
          to="/app/all-news"
          state={{ articles: allArticles }} // pass all articles to AllNews
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Explore More →
        </Link>
      </div>
    </div>
  );
};

export default TrendingNews;
