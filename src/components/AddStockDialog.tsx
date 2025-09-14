import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface AddStockDialogProps {
  onAddStock: (stock: { symbol: string; name: string }) => void;
}

export const AddStockDialog = ({ onAddStock }: AddStockDialogProps) => {
  const [open, setOpen] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symbol.trim() && name.trim()) {
      onAddStock({
        symbol: symbol.trim().toUpperCase(),
        name: name.trim()
      });
      setSymbol('');
      setName('');
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-text-muted hover:text-text-primary hover:bg-accent"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Stock
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Stock to Watchlist</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symbol">Stock Symbol</Label>
            <Input
              id="symbol"
              placeholder="e.g., AAPL"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              className="uppercase"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              placeholder="e.g., Apple Inc."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!symbol.trim() || !name.trim()}>
              Add Stock
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};