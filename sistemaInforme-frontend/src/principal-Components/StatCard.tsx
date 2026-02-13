import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, icon }) => (
  <div className="col">
    <div className="card border-0 shadow-sm rounded-4 p-3 h-100 position-relative overflow-hidden" 
         style={{ borderLeft: `5px solid ${color}` }}>
      <div className="d-flex justify-content-between mb-2">
        <div className="p-2 rounded-3" style={{ backgroundColor: `${color}20`, color: color }}>
          {icon}
        </div>
      </div>
      <h3 className="fw-black mb-0">{value}</h3>
      <span className="text-muted small fw-bold text-uppercase tracking-wider">{title}</span>
    </div>
  </div>
);

export default StatCard;
