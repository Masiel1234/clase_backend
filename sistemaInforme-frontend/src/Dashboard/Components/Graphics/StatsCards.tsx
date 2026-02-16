import { Smartphone, Monitor, Battery, Settings, Package } from 'lucide-react';
import StatCard from '../../../principal-Components/StatCard';

interface StatsCardsProps {
  counts: Array<{
    nombre: string;
    cantidad: number;
    pendientes?: number;
    criticos?: number;
  }>;
}

const iconMap: { [key: string]: React.ReactNode } = {
  'Celulares': <Smartphone />,
  'Visores': <Monitor />,
  'Displays': <Monitor />,
  'Baterías Genéricas': <Battery />,
  'Baterías Originales': <Battery />,
  'Táctiles': <Package />,
  'Tapas Back': <Package />,
  'Repuestos Pequeños': <Settings />,
};

const colorMap: { [key: string]: string } = {
  'Celulares': '#10b981',
  'Visores': '#6366f1',
  'Displays': '#f59e0b',
  'Baterías Genéricas': '#3b82f6',
  'Baterías Originales': '#8b5cf6',
  'Táctiles': '#ec4899',
  'Tapas Back': '#f43f5e',
  'Repuestos Pequeños': '#a855f7',
};

const StatsCards: React.FC<StatsCardsProps> = ({ counts }) => {
  // Mostrar solo las primeras 5 tarjetas principales
  const mainCards = counts.slice(0, 5);

  return (
    <div className="row g-3 mb-4">
      {mainCards.map((item, index) => (
        <StatCard 
          key={index}
          title={item.nombre}
          value={item.cantidad.toString()}
          color={colorMap[item.nombre] || '#64748b'}
          icon={iconMap[item.nombre] || <Package />}
        />
      ))}
    </div>
  );
};

export default StatsCards;
