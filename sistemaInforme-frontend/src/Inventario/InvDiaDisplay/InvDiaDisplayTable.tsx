import React, { useEffect, useState } from 'react';
import { displayAPI, proveedorAPI, marcaAPI } from '../../apis/api';

interface Proveedor {
  id: number;
  nombre: string;
}

interface Marca {
  id: number;
  nombre: string;
}

interface InvDiaDisplay {
  id: number;
  id_marca_fk: number;
  version: string;
  color: string;
  calidad: string;
  r_f: string;
  fecha: string;
  codigo: string;
  proveedor_id: number;
  inventario_inicial: number;
  vta: number;
  ser_t: number;
  dev: number;
  t_inv_final: number;
  cost: number;
  cost_venta: number;
  rebaja: number;
  pedir: boolean;
  falt: boolean;
  celular: string;
  nota: string;
  marca?: Marca;
  proveedor?: Proveedor;
}

const emptyForm: Omit<InvDiaDisplay, 'id'> = {
  id_marca_fk: 0,
  version: '',
  color: '',
  calidad: '',
  r_f: '',
  fecha: '',
  codigo: '',
  proveedor_id: 0,
  inventario_inicial: 0,
  vta: 0,
  ser_t: 0,
  dev: 0,
  t_inv_final: 0,
  cost: 0,
  cost_venta: 0,
  rebaja: 0,
  pedir: false,
  falt: false,
  celular: '',
  nota: '',
};

const InvDiaDisplayTable: React.FC = () => {
  const [data, setData] = useState<InvDiaDisplay[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number|null>(null);
  
  useEffect(() => {
    proveedorAPI.getAll()
      .then(res => Array.isArray(res.data) ? setProveedores(res.data) : setProveedores([]))
      .catch(() => setProveedores([]));
    
    marcaAPI.getAll()
      .then(res => Array.isArray(res.data) ? setMarcas(res.data) : setMarcas([]))
      .catch(() => setMarcas([]));
  }, []);

  useEffect(() => {
    displayAPI.getAll()
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
      await displayAPI.update(editId, form);
    } else {
      await displayAPI.create(form);
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    displayAPI.getAll().then(res => Array.isArray(res.data) ? setData(res.data) : setData([]));
  };

  const handleEdit = (item: InvDiaDisplay) => {
    setForm({ ...item });
    setEditId(item.id);
    setShowModal(true);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Inventario Display</h5>
        <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); }}>Nuevo</button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="small text-uppercase text-muted">
              <th>Marca</th>
              <th>Versión</th>
              <th>Color</th>
              <th>Calidad</th>
              <th>R/F</th>
              <th>Fecha</th>
              <th>Código</th>
              <th>Proveedor</th>
              <th>Inventario Inicial</th>
              <th>Venta</th>
              <th>Servicio Técnico</th>
              <th>Devolución</th>
              <th>Inventario Final</th>
              <th>Costo</th>
              <th>Costo Venta</th>
              <th>Rebaja</th>
              <th>Pedir</th>
              <th>Falt</th>
              <th>Celular</th>
              <th>Nota</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(data) ? data : []).map(item => (
              <tr key={item.id}>
                <td>{item.marca?.nombre || '-'}</td>
                <td>{item.version}</td>
                <td>{item.color}</td>
                <td>{item.calidad}</td>
                <td>{item.r_f}</td>
                <td>{item.fecha}</td>
                <td>{item.codigo}</td>
                <td>{proveedores.find(p => p.id === item.proveedor_id)?.nombre || 'Sin proveedor'}</td>
                <td>{item.inventario_inicial}</td>
                <td>{item.vta}</td>
                <td>{item.ser_t}</td>
                <td>{item.dev}</td>
                <td>{item.t_inv_final}</td>
                <td>{item.cost}</td>
                <td>{item.cost_venta}</td>
                <td>{item.rebaja}</td>
                <td>{item.pedir ? 'Sí' : 'No'}</td>
                <td>{item.falt ? 'Sí' : 'No'}</td>
                <td>{item.celular}</td>
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
                <h5 className="modal-title">{editId ? 'Editar' : 'Crear'} Display</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body row g-2">
                  {/* Campos del formulario */}
                  <div className="col-6">
                    <label className="form-label">Marca</label>
                    <select name="id_marca_fk" value={form.id_marca_fk} onChange={handleChange} className="form-control">
                      <option value={0}>Sin marca</option>
                      {marcas.map(marca => (
                        <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Versión</label>
                    <input name="version" value={form.version} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Color</label>
                    <input name="color" value={form.color} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Calidad</label>
                    <input name="calidad" value={form.calidad} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">R/F</label>
                    <input name="r_f" value={form.r_f} onChange={handleChange} className="form-control" />
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
                    <input name="inventario_inicial" value={form.inventario_inicial} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Venta</label>
                    <input name="vta" value={form.vta} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Servicio Técnico</label>
                    <input name="ser_t" value={form.ser_t} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Devolución</label>
                    <input name="dev" value={form.dev} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Inventario Final</label>
                    <input name="t_inv_final" value={form.t_inv_final} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Costo</label>
                    <input name="cost" value={form.cost} onChange={handleChange} className="form-control" type="number" step="0.01" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Costo Venta</label>
                    <input name="cost_venta" value={form.cost_venta} onChange={handleChange} className="form-control" type="number" step="0.01" />
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
                    <label className="form-label">Falt</label>
                    <input name="falt" checked={form.falt} onChange={handleChange} className="form-check-input ms-2" type="checkbox" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Celular</label>
                    <input name="celular" value={form.celular} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Nota</label>
                    <textarea name="nota" value={form.nota} onChange={handleChange} className="form-control" />
                  </div>
                </div>
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

export default InvDiaDisplayTable;
