import React, { useEffect, useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { marcaAPI, proveedorAPI } from '../apis/api';


interface Marca {
  id: number;
  nombre: string;
  proveedor_id?: number;
  created_at?: string;
  updated_at?: string;
  activo?: boolean;
}

interface Proveedor {
  id: number;
  nombre: string;
}

const emptyForm: Omit<Marca, 'id'> = {
  nombre: '',
  proveedor_id: undefined,
  activo: true,
};

const MarcaTable: React.FC = () => {
  const [data, setData] = useState<Marca[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number|null>(null);

  useEffect(() => {
    marcaAPI.getAll()
      .then(res => Array.isArray(res.data) ? setData(res.data) : setData([]))
      .catch(() => setData([]));
    proveedorAPI.getAll()
      .then(res => Array.isArray(res.data) ? setProveedores(res.data) : setProveedores([]))
      .catch(() => setProveedores([]));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (type === 'select-one' ? Number(value) : value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form };
    if (!payload.proveedor_id) return alert('Seleccione un proveedor');
    if (editId) {
      await marcaAPI.update(editId, payload);
    } else {
      await marcaAPI.create(payload);
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    marcaAPI.getAll().then(res => Array.isArray(res.data) ? setData(res.data) : setData([]));
  };

  const handleEdit = (item: Marca) => {
    setForm({
      nombre: item.nombre,
      proveedor_id: item.proveedor_id,
      activo: item.activo,
    });
    setEditId(item.id);
    setShowModal(true);
  };

  const handleDeactivate = async (id: number) => {
    await marcaAPI.deactivate(id);
    marcaAPI.getAll().then(res => Array.isArray(res.data) ? setData(res.data) : setData([]));
  };

  const { user } = useAuth();
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Catálogo de Marcas</h5>
        {user?.rol === 'admin' && (
          <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); }}>Nueva Marca</button>
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="small text-uppercase text-muted">
              <th>ID</th>
              <th>Nombre</th>
              <th>Activo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nombre}</td>
                <td>{item.activo ? 'Sí' : 'No'}</td>
                <td>
                  {user?.rol === 'admin' && (
                    <>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(item)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeactivate(item.id)}>Desactivar</button>
                    </>
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
                <h5 className="modal-title">{editId ? 'Editar' : 'Crear'} Marca</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body row g-2">
                  <div className="col-12">
                    <label className="form-label">Nombre</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Proveedor</label>
                    <select name="proveedor_id" value={form.proveedor_id ?? ''} onChange={handleChange} className="form-select" required>
                      <option value="" disabled>Seleccione un proveedor</option>
                      {proveedores.map(p => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Activo</label>
                    <input name="activo" checked={form.activo} onChange={handleChange} className="form-check-input ms-2" type="checkbox" />
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

export default MarcaTable;
