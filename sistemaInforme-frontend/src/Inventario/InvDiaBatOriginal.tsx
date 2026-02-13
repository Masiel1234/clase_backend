import React from 'react';
import InvDiaBatOriginalTable from './InvDiaBatOriginalTable';
import MainHeader from '../principal-Components/MainHeader';
import SidebarNav from '../principal-Components/SidebarNav';
import { LayoutDashboard } from 'lucide-react';

const InvDiaBatOriginal: React.FC = () => {
  return (
    <div className="container-fluid p-0 d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* SIDEBAR */}
      <nav className="d-none d-lg-flex flex-column p-3 text-white" style={{ width: '260px', backgroundColor: '#0f172a' }}>
        <div className="d-flex align-items-center gap-2 mb-4 p-2">
          <div className="bg-primary p-2 rounded">
            <LayoutDashboard size={20} color="white" />
          </div>
          <span className="fs-4 fw-bold">Nombre empresa</span>
        </div>
        <SidebarNav />
      </nav>
      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow-1">
        <MainHeader />
        <div className="p-4">
          <InvDiaBatOriginalTable />
        </div>
      </main>
    </div>
  );
};

export default InvDiaBatOriginal;
