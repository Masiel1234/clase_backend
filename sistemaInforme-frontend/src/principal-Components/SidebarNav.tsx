import { LayoutDashboard, Package, Layers, Tag, Users, ChevronDown, ChevronRight } from 'lucide-react';
import NavItem from './NavItem';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarNav = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="nav flex-column gap-2">
      <div className="d-flex align-items-center gap-2 mb-4 p-2">
        <div className="bg-primary p-2 rounded">
          <LayoutDashboard size={20} color="white" />
        </div>
        <span className="fs-4 fw-bold">Nombre empresa</span>
      </div>
      <NavItem icon={<LayoutDashboard size={18}/>} label="Dashboard" onClick={() => navigate('/dashboard')} active />
      <div>
        <a href="#" className="nav-link d-flex align-items-center justify-content-between p-3 rounded-3 text-secondary" onClick={() => setOpen(!open)} style={{ textDecoration: 'none' }}>
          <div className="d-flex align-items-center gap-3 fw-bold small">
            <Package size={18}/> Inventario
          </div>
          {open ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
        </a>
        {open && (
          <div className="ms-4 nav flex-column gap-1">
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Bat Generica" onClick={() => navigate('/inventario/bat-generica')} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Bat Original" onClick={() => navigate('/inventario/bat-original')} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Cel" onClick={() => navigate('/inventario/cel')} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Display" onClick={() => navigate('/inventario/display')} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Tactil" onClick={() => navigate('/inventario/tactil')} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Tapa Back" onClick={() => navigate('/inventario/tapa-back')} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Visores" onClick={() => navigate('/inventario/visores')} />
            <NavItem icon={<Layers size={16}/>} label="Inv Dia Rptos Peq" onClick={() => navigate('/inventario/rptos-peq')} />
          </div>
        )}
      </div>
      <NavItem icon={<Tag size={18}/>} label="Marca" onClick={() => navigate('/marca')} />
      <NavItem icon={<Users size={18}/>} label="Proveedor" onClick={() => navigate('/proveedor')} />
    </div>
  );
};<div className="d-flex align-items-center gap-2 mb-4 p-2">
          <div className="bg-primary p-2 rounded">
            <LayoutDashboard size={20} color="white" />
          </div>
          <span className="fs-4 fw-bold">Nombre empresa</span>
        </div>

export default SidebarNav;
