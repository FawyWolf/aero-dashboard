import express from 'express';
import Parser from 'rss-parser';

const router = express.Router();
const parser = new Parser();

const NEWS_SOURCES = {
  spb: [
    'https://www.fontanka.ru/rss/',
    'https://lebed.online/feed/'
  ],
  msk: [
    'https://lenta.ru/rss'
  ]
};

router.get('/', async (req, res) => {
  try {
    const city = req.query.city?.toLowerCase() || 'spb';
    const limit = parseInt(req.query.limit) || 12;
    const sources = NEWS_SOURCES[city] || NEWS_SOURCES['spb'];

    const allNews = [];

    for (const feedUrl of sources) {
      try {
        const feed = await parser.parseURL(feedUrl);
        feed.items.slice(0, 5).forEach(item => {
          allNews.push({
            title: item.title,
            link: item.link,
            description: item.contentSnippet || '',
            pubDate: item.pubDate,
            source: feed.title || 'Unknown'
          });
        });
      } catch (err) {
        console.warn(`Failed to parse ${feedUrl}`);
      }
    }

    const sortedNews = allNews
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, limit);

    res.json({
      city: city.toUpperCase(),
      total: sortedNews.length,
      news: sortedNews,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch news',
      message: error.message
    });
  }
});

export default router;