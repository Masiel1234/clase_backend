import React from 'react';
import { Smartphone, Monitor, Battery, Settings } from 'lucide-react';
import NavItem from './NavItem';

const SidebarNav = () => (
  <div className="nav flex-column gap-2">
    <NavItem icon={<Smartphone size={18}/>} label="Celulares" active />
    <NavItem icon={<Monitor size={18}/>} label="Visores" />
    <NavItem icon={<Battery size={18}/>} label="Baterías" />
    <NavItem icon={<Settings size={18}/>} label="Configuración" />
  </div>
);

export default SidebarNav;
