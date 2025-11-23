import { useState } from 'react';
import { Header } from './components/Header';
import { HomePage, Product } from './components/HomePage';
import { CartPage, CartItem } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { LoginPage } from './components/LoginPage';
import { CatalogPage, Service } from './components/CatalogPage';
import { toast } from 'sonner@2.0.3';

// Mock products data
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ração Premium para Cães',
    price: 89.90,
    category: 'caes',
    image: 'https://images.unsplash.com/photo-1684882726821-2999db517441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBmb2QlMjBiYWd8ZW58MXx8fHwxNzYyNjkzNzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Transportadora Pet',
    price: 149.90,
    category: 'caes',
    image: 'https://images.unsplash.com/photo-1608060375223-c5ab552bc9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBjYXJyaWVyfGVufDF8fHx8MTc2MjczNDkwNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Shampoo para Cães',
    price: 29.90,
    category: 'caes',
    image: 'https://images.unsplash.com/photo-1647002380358-fc70ed2f04e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBzaGFtcG9vfGVufDF8fHx8MTc2MjczNDkwNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Brinquedo Interativo',
    price: 39.90,
    category: 'caes',
    image: 'https://images.unsplash.com/photo-1587559070757-f72a388edbba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjB0b3l8ZW58MXx8fHwxNzYyNjg5NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Petiscos Naturais',
    price: 24.90,
    category: 'caes',
    image: 'https://images.unsplash.com/photo-1690876821657-1fe926211657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB0cmVhdHN8ZW58MXx8fHwxNzYyNzA4NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    name: 'Ração Premium para Gatos',
    price: 79.90,
    category: 'gatos',
    image: 'https://images.unsplash.com/photo-1616668983570-a971956d8928?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXQlMjBmb29kfGVufDF8fHx8MTc2MjcyNjY5NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 7,
    name: 'Arranhador para Gatos',
    price: 89.90,
    category: 'gatos',
    image: 'https://images.unsplash.com/photo-1587559070757-f72a388edbba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjB0b3l8ZW58MXx8fHwxNzYyNjg5NDM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 8,
    name: 'Caixa de Areia',
    price: 45.90,
    category: 'gatos',
    image: 'https://images.unsplash.com/photo-1608060375223-c5ab552bc9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBjYXJyaWVyfGVufDF8fHx8MTc2MjczNDkwNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 9,
    name: 'Ração para Aves',
    price: 34.90,
    category: 'aves',
    image: 'https://images.unsplash.com/photo-1690876821657-1fe926211657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB0cmVhdHN8ZW58MXx8fHwxNzYyNzA4NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 10,
    name: 'Gaiola Completa',
    price: 199.90,
    category: 'aves',
    image: 'https://images.unsplash.com/photo-1608060375223-c5ab552bc9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBjYXJyaWVyfGVufDF8fHx8MTc2MjczNDkwNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 11,
    name: 'Ração para Peixes',
    price: 19.90,
    category: 'peixes',
    image: 'https://images.unsplash.com/photo-1690876821657-1fe926211657?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB0cmVhdHN8ZW58MXx8fHwxNzYyNzA4NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 12,
    name: 'Aquário 50L',
    price: 299.90,
    category: 'peixes',
    image: 'https://images.unsplash.com/photo-1608060375223-c5ab552bc9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBjYXJyaWVyfGVufDF8fHx8MTc2MjczNDkwNnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'cart' | 'checkout' | 'catalog'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast.success('Login realizado com sucesso!');
  };

  const handleSchedule = (service: Service) => {
    toast.success(`Agendamento de ${service.name} solicitado! Em breve entraremos em contato.`);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemsCount={totalCartItems}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      {currentPage === 'home' && (
        <HomePage products={PRODUCTS} onAddToCart={handleAddToCart} />
      )}

      {currentPage === 'catalog' && (
        <CatalogPage onSchedule={handleSchedule} />
      )}

      {currentPage === 'cart' && (
        <CartPage
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage cartItems={cartItems} onNavigate={setCurrentPage} />
      )}
    </div>
  );
}
