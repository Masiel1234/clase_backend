import React from 'react';
import { ChevronRight } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void | Promise<void>;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => (
  <a
    href="#"
    className={`nav-link d-flex align-items-center justify-content-between p-3 rounded-3 transition-all ${active ? 'bg-primary text-white shadow' : 'text-secondary'}`}
    style={{ textDecoration: 'none' }}
    onClick={onClick}
  >
    <div className="d-flex align-items-center gap-3 fw-bold small">
      {icon} {label}
    </div>
    <ChevronRight size={14} className={active ? 'd-block' : 'd-none'} />
  </a>
);

export default NavItem;
