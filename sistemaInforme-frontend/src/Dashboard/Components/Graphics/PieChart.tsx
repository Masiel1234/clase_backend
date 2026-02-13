import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/dashboard/bat-original/por-calidad')
      .then(res => {
        setData({
          labels: res.data.labels,
          datasets: [
            {
              data: res.data.datos,
              backgroundColor: [
                '#0d6efd', '#6f42c1', '#dc3545', '#20c997', '#fd7e14', '#ffc107', '#198754', '#6610f2'
              ],
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

  return <Pie data={data} />;
};

export default PieChart;
