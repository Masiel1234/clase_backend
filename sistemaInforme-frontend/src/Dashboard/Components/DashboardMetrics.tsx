import React, { useEffect, useState } from 'react';
import MetricCard from '../../principal-Components/MetricCard';
import axios from 'axios';

interface Metric {
  nombre: string;
  cantidad: number;
  criticos?: number;
  pendientes?: number;
}

const DashboardMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/dashboard/resumen')
      .then(res => {
        setMetrics(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar el resumen');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando métricas...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="row g-3">
      {metrics.map((m, i) => (
        <MetricCard
          key={i}
          title={m.nombre}
          value={m.cantidad}
          color="bg-primary"
          icon="bi-bar-chart"
        />
      ))}
    </div>
  );
};

export default DashboardMetrics;
