import InventoryModule from '../principal-Components/Modules/InventoryModule';
import MainHeader from '../principal-Components/MainHeader';
import StatsCards from './Components/Graphics/StatsCards';
import { LayoutDashboard } from 'lucide-react';
import SidebarNav from '../principal-Components/SidebarNav';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

// Datos de ejemplo
const DATA_CELULARES = [
  { id: 1, referencia: 'Galaxy A21', costo: 150.00, software: 'Android', display: 'OLED' },
  { id: 2, referencia: 'iPhone 11', costo: 200.00, software: 'iOS', display: 'LCD' },
  { id: 3, referencia: 'Redmi Note 10', costo: 120.00, software: 'Android', display: 'AMOLED' },
];

// Datos de stock bajo
const STOCK_BAJO = [
  { id: 1, referencia: 'Galaxy A21', stock: 2 },
  { id: 2, referencia: 'iPhone 11', stock: 1 },
  { id: 3, referencia: 'Redmi Note 10', stock: 3 },
];

const CHART_DATA = [
  { name: 'Samsung', valor: 40 }, { name: 'Apple', valor: 25 },
  { name: 'Xiaomi', valor: 20 }, { name: 'Otros', valor: 15 },
];

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];

const App = () => {
  return (
    <div className="container-fluid p-0 d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      
      {/* SIDEBAR */}
      <nav className="d-none d-lg-flex flex-column p-3 text-white" style={{ width: '260px', backgroundColor: '#0f172a' }}>
        <div className="d-flex align-items-center gap-2 mb-4 p-2">
          <div className="bg-primary p-2 rounded">
            <LayoutDashboard size={20} color="white" />
          </div>
          <span className="fs-4 fw-bold">Inventario</span>
        </div>
        <SidebarNav />
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow-1">
        {/* HEADER */}
        <MainHeader />

        <div className="p-4">
          {/* TARJETAS (Stat Cards) */}
          <StatsCards />
          <div className="row g-4">
            <div className="col-lg-8">
              <InventoryModule celulares={DATA_CELULARES} stockBajo={STOCK_BAJO} />
            </div>
            <div className="col-lg-4 d-flex align-items-stretch">
              <div className="card border-0 shadow-sm rounded-4 p-3 w-100 h-100">
                <h5 className="fw-bold mb-4">Marcas</h5>
                <PieChart width={250} height={250} className="mx-auto">
                  <Pie
                    data={CHART_DATA}
                    dataKey="valor"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {CHART_DATA.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <div className="mt-3 row g-2">
                  {CHART_DATA.map((item, i) => (
                    <div key={i} className="col-6 d-flex align-items-center gap-2 small">
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: COLORS[i] }}></div>
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;