import { NewsArticle } from '@/types/stock';
import { Card } from '@/components/ui/card';
import { ExternalLink, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsPanelProps {
  title: string;
  articles: NewsArticle[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export const NewsPanel = ({ 
  title, 
  articles, 
  isLoading = false, 
  emptyMessage = "No news available" 
}: NewsPanelProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="h-full bg-panel-dark border-panel-border flex flex-col">
      <div className="p-4 border-b border-panel-border">
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
        <p className="text-xs text-text-muted">
          {articles.length} article{articles.length !== 1 ? 's' : ''}
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-accent rounded mb-2"></div>
                <div className="h-3 bg-accent/50 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-accent/30 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-text-muted">{emptyMessage}</p>
          </div>
        ) : (
          <div className="p-2 space-y-2">
            {articles.map((article) => (
              <div
                key={article.id}
                className={cn(
                  "p-3 rounded-md border border-transparent transition-all duration-200",
                  "hover:bg-accent hover:border-panel-border animate-slide-in",
                  "group cursor-pointer"
                )}
                onClick={() => window.open(article.link, '_blank')}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-text-primary mb-1 line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    
                    {article.description && (
                      <p className="text-xs text-text-muted mb-2 line-clamp-2">
                        {article.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-text-muted">
                      <span className="font-medium">{article.source}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(article.pubDate)}
                      </div>
                      {article.stock && (
                        <>
                          <span>•</span>
                          <span className="text-primary font-mono font-medium">
                            {article.stock}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <ExternalLink className="h-4 w-4 text-text-muted group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};