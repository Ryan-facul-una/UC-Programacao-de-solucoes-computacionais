import { Calendar, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: 'banho' | 'tosa' | 'consulta' | 'vacina';
  image: string;
}

interface CatalogPageProps {
  onSchedule: (service: Service) => void;
}

const SERVICES: Service[] = [
  {
    id: 1,
    name: 'Banho Completo',
    description: 'Banho com shampoo premium, secagem e escovação',
    price: 50.0,
    duration: '1 hora',
    category: 'banho',
    image: 'https://images.unsplash.com/photo-1597595735781-6a57fb8e3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBiYXRofGVufDF8fHx8MTc2MjczNTI0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Tosa Higiênica',
    description: 'Tosa nas regiões sensíveis para maior conforto e higiene',
    price: 40.0,
    duration: '45 min',
    category: 'tosa',
    image: 'https://images.unsplash.com/photo-1648643118660-efb8eb0aea93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBncm9vbWluZyUyMHNhbG9ufGVufDF8fHx8MTc2MjY3NzI5MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Tosa Completa',
    description: 'Tosa estética completa personalizada para a raça',
    price: 80.0,
    duration: '2 horas',
    category: 'tosa',
    image: 'https://images.unsplash.com/photo-1648643118660-efb8eb0aea93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBncm9vbWluZyUyMHNhbG9ufGVufDF8fHx8MTc2MjY3NzI5MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 4,
    name: 'Consulta Veterinária',
    description: 'Consulta completa com veterinário especializado',
    price: 120.0,
    duration: '30 min',
    category: 'consulta',
    image: 'https://images.unsplash.com/photo-1644675272883-0c4d582528d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBjbGluaWN8ZW58MXx8fHwxNzYyNzAwMDExfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 5,
    name: 'Vacinação Múltipla',
    description: 'Aplicação de vacinas essenciais (V8, V10 ou antirrábica)',
    price: 80.0,
    duration: '15 min',
    category: 'vacina',
    image: 'https://images.unsplash.com/photo-1761203429504-56ece2d6eeb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjB2YWNjaW5hdGlvbnxlbnwxfHx8fDE3NjI3MzUyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 6,
    name: 'Banho e Tosa Completo',
    description: 'Pacote completo: banho premium + tosa personalizada',
    price: 110.0,
    duration: '2h 30min',
    category: 'banho',
    image: 'https://images.unsplash.com/photo-1597595735781-6a57fb8e3e3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBiYXRofGVufDF8fHx8MTc2MjczNTI0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

const categoryLabels = {
  banho: 'Banho',
  tosa: 'Tosa',
  consulta: 'Consulta',
  vacina: 'Vacinação',
};

const categoryColors = {
  banho: 'bg-blue-100 text-blue-800',
  tosa: 'bg-purple-100 text-purple-800',
  consulta: 'bg-green-100 text-green-800',
  vacina: 'bg-orange-100 text-orange-800',
};

export function CatalogPage({ onSchedule }: CatalogPageProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Catálogo de Serviços</h1>
          <p className="text-gray-600">
            Confira nossos serviços especializados para o seu pet
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <ImageWithFallback
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    categoryColors[service.category]
                  }`}
                >
                  {categoryLabels[service.category]}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4 text-[#00D9A3]" />
                    <span>Duração: {service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#00D9A3]">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-gray-900">
                      R$ {service.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  onClick={() => onSchedule(service)}
                  className="w-full bg-[#00D9A3] hover:bg-[#00C292] text-white"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-gray-900 mb-4">Informações Importantes</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-[#00D9A3]">•</span>
              <span>Todos os serviços requerem agendamento prévio</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00D9A3]">•</span>
              <span>O pet deve estar com a carteira de vacinação em dia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00D9A3]">•</span>
              <span>Cancelamentos devem ser feitos com 24h de antecedência</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00D9A3]">•</span>
              <span>Aceitamos diversas formas de pagamento</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
