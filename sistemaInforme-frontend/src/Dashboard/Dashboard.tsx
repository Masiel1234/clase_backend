import React from 'react';
import Sidebar from '../principal-Components/Sidebars'
import Navbar from '../principal-Components/Navbar'
import MetricCard from '../principal-Components/MetricCard'
import DashboardMetrics from './Components/DashboardMetrics';
import BarChart from './Components/Graphics/BarChgart'
import PieChart from './Components/Graphics/PieChart'

const Dashboard: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        <div className="col-md-10 p-4 bg-light min-vh-100">
          <Navbar />

          <DashboardMetrics />

          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card p-3">
                <h5>Entradas vs Salidas</h5>
                <BarChart />
              </div>
            </div>

            <div className="col-md-6">
              <div className="card p-3">
                <h5>Inventario por Marcas</h5>
                <PieChart />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Dashboard
