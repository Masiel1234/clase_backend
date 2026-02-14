import { LayoutDashboard, Package, Layers, Tag, Users, ChevronDown, ChevronRight } from 'lucide-react';
import NavItem from './NavItem';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determinar rutas activas
  const path = location.pathname;
  const isDashboard = path === '/dashboard';
  const isInventario = path.startsWith('/inventario');
  const isMarca = path.startsWith('/marca');
  const isProveedor = path.startsWith('/proveedor');

  return (
    <div className="nav flex-column gap-2">
      <div className="d-flex align-items-center gap-2 mb-4 p-2">
        <div className="bg-primary p-2 rounded">
          <LayoutDashboard size={20} color="white" />
        </div>
        <span className="fs-4 fw-bold">Mundo Accesorio</span>
      </div>
      <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" onClick={() => navigate('/dashboard')} active={isDashboard} />
      <div>
        <a href="#" className={`nav-link d-flex align-items-center justify-content-between p-3 rounded-3 ${isInventario ? 'bg-primary text-white shadow' : 'text-secondary'}`} onClick={() => setOpen(!open)} style={{ textDecoration: 'none' }}>
          <div className="d-flex align-items-center gap-3 fw-bold small">
            <Package size={18}/> Inventario
          </div>
          {open ? <ChevronDown size={14}/> : <ChevronRight size={14}/>} 
        </a>
        {(open || isInventario) && (
          <div className="ms-4 nav flex-column gap-1">
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Bat Generica" onClick={() => navigate('/inventario/bat-generica')} active={path === '/inventario/bat-generica'} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Bat Original" onClick={() => navigate('/inventario/bat-original')} active={path === '/inventario/bat-original'} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Cel" onClick={() => navigate('/inventario/cel')} active={path === '/inventario/cel'} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Display" onClick={() => navigate('/inventario/display')} active={path === '/inventario/display'} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Tactil" onClick={() => navigate('/inventario/tactil')} active={path === '/inventario/tactil'} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Tapa Back" onClick={() => navigate('/inventario/tapa-back')} active={path === '/inventario/tapa-back'} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Visores" onClick={() => navigate('/inventario/visores')} active={path === '/inventario/visores'} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Rptos Peq" onClick={() => navigate('/inventario/rptos-peq')} active={path === '/inventario/rptos-peq'} />
          </div>
        )}
      </div>
      <NavItem icon={<Tag size={18}/>} label="Marca" onClick={() => navigate('/marca')} active={isMarca} />
      <NavItem icon={<Users size={18}/>} label="Proveedor" onClick={() => navigate('/proveedor')} active={isProveedor} />
    </div>
  );
};<div className="d-flex align-items-center gap-2 mb-4 p-2">
          <div className="bg-primary p-2 rounded">
            <LayoutDashboard size={20} color="white" />
          </div>
          <span className="fs-4 fw-bold">Nombre empresa</span>
        </div>

export default SidebarNav;
