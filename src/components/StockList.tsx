import { Stock } from '@/types/stock';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StockListProps {
  stocks: Stock[];
  selectedStock: string | null;
  onStockSelect: (symbol: string) => void;
}

export const StockList = ({ stocks, selectedStock, onStockSelect }: StockListProps) => {
  return (
    <Card className="h-full bg-panel-dark border-panel-border">
      <div className="p-4 border-b border-panel-border">
        <h2 className="text-sm font-semibold text-text-primary">Stock Watchlist</h2>
        <p className="text-xs text-text-muted">Click to view news</p>
      </div>
      
      <div className="p-2 space-y-1 overflow-y-auto h-[calc(100%-80px)]">
        {stocks.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => onStockSelect(stock.symbol)}
            className={cn(
              "p-3 rounded-md cursor-pointer transition-all duration-200 animate-slide-in",
              "hover:bg-accent border border-transparent",
              selectedStock === stock.symbol && "bg-accent border-primary/30",
              "group"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">
                  {stock.symbol}
                </div>
                <div className="text-xs text-text-muted truncate">
                  {stock.name}
                </div>
              </div>
              
              <div className="text-right ml-2">
                <div className="text-sm font-mono text-text-primary">
                  ₹{stock.price.toFixed(2)}
                </div>
                <div className={cn(
                  "text-xs font-mono px-2 py-0.5 rounded text-center",
                  stock.change >= 0 ? "price-gain" : "price-loss"
                )}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};