import { useEffect, useState } from 'react';
import InventoryModule from '../principal-Components/Modules/InventoryModule';
import MainHeader from '../principal-Components/MainHeader';
import StatsCards from './Components/Graphics/StatsCards';
import SidebarNav from '../principal-Components/SidebarNav';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { dashboardAPI } from '../apis/api';

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const App = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI.getResumenCompleto()
      .then(res => {
        setDashboardData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error cargando dashboard:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // Preparar datos del gráfico de marcas
  const chartData = dashboardData?.estadisticas_marcas?.labels?.map((label: string, index: number) => ({
    name: label || 'Sin marca',
    valor: dashboardData.estadisticas_marcas.datos[index]
  })) || [];

  return (
    <div className="container-fluid p-0 d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* SIDEBAR */}
      <nav className="d-none d-lg-flex flex-column p-3 text-white" style={{ width: '260px', backgroundColor: '#0f172a' }}>
        
        <SidebarNav />
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow-1">
        {/* HEADER */}
        <MainHeader />

        <div className="p-4">
          {/* TARJETAS (Stat Cards) */}
          <StatsCards counts={dashboardData?.counts || []} />
          <div className="row g-4">
            <div className="col-lg-8">
              <InventoryModule 
                celulares={dashboardData?.inventario_diario || []} 
                stockBajo={dashboardData?.stock_bajo || []} 
              />
            </div>
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="card border-0 shadow-sm rounded-4 p-3 w-100 h-100">
                <h5 className="fw-bold mb-4">Marcas</h5>
                {chartData.length > 0 ? (
                  <>
                    <PieChart width={250} height={250} className="mx-auto">
                      <Pie
                        data={chartData}
                        dataKey="valor"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                      >
                        {chartData.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                    <div className="mt-3 row g-2">
                      {chartData.map((item: any, i: number) => (
                        <div key={i} className="col-6 d-flex align-items-center gap-2 small">
                          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS[i % COLORS.length] }}></div>
                          {item.name} : {item.valor}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-muted text-center">No hay datos de marcas</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;