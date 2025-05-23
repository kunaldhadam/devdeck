// server/routes/fetchRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const newsAPIKey = process.env.NEWS_API_KEY;

const Sentiment = require('sentiment');
const sentiment = new Sentiment();


// GET /api/news/:keyword
router.get('/news/:keyword', async (req, res) => {
  const { keyword } = req.params;
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=${newsAPIKey}`);
    const articles = response.data.articles.map(article => {
      const analysis = sentiment.analyze(article.description || article.title || '');
      return {
        title: article.title,
        description: article.description,
        url: article.url,
        image: article.urlToImage,
        source: article.source.name,
        publishedAt: article.publishedAt,
        sentiment: analysis.score
      };
    })
    res.json({ articles });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// GET /api/reddit/:keyword
router.get('/reddit/:keyword', async (req, res) => {
  const { keyword } = req.params;
  try {
    const response = await axios.get(`https://www.reddit.com/search.json?q=${keyword}&limit=10`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
        }
      });
    const posts = response.data.data.children.map((post) => {
      const content = post.data.title + ' ' + (post.data.selftext || '');
      const analysis = sentiment.analyze(content);
      return {
        title: post.data.title,
        text: post.data.selftext,
        url: `https://reddit.com${post.data.permalink}`,
        subreddit: post.data.subreddit,
        upvotes: post.data.ups,
        author: post.data.author,
        sentiment: analysis.score
      };
    });
    res.json({ posts });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: `Failed to fetch reddit posts ${err.message}` });
  }
});

module.exports = router;
