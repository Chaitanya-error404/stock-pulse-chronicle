import { Stock, NewsArticle } from '@/types/stock';

// Mock stock data based on the reference image
let STOCKS: Stock[] = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 1395.00, change: 11.70, changePercent: 0.85 },
  { symbol: 'VIKASLIFE', name: 'Vikas Lifecare', price: 2.23, change: -0.02, changePercent: -0.89 },
  { symbol: 'WELSPUNLIV', name: 'Welspun Living', price: 121.07, change: -1.93, changePercent: -1.57 },
  { symbol: 'EMUDHRA', name: 'eMudhra Limited', price: 695.05, change: 21.85, changePercent: 3.25 },
  { symbol: 'MEDIAONE', name: 'Media One Global', price: 17.56, change: -0.28, changePercent: -1.57 },
  { symbol: 'ESTER', name: 'Ester Industries', price: 116.59, change: 0.96, changePercent: 0.83 },
  { symbol: 'SUMICHEM', name: 'Sumitomo Chemical', price: 554.70, change: -15.15, changePercent: -2.66 },
  { symbol: 'RELINFRA', name: 'Reliance Infrastructure', price: 248.85, change: -9.35, changePercent: -3.62 },
  { symbol: 'IDEA', name: 'Vodafone Idea', price: 7.66, change: 0.25, changePercent: 3.37 },
];

// Get current stocks
export const getStocks = (): Stock[] => [...STOCKS];

// Add new stock
export const addStock = (stock: Omit<Stock, 'price' | 'change' | 'changePercent'>): Stock => {
  const newStock: Stock = {
    ...stock,
    price: Math.random() * 1000 + 50, // Random price between 50-1050
    change: (Math.random() - 0.5) * 20, // Random change between -10 to +10
    changePercent: (Math.random() - 0.5) * 6, // Random percentage between -3% to +3%
  };
  
  STOCKS.push(newStock);
  return newStock;
};

// Remove stock
export const removeStock = (symbol: string): boolean => {
  const initialLength = STOCKS.length;
  STOCKS = STOCKS.filter(stock => stock.symbol !== symbol);
  return STOCKS.length < initialLength;
};

// Simulate real-time price updates
export const updateStockPrices = (): Stock[] => {
  STOCKS = STOCKS.map(stock => {
    const priceChange = (Math.random() - 0.5) * 2; // Random change between -1 to +1
    const newPrice = Math.max(0.01, stock.price + priceChange);
    const change = newPrice - stock.price + stock.change;
    const changePercent = (change / (newPrice - change)) * 100;
    
    return {
      ...stock,
      price: Number(newPrice.toFixed(2)),
      change: Number(change.toFixed(2)),
      changePercent: Number(changePercent.toFixed(2))
    };
  });
  
  return [...STOCKS];
};

// Mock news data generator
const generateMockNews = (stock: string, count: number = 5): NewsArticle[] => {
  const headlines = [
    `${stock} reports strong quarterly earnings`,
    `${stock} announces new strategic partnership`,
    `${stock} stock price target revised by analysts`,
    `${stock} declares dividend for shareholders`,
    `${stock} expands operations in new markets`,
    `${stock} board approves major acquisition`,
    `${stock} launches innovative product line`,
    `${stock} receives regulatory approval`,
    `${stock} signs multi-billion dollar contract`,
    `${stock} announces management changes`,
  ];

  const sources = ['Economic Times', 'Business Standard', 'Moneycontrol', 'Reuters', 'Bloomberg'];
  
  return Array.from({ length: count }, (_, i) => ({
    id: `${stock}-${i}-${Date.now()}`,
    title: headlines[Math.floor(Math.random() * headlines.length)],
    link: `https://example.com/news/${stock.toLowerCase()}-${i}`,
    pubDate: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(), // Random date within last week
    source: sources[Math.floor(Math.random() * sources.length)],
    stock: stock,
    description: `Latest developments and analysis regarding ${stock} stock performance and business operations.`
  }));
};

export const fetchStockNews = async (stock: string): Promise<NewsArticle[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));
  
  return generateMockNews(stock, 8);
};

export const fetchAllNews = async (): Promise<NewsArticle[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  const allNews: NewsArticle[] = [];
  
  // Generate news for each stock
  STOCKS.forEach(stock => {
    const news = generateMockNews(stock.symbol, 3);
    allNews.push(...news);
  });
  
  // Sort by date (newest first)
  return allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
};

// Fetch only new news articles (simulates checking for updates)
export const fetchNewNews = async (existingNewsIds: string[]): Promise<NewsArticle[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
  
  // 30% chance of having new news
  if (Math.random() > 0.7) {
    const randomStock = STOCKS[Math.floor(Math.random() * STOCKS.length)];
    const newArticles = generateMockNews(randomStock.symbol, 1).filter(
      article => !existingNewsIds.includes(article.id)
    );
    return newArticles;
  }
  
  return [];
};