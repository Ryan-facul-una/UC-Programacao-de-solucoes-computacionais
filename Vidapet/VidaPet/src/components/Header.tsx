import { ShoppingCart, Search, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeaderProps {
  cartItemsCount: number;
  onNavigate: (page: 'home' | 'cart' | 'checkout' | 'catalog') => void;
  currentPage?: string;
}

export function Header({ cartItemsCount, onNavigate, currentPage }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <h1 className="text-[#00D9A3] tracking-tight" style={{ fontSize: '32px', fontWeight: 700 }}>
              VIDAPET
            </h1>
          </button>

          {/* Navigation */}
          <nav className="flex gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`text-gray-700 hover:text-[#00D9A3] transition-colors ${
                currentPage === 'home' ? 'text-[#00D9A3]' : ''
              }`}
            >
              Produtos
            </button>
            <button
              onClick={() => onNavigate('catalog')}
              className={`text-gray-700 hover:text-[#00D9A3] transition-colors ${
                currentPage === 'catalog' ? 'text-[#00D9A3]' : ''
              }`}
            >
              Serviços
            </button>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar..."
              className="pl-10 bg-gray-50 border-gray-200"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#00D9A3] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
