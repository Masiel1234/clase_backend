import React, { useEffect, useState } from 'react';
import { visoresAPI, proveedorAPI } from '../../apis/api';

interface Proveedor {
  id: number;
  nombre: string;
}

interface InvDiaVisores {
  id: number;
  nombre: string;
  sin_oca: boolean;
  color: string;
  fecha: string;
  codigo: string;
  proveedor_id: number;
  inventario_inicial: number;
  comp: number;
  t_ext: number;
  vta: number;
  ser_t: number;
  dev: number;
  t_inv_final: number;
  cost: number;
  vxm: number;
  rebaja: number;
  pedir: boolean;
  celular: string;
  nota: string;
  stock_minimo: number;
}

const emptyForm: Omit<InvDiaVisores, 'id'> = {
  nombre: '',
  sin_oca: false,
  color: '',
  fecha: '',
  codigo: '',
  proveedor_id: 0,
  inventario_inicial: 0,
  comp: 0,
  t_ext: 0,
  vta: 0,
  ser_t: 0,
  dev: 0,
  t_inv_final: 0,
  cost: 0,
  vxm: 0,
  rebaja: 0,
  pedir: false,
  celular: '',
  nota: '',
  stock_minimo: 5,
};

const InvDiaVisoresTable: React.FC = () => {
  const [data, setData] = useState<InvDiaVisores[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number|null>(null);
  useEffect(() => {
    proveedorAPI.getAll()
      .then(res => Array.isArray(res.data) ? setProveedores(res.data) : setProveedores([]))
      .catch(() => setProveedores([]));
  }, []);

  useEffect(() => {
    visoresAPI.getAll()
      .then(res => Array.isArray(res.data) ? setData(res.data) : setData([]))
      .catch(() => setData([]));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await visoresAPI.update(editId, form);
    } else {
      await visoresAPI.create(form);
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    visoresAPI.getAll().then(res => Array.isArray(res.data) ? setData(res.data) : setData([]));
  };

  const handleEdit = (item: InvDiaVisores) => {
    setForm({ ...item });
    setEditId(item.id);
    setShowModal(true);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Inventario Visores</h5>
        <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); }}>Nuevo</button>
      </div>
      <div className="table-responsive" style={{overflowX: 'auto'}}>
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="small text-uppercase text-muted">
              <th className="px-4">Nombre</th>
              <th>Sin OCA</th>
              <th>Color</th>
              <th>Fecha</th>
              <th>Código</th>
              <th>Proveedor</th>
              <th>Inventario Inicial</th>
              <th>Compra</th>
              <th>Transferencia Ext.</th>
              <th>Venta</th>
              <th>Servicio Técnico</th>
              <th>Devolución</th>
              <th>Inventario Final</th>
              <th>Costo</th>
              <th>VXM</th>
              <th>Rebaja</th>
              <th>Pedir</th>
              <th>Celular</th>
              <th>Nota</th>
              <th>Stock Mínimo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(data) ? data : []).map(item => (
              <tr key={item.id}>
                <td className="px-4 fw-bold">{item.nombre}</td>
                <td>{item.sin_oca ? 'Sí' : 'No'}</td>
                <td>{item.color}</td>
                <td>{item.fecha}</td>
                <td>{item.codigo}</td>
                <td>{proveedores.find(p => p.id === item.proveedor_id)?.nombre || 'Sin proveedor'}</td>
                <td>{item.inventario_inicial}</td>
                <td>{item.comp}</td>
                <td>{item.t_ext}</td>
                <td>{item.vta}</td>
                <td>{item.ser_t}</td>
                <td>{item.dev}</td>
                <td>{item.t_inv_final}</td>
                <td>{
                  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }).format(Number(item.cost) || 0)
                }</td>
                <td>{item.vxm}</td>
                <td>{item.rebaja}</td>
                <td>{item.pedir ? 'Sí' : 'No'}</td>
                <td>{item.celular}</td>
                <td>{item.stock_minimo}</td>
                <td>{item.nota}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="modal d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.2)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editId ? 'Editar' : 'Crear'} Visor</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body row g-2">
                  {/* Campos del formulario */}
                  <div className="col-6">
                    <label className="form-label">Nombre</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Sin OCA</label>
                    <input name="sin_oca" checked={form.sin_oca} onChange={handleChange} className="form-check-input ms-2" type="checkbox" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Color</label>
                    <input name="color" value={form.color} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Fecha</label>
                    <input name="fecha" value={form.fecha} onChange={handleChange} className="form-control" type="date" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Código</label>
                    <input name="codigo" value={form.codigo} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Proveedor</label>
                    <select
                      name="proveedor_id"
                      value={form.proveedor_id}
                      onChange={handleChange}
                      className="form-select"
                      required
                    >
                      <option value="">Seleccione proveedor</option>
                      {proveedores.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Inventario Inicial</label>
                    <input name="inventario_inicial" value={form.inventario_inicial} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Compra</label>
                    <input name="comp" value={form.comp} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Transferencia Ext.</label>
                    <input name="t_ext" value={form.t_ext} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Venta</label>
                    <input name="vta" value={form.vta} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Servicio Técnico</label>
                    <input name="ser_t" value={form.ser_t} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Devolución</label>
                    <input name="dev" value={form.dev} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Inventario Final</label>
                    <input name="t_inv_final" value={form.t_inv_final} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Costo</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input name="cost" value={form.cost} onChange={handleChange} className="form-control" type="number" step="0.01" />
                    </div>
                  </div>
                  <div className="col-6">
                    <label className="form-label">VXM</label>
                    <input name="vxm" value={form.vxm} onChange={handleChange} className="form-control" type="number" step="0.01" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Rebaja</label>
                    <input name="rebaja" value={form.rebaja} onChange={handleChange} className="form-control" type="number" step="0.01" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Pedir</label>
                    <input name="pedir" checked={form.pedir} onChange={handleChange} className="form-check-input ms-2" type="checkbox" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Celular</label>
                    <input name="celular" value={form.celular} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label">Celular</label>
                      <input name="celular" value={form.celular} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="col-6">
                      <label className="form-label d-flex align-items-center">
                        <span>Stock Mínimo</span>
                        <span className="ms-2 text-muted" title="Cantidad mínima antes de alerta">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z"/>
                            <path d="M7.002 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm.1-4.995a.905.905 0 0 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0l-.35-3.507z"/>
                          </svg>
                        </span>
                      </label>
                      <input name="stock_minimo" value={form.stock_minimo} onChange={handleChange} className="form-control border border-warning" type="number" min={1} required placeholder="Ej: 5" />
                      <div className="form-text text-muted">Define el mínimo de stock antes de mostrar alerta en dashboard.</div>
                    </div>
                  </div>
                  <div className="col-12 mt-3">
                    <label className="form-label">Nota</label>
                    <textarea name="nota" value={form.nota} onChange={handleChange} className="form-control" />
                  </div>
                </div> {/* cierre de modal-body row g-2 */}
                <div className="modal-footer">
                  <button type="submit" className="btn btn-success">Guardar</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvDiaVisoresTable;
