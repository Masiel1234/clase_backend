import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart: React.FC = () => {
  const data = {
    labels: ['Samsung', 'Apple', 'Xiaomi', 'Otras'],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: ['#0d6efd', '#6f42c1', '#dc3545', '#20c997'],
      },
    ],
  }

  return <Pie data={data} />
}

export default PieChart
