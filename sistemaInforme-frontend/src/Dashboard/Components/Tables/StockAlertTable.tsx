import React from 'react';
import { Download } from 'lucide-react';

interface StockAlertTableProps {
  data: Array<{ id: number; referencia: string; stock: number; }>
}

const StockAlertTable: React.FC<StockAlertTableProps> = ({ data }) => (
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
          {data.map(item => (
            <tr key={item.id}>
              <td className="px-4 fw-bold">{item.referencia}</td>
              <td className="text-danger fw-bold">{item.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default StockAlertTable;
