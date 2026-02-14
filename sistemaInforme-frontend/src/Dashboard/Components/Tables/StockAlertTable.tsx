import React from 'react';
import { Download } from 'lucide-react';

interface StockBajo {
  tipo: string;
  referencia: string;
  stock: number;
  marca_id?: number;
}

interface StockAlertTableProps {
  data: StockBajo[];
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
            <th className="px-4">Tipo</th>
            <th>Referencia</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td className="px-4">
                  <span className="badge bg-warning-subtle text-warning">{item.tipo}</span>
                </td>
                <td className="fw-bold">{item.referencia}</td>
                <td className="text-danger fw-bold">{item.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center text-muted py-4">
                No hay productos con stock bajo
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default StockAlertTable;
