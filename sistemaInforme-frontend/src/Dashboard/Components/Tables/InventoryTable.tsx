import React from 'react';
import { Plus, MoreVertical } from 'lucide-react';

interface InventoryTableProps {
  data: Array<{ id: number; referencia: string; costo: number; software: string; display: string; }>
}

const InventoryTable: React.FC<InventoryTableProps> = ({ data }) => (
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
          {data.map(c => (
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
);

export default InventoryTable;
