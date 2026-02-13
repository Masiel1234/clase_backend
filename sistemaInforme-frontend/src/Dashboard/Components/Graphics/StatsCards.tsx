import { Smartphone, Monitor, Battery, Settings } from 'lucide-react';
import StatCard from '../../../principal-Components/StatCard';

const StatsCards = () => (
  <div className="row g-3 mb-4">
    <StatCard title="Celulares" value="75" color="#10b981" icon={<Smartphone/>} />
    <StatCard title="Visores" value="40" color="#6366f1" icon={<Monitor/>} />
    <StatCard title="Displays" value="85" color="#f59e0b" icon={<Monitor/>} />
    <StatCard title="Baterías" value="120" color="#3b82f6" icon={<Battery/>} />
    <StatCard title="Varios" value="95" color="#f43f5e" icon={<Settings/>} />
  </div>
);

export default StatsCards;
