import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart: React.FC = () => {
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo'],
    datasets: [
      {
        label: 'Entradas',
        data: [40, 75, 35],
        backgroundColor: '#0d6efd',
      },
      {
        label: 'Salidas',
        data: [20, 50, 80],
        backgroundColor: '#fd7e14',
      },
    ],
  }

  return <Bar data={data} />
}

export default BarChart
