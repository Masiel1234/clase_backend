import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { batOriginalAPI, proveedorAPI, marcaAPI } from '../../apis/api';

interface InvDiaBatOriginal {
  id: number;
  id_marca_fk: number;
  version: string;
  color: string;
  calidad: string;
  fecha: string;
  codigo: string;
  proveedor_id: number;
  cantidad: number;
  costo: number;
  v_mayor: number;
  pedir: boolean;
  faltantes: number;
  celulares: string;
  devolucion: number;
  marca?: Marca;
  proveedor?: Proveedor;
}

interface Proveedor {
  id: number;
  nombre: string;
}

interface Marca {
  id: number;
  nombre: string;
}

const emptyForm: Omit<InvDiaBatOriginal, 'id'> = {
  id_marca_fk: 0,
  version: '',
  color: '',
  calidad: '',
  fecha: '',
  codigo: '',
  proveedor_id: 0,
  cantidad: 1,
  costo: 1,
  v_mayor: 1,
  pedir: false,
  faltantes: 1,
  celulares: '',
  devolucion: 1,
};

const InvDiaBatOriginalTable: React.FC = () => {
  const [data, setData] = useState<InvDiaBatOriginal[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number|null>(null);

  useEffect(() => {
    batOriginalAPI.getAll()
      .then(res => Array.isArray(res.data) ? setData(res.data) : setData([]))
      .catch(() => setData([]));
  }, []);
  
  useEffect(() => {
    proveedorAPI.getAll()
      .then(res => Array.isArray(res.data) ? setProveedores(res.data) : setProveedores([]))
      .catch(() => setProveedores([]));
    
    marcaAPI.getAll()
      .then(res => Array.isArray(res.data) ? setMarcas(res.data) : setMarcas([]))
      .catch(() => setMarcas([]));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await batOriginalAPI.update(editId, form);
    } else {
      await batOriginalAPI.create(form);
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    batOriginalAPI.getAll().then(res => Array.isArray(res.data) ? setData(res.data) : setData([]));
  };

  const handleEdit = (item: InvDiaBatOriginal) => {
    setForm({ ...item });
    setEditId(item.id);
    setShowModal(true);
  };

  const { user } = useAuth();
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Inventario Batería Original</h5>
        {user?.rol === 'admin' && (
          <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); }}>Nuevo</button>
        )}
      </div>
      <div className="table-responsive" style={{overflowX: 'auto'}}>
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="small text-uppercase text-muted">
              <th>Marca</th>
              <th>Versión</th>
              <th>Color</th>
              <th>Calidad</th>
              <th>Fecha</th>
              <th>Código</th>
               <th>Proveedor Name</th>
              <th>Cantidad</th>
              <th>Costo</th>
              <th>V Mayor</th>
              <th>Pedir</th>
              <th>Faltantes</th>
              <th>Celulares</th>
              <th>Devolución</th>
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
                <td>{item.fecha}</td>
                <td>{item.codigo}</td>
                <td>{proveedores.find(p => p.id === item.proveedor_id)?.nombre || 'Sin proveedor'}</td>
                <td>{item.cantidad}</td>
                <td>{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }).format(item.costo)}</td>
                <td>{item.v_mayor}</td>
                <td>{item.pedir ? 'Sí' : 'No'}</td>
                <td>{item.faltantes}</td>
                <td>{item.celulares}</td>
                <td>{item.devolucion}</td>
                <td>
                  {user?.rol === 'admin' && (
                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(item)}>Editar</button>
                  )}
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
                <h5 className="modal-title">{editId ? 'Editar' : 'Crear'} Batería Original</h5>
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
                    <label className="form-label">Cantidad</label>
                    <input name="cantidad" value={form.cantidad} onChange={handleChange} className="form-control" type="number" min={1} step={1} required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Costo</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input name="costo" value={form.costo} onChange={handleChange} className="form-control" type="number" min={1} step="1" required placeholder="Ej: 10000" />
                    </div>
                    <div className="form-text">Pesos colombianos (COP)</div>
                  </div>
                  <div className="col-6">
                    <label className="form-label">V Mayor</label>
                    <input name="v_mayor" value={form.v_mayor} onChange={handleChange} className="form-control" type="number" min={0.01} step="0.01" required placeholder="Ej: 12000.00" />
                    <div className="form-text">COP</div>
                  </div>
                  <div className="col-6">
                    <label className="form-label">Pedir</label>
                    <input name="pedir" checked={form.pedir} onChange={handleChange} className="form-check-input ms-2" type="checkbox" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Faltantes</label>
                    <input name="faltantes" value={form.faltantes} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Celulares</label>
                    <input name="celulares" value={form.celulares} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Devolución</label>
                    <input name="devolucion" value={form.devolucion} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
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

export default InvDiaBatOriginalTable;
