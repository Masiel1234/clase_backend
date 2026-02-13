import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface BrandPieChartProps {
  data: Array<{ name: string; valor: number; }>
  colors: string[];
}

const BrandPieChart: React.FC<BrandPieChartProps> = ({ data, colors }) => (
  <div className="card border-0 shadow-sm rounded-4 p-3">
    <h5 className="fw-bold mb-4">Marcas</h5>
    <div style={{ height: '250px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="valor">
            {data.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className="mt-3 row g-2">
      {data.map((item, i) => (
        <div key={i} className="col-6 d-flex align-items-center gap-2 small">
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: colors[i] }}></div>
          {item.name}
        </div>
      ))}
    </div>
  </div>
);

export default BrandPieChart;
