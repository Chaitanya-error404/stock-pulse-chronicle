export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  stock?: string;
  description?: string;
}

export interface StockNews {
  stock: string;
  articles: NewsArticle[];
}