import { useState, useEffect } from 'react';
import { StockList } from '@/components/StockList';
import { NewsPanel } from '@/components/NewsPanel';
import { STOCKS, fetchStockNews, fetchAllNews } from '@/services/stockService';
import { NewsArticle } from '@/types/stock';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [stockNews, setStockNews] = useState<NewsArticle[]>([]);
  const [allNews, setAllNews] = useState<NewsArticle[]>([]);
  const [loadingStock, setLoadingStock] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);
  const { toast } = useToast();

  // Load all news on component mount
  useEffect(() => {
    const loadAllNews = async () => {
      setLoadingAll(true);
      try {
        const news = await fetchAllNews();
        setAllNews(news);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load news. In a real app, this would fetch from Google News RSS.",
          variant: "destructive",
        });
      } finally {
        setLoadingAll(false);
      }
    };

    loadAllNews();
  }, [toast]);

  // Load stock-specific news when a stock is selected
  const handleStockSelect = async (symbol: string) => {
    setSelectedStock(symbol);
    setLoadingStock(true);
    
    try {
      const news = await fetchStockNews(symbol);
      setStockNews(news);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to load news for ${symbol}`,
        variant: "destructive",
      });
    } finally {
      setLoadingStock(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-panel-border bg-panel-dark">
        <div className="px-6 py-4">
          <h1 className="text-lg font-bold text-text-primary">Stock Market News</h1>
          <p className="text-sm text-text-secondary">
            Real-time news feed for your stock watchlist
          </p>
        </div>
      </header>

      {/* Three-panel layout */}
      <div className="flex h-[calc(100vh-81px)]">
        {/* Left Panel - Stock List */}
        <div className="w-80 border-r border-panel-border p-4">
          <StockList
            stocks={STOCKS}
            selectedStock={selectedStock}
            onStockSelect={handleStockSelect}
          />
        </div>

        {/* Middle Panel - Selected Stock News */}
        <div className="flex-1 p-4">
          <NewsPanel
            title={selectedStock ? `${selectedStock} News` : "Select a Stock"}
            articles={stockNews}
            isLoading={loadingStock}
            emptyMessage={selectedStock ? "No news found for this stock" : "Select a stock to view its latest news"}
          />
        </div>

        {/* Right Panel - All News */}
        <div className="w-80 border-l border-panel-border p-4">
          <NewsPanel
            title="All Market News"
            articles={allNews}
            isLoading={loadingAll}
            emptyMessage="No market news available"
          />
        </div>
      </div>

      {/* Footer note about limitations */}
      <div className="border-t border-panel-border bg-panel-dark">
        <div className="px-6 py-3">
          <p className="text-xs text-text-muted">
            💡 Note: This demo uses mock data. In a real implementation, the backend would fetch from Google News RSS feeds.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
