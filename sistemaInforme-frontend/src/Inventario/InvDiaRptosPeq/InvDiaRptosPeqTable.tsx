import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import { rptosPeqAPI, marcaAPI } from '../../apis/api';

interface Marca {
  id: number;
  nombre: string;
}

interface InvDiaRptosPeq {
  id: number;
  id_marca_fk: number;
  v3: number;
  v8: number;
  tc: number;
  tablet: number;
  chinos: number;
  mic_dig: number;
  power: number;
  audio: number;
  conector_carga: number;
  lector_huella: number;
  auricular: number;
  parlante: number;
  logic_carga: number;
  home: number;
  delantera_visor: number;
  trasera_visor: number;
  antena: number;
  porta_sim: number;
  boton_lateral: number;
  stock_minimo: number;
  marca?: Marca;
}

const emptyForm: Omit<InvDiaRptosPeq, 'id'> = {
  id_marca_fk: 0,
  v3: 1,
  v8: 1,
  tc: 1,
  tablet: 1,
  chinos: 1,
  mic_dig: 1,
  power: 1,
  audio: 1,
  conector_carga: 1,
  lector_huella: 1,
  auricular: 1,
  parlante: 1,
  logic_carga: 1,
  home: 1,
  delantera_visor: 1,
  trasera_visor: 1,
  antena: 1,
  porta_sim: 1,
  boton_lateral: 1,
  stock_minimo: 5,
};

const InvDiaRptosPeqTable: React.FC = () => {
  const [data, setData] = useState<InvDiaRptosPeq[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number|null>(null);

  useEffect(() => {
    rptosPeqAPI.getAll()
      .then(res => Array.isArray(res.data) ? setData(res.data) : setData([]))
      .catch(() => setData([]));
    
    marcaAPI.getAll()
      .then(res => Array.isArray(res.data) ? setMarcas(res.data) : setMarcas([]))
      .catch(() => setMarcas([]));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { name, value, type } = target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await rptosPeqAPI.update(editId, form);
    } else {
      await rptosPeqAPI.create(form);
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    rptosPeqAPI.getAll().then(res => Array.isArray(res.data) ? setData(res.data) : setData([]));
  };

  const handleEdit = (item: InvDiaRptosPeq) => {
    setForm({ ...item });
    setEditId(item.id);
    setShowModal(true);
  };

  const { user } = useAuth();
  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Inventario Repuestos Pequeños</h5>
        {user?.rol === 'admin' && (
          <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); }}>Nuevo</button>
        )}
      </div>
      <div className="table-responsive" style={{overflowX: 'auto'}}>
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="small text-uppercase text-muted">
              <th>Marca</th>
              <th>V3</th>
              <th>V8</th>
              <th>TC</th>
              <th>Tablet</th>
              <th>Chinos</th>
              <th>Mic Dig</th>
              <th>Power</th>
              <th>Audio</th>
              <th>Conector Carga</th>
              <th>Lector Huella</th>
              <th>Auricular</th>
              <th>Parlante</th>
              <th>Logic Carga</th>
              <th>Home</th>
              <th>Delantera Visor</th>
              <th>Trasera Visor</th>
              <th>Antena</th>
              <th>Porta SIM</th>
              <th>Botón Lateral</th>
              <th>Stock Mínimo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(data) ? data : []).map(item => (
              <tr key={item.id}>
                <td>{item.marca?.nombre || '-'}</td>
                <td>{item.v3}</td>
                <td>{item.v8}</td>
                <td>{item.tc}</td>
                <td>{item.tablet}</td>
                <td>{item.chinos}</td>
                <td>{item.mic_dig}</td>
                <td>{item.power}</td>
                <td>{item.audio}</td>
                <td>{item.conector_carga}</td>
                <td>{item.lector_huella}</td>
                <td>{item.auricular}</td>
                <td>{item.parlante}</td>
                <td>{item.logic_carga}</td>
                <td>{item.home}</td>
                <td>{item.delantera_visor}</td>
                <td>{item.trasera_visor}</td>
                <td>{item.antena}</td>
                <td>{item.porta_sim}</td>
                <td>{item.boton_lateral}</td>
                <td>{item.stock_minimo}</td>
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
                <h5 className="modal-title">{editId ? 'Editar' : 'Crear'} Repuesto Pequeño</h5>
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
                    <label className="form-label">V3</label>
                    <input name="v3" value={form.v3} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">V8</label>
                    <input name="v8" value={form.v8} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">TC</label>
                    <input name="tc" value={form.tc} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Tablet</label>
                    <input name="tablet" value={form.tablet} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Chinos</label>
                    <input name="chinos" value={form.chinos} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Mic Dig</label>
                    <input name="mic_dig" value={form.mic_dig} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Power</label>
                    <input name="power" value={form.power} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Audio</label>
                    <input name="audio" value={form.audio} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Conector Carga</label>
                    <input name="conector_carga" value={form.conector_carga} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Lector Huella</label>
                    <input name="lector_huella" value={form.lector_huella} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Auricular</label>
                    <input name="auricular" value={form.auricular} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Parlante</label>
                    <input name="parlante" value={form.parlante} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Logic Carga</label>
                    <input name="logic_carga" value={form.logic_carga} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Home</label>
                    <input name="home" value={form.home} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Delantera Visor</label>
                    <input name="delantera_visor" value={form.delantera_visor} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Trasera Visor</label>
                    <input name="trasera_visor" value={form.trasera_visor} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Antena</label>
                    <input name="antena" value={form.antena} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Porta SIM</label>
                    <input name="porta_sim" value={form.porta_sim} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Botón Lateral</label>
                    <input name="boton_lateral" value={form.boton_lateral} onChange={handleChange} className="form-control" type="number" min={1} step={1} />
                  </div>
                </div>
                <div className="col-md-6 mt-3">
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

export default InvDiaRptosPeqTable;
