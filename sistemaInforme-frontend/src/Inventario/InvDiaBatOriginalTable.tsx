import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
}

const emptyForm: Omit<InvDiaBatOriginal, 'id'> = {
  id_marca_fk: 0,
  version: '',
  color: '',
  calidad: '',
  fecha: '',
  codigo: '',
  proveedor_id: 0,
  cantidad: 0,
  costo: 0,
  v_mayor: 0,
  pedir: false,
  faltantes: 0,
  celulares: '',
  devolucion: 0,
};

const InvDiaBatOriginalTable: React.FC = () => {
  const [data, setData] = useState<InvDiaBatOriginal[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number|null>(null);

  useEffect(() => {
    axios.get('/api/inventario/inv-dia-bat-original')
      .then(res => Array.isArray(res.data) ? setData(res.data) : setData([]))
      .catch(() => setData([]));
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
      await axios.put(`/api/inventario/inv-dia-bat-original/${editId}`, form);
    } else {
      await axios.post('/api/inventario/inv-dia-bat-original', form);
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    axios.get('/api/inventario/inv-dia-bat-original').then(res => Array.isArray(res.data) ? setData(res.data) : setData([]));
  };

  const handleEdit = (item: InvDiaBatOriginal) => {
    setForm({ ...item });
    setEditId(item.id);
    setShowModal(true);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Inventario Batería Original</h5>
        <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); }}>Nuevo</button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="small text-uppercase text-muted">
              <th className="px-4">ID Marca</th>
              <th>Versión</th>
              <th>Color</th>
              <th>Calidad</th>
              <th>Fecha</th>
              <th>Código</th>
              <th>Proveedor</th>
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
                <td className="px-4 fw-bold">{item.id_marca_fk}</td>
                <td>{item.version}</td>
                <td>{item.color}</td>
                <td>{item.calidad}</td>
                <td>{item.fecha}</td>
                <td>{item.codigo}</td>
                <td>{item.proveedor_id}</td>
                <td>{item.cantidad}</td>
                <td>{item.costo}</td>
                <td>{item.v_mayor}</td>
                <td>{item.pedir ? 'Sí' : 'No'}</td>
                <td>{item.faltantes}</td>
                <td>{item.celulares}</td>
                <td>{item.devolucion}</td>
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
                <h5 className="modal-title">{editId ? 'Editar' : 'Crear'} Batería Original</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body row g-2">
                  {/* Campos del formulario */}
                  <div className="col-6">
                    <label className="form-label">ID Marca</label>
                    <input name="id_marca_fk" value={form.id_marca_fk} onChange={handleChange} className="form-control" type="number" required />
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
                    <input name="proveedor_id" value={form.proveedor_id} onChange={handleChange} className="form-control" type="number" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Cantidad</label>
                    <input name="cantidad" value={form.cantidad} onChange={handleChange} className="form-control" type="number" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Costo</label>
                    <input name="costo" value={form.costo} onChange={handleChange} className="form-control" type="number" step="0.01" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">V Mayor</label>
                    <input name="v_mayor" value={form.v_mayor} onChange={handleChange} className="form-control" type="number" step="0.01" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Pedir</label>
                    <input name="pedir" checked={form.pedir} onChange={handleChange} className="form-check-input ms-2" type="checkbox" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Faltantes</label>
                    <input name="faltantes" value={form.faltantes} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Celulares</label>
                    <input name="celulares" value={form.celulares} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Devolución</label>
                    <input name="devolucion" value={form.devolucion} onChange={handleChange} className="form-control" type="number" />
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
