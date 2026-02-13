import React from 'react';
import ProveedorTable from './ProveedorTable';
import MainHeader from '../principal-Components/MainHeader';
import SidebarNav from '../principal-Components/SidebarNav';

const Proveedor: React.FC = () => {
  return (
    <div className="container-fluid p-0 d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* SIDEBAR */}
      <nav className="d-none d-lg-flex flex-column p-3 text-white" style={{ width: '260px', backgroundColor: '#0f172a' }}>
        <SidebarNav />
      </nav>
      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow-1">
        <MainHeader />
        <div className="p-4" style={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto' }}>
          <ProveedorTable />
        </div>
      </main>
    </div>
  );
};

export default Proveedor;
