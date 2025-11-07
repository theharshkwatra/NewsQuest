import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Newspaper, Clock, ExternalLink, TrendingUp, Eye } from "lucide-react";
import "./SlideInNewsPanel.css";

export default function SlideInNewsPanel({ state, showNews, onClose }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state && showNews) {
      setLoading(true);

      // Simulated API fetch
      setTimeout(() => {
        setArticles([
          {
            id: 1,
            title: `Breaking: Major Development in ${state}`,
            summary: `Recent reports from ${state} indicate significant changes in the region's political landscape.`,
            timestamp: "2 hours ago",
            category: "Politics",
            views: "12.4K",
            trending: true,
          },
          {
            id: 2,
            title: `${state} Economy Shows Positive Growth`,
            summary: `Economic indicators reveal promising trends with increased investment and job creation.`,
            timestamp: "4 hours ago",
            category: "Economy",
            views: "8.2K",
            trending: false,
          },
          {
            id: 3,
            title: `Infrastructure Projects Announced in ${state}`,
            summary: `Government unveils development plans improving connectivity and services.`,
            timestamp: "6 hours ago",
            category: "Infrastructure",
            views: "5.7K",
            trending: false,
          },
        ]);
        setLoading(false);
      }, 800);
    }
  }, [state, showNews]);

  if (!showNews) return null;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="news-panel"
    >
      <div className="panel-glow"></div>

      <div classname="panel-container">
        {/* Header */}
        <div className="panel-header">
          <div className="header-left">
            <motion.div
              className="header-icon"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(6,182,212,0.3)",
                  "0 0 40px rgba(6,182,212,0.6)",
                  "0 0 20px rgba(6,182,212,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Newspaper className="icon-white" />
            </motion.div>

            <div>
              <h2 className="header-title">Latest News</h2>
              <p className="header-sub">{state}</p>
            </div>
          </div>

          <motion.button
            className="close-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
          >
            <X className="icon-red" />
          </motion.button>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="live-badge">
            <div className="live-dot"></div> LIVE FEED
          </div>
          <div className="article-count">{articles.length} articles</div>
        </div>

        {/* Scroll Area */}
        <div className="panel-content">
          {loading ? (
            <div className="loading-cards">
              {[1, 2, 3].map((i) => (
                <div key={i} className="loading-card"></div>
              ))}
            </div>
          ) : (
            articles.map((a, index) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="article-card"
              >
                <div className="article-top">
                  <span className="category-chip">{a.category}</span>

                  <div className="article-meta">
                    {a.trending && (
                      <span className="trending">
                        <TrendingUp className="meta-icon" /> Trending
                      </span>
                    )}
                    <span><Eye className="meta-icon" /> {a.views}</span>
                    <span><Clock className="meta-icon" /> {a.timestamp}</span>
                  </div>
                </div>

                <h3 className="article-title">{a.title}</h3>
                <p className="article-summary">{a.summary}</p>

                <div className="read-more">
                  Read full article <ExternalLink className="meta-icon" />
                </div>

                <div className="bottom-accent"></div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
