import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface HomePageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function HomePage({ products, onAddToCart }: HomePageProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = [
    { id: 'caes', label: 'Cães' },
    { id: 'gatos', label: 'Gatos' },
    { id: 'aves', label: 'Aves' },
    { id: 'peixes', label: 'Peixes' },
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-gray-900 mb-4">Produtos</h2>

              {/* Categories */}
              <div className="space-y-3 mb-6">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center gap-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => toggleCategory(category.id)}
                      className="border-gray-300 data-[state=checked]:bg-[#00D9A3] data-[state=checked]:border-[#00D9A3]"
                    />
                    <label
                      htmlFor={category.id}
                      className="text-gray-700 cursor-pointer select-none"
                    >
                      {category.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Price Range */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-gray-900 mb-4">Faixa de preço</h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={100}
                    step={5}
                    className="[&_[role=slider]]:bg-[#00D9A3] [&_[role=slider]]:border-[#00D9A3]"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>R$ {priceRange[0]}</span>
                    <span>R$ {priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-[#00D9A3] mb-4">
                      R$ {product.price.toFixed(2)}
                    </p>
                    <Button
                      onClick={() => onAddToCart(product)}
                      className="w-full bg-[#00D9A3] hover:bg-[#00C292] text-white"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Nenhum produto encontrado com os filtros selecionados.
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
