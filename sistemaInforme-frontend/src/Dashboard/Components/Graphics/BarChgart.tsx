import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/dashboard/bat-original/por-marca')
      .then(res => {
        setData({
          labels: res.data.labels,
          datasets: [
            {
              label: 'Stock por Marca',
              data: res.data.datos,
              backgroundColor: '#0d6efd',
            },
          ],
        });
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo cargar la gráfica');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando gráfica...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return null;

  return <Bar data={data} />;
};

export default BarChart;
