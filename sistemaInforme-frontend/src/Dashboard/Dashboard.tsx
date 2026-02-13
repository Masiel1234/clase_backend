import React from 'react';
import { 
  LayoutDashboard, Smartphone, Monitor, Battery, Settings, 
  Search, Plus, MoreVertical, Bell, MessageSquare, 
  ChevronRight, Download 
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import NavItem from '../principal-Components/NavItem';
import StatCard from '../principal-Components/StatCard';
import SidebarNav from '../principal-Components/SidebarNav';

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
        <header className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center sticky-top">
          <div className="d-flex align-items-center gap-3">
            <Bell className="text-secondary" size={20} />
            <div className="vr mx-2"></div>
            <div className="text-end">
              <div className="fw-bold small">Admin Usuario</div>
              <div className="text-muted" style={{ fontSize: '10px' }}>Super Admin</div>
            </div>
            <img src="https://ui-avatars.com/api/?name=Admin" className="rounded-circle border" width="40" alt="user" />
          </div>
        </header>

        <div className="p-4">
          {/* TARJETAS (Stat Cards) */}
          <div className="row g-3 mb-4">
            <StatCard title="Celulares" value="75" color="#10b981" icon={<Smartphone/>} />
            <StatCard title="Visores" value="40" color="#6366f1" icon={<Monitor/>} />
            <StatCard title="Displays" value="85" color="#f59e0b" icon={<Monitor/>} />
            <StatCard title="Baterías" value="120" color="#3b82f6" icon={<Battery/>} />
            <StatCard title="Varios" value="95" color="#f43f5e" icon={<Settings/>} />
          </div>

          <div className="row g-4">
            {/* TABLA */}
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
                  <h5 className="mb-0 fw-bold">Inventario Diario</h5>
                  <button className="btn btn-primary btn-sm rounded-3 px-3">
                    <Plus size={16} className="me-1"/> Nuevo
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr className="small text-uppercase text-muted">
                        <th className="px-4">Referencia</th>
                        <th>Costo</th>
                        <th>Software</th>
                  
                      </tr>
                    </thead>
                    <tbody>
                      {DATA_CELULARES.map(c => (
                        <tr key={c.id}>
                          <td className="px-4 fw-bold">{c.referencia}</td>
                          <td className="text-secondary">${c.costo}</td>
                          <td><span className="badge bg-primary-subtle text-primary rounded-pill">{c.software}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
                {/* Tabla de avisos de stock bajo */}
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mt-4">
                  <div className="card-header bg-danger-subtle p-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold text-danger">Avisos de Stock Bajo</h5>
                    <button className="btn btn-danger btn-sm rounded-3 px-3">
                      <Download size={16} className="me-1"/> Exportar a pdf 
                    </button>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-danger">
                        <tr className="small text-uppercase text-danger">
                          <th className="px-4">Referencia</th>
                          <th>Stock</th>
                          <th className="text-center">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {STOCK_BAJO.map(item => (
                          <tr key={item.id}>
                            <td className="px-4 fw-bold">{item.referencia}</td>
                            <td className="text-danger fw-bold">{item.stock}</td>
                            <td className="text-center">
                              <button className="btn btn-warning btn-sm rounded-pill">Avisar</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            </div>

            {/* GRÁFICO */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 p-3">
                <h5 className="fw-bold mb-4">Marcas</h5>
                <div style={{ height: '250px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={CHART_DATA} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="valor">
                        {CHART_DATA.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
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

// Componentes internos útiles


export default App;