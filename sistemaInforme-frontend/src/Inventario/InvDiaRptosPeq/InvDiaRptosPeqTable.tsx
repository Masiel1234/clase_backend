import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
}

const emptyForm: Omit<InvDiaRptosPeq, 'id'> = {
  id_marca_fk: 0,
  v3: 0,
  v8: 0,
  tc: 0,
  tablet: 0,
  chinos: 0,
  mic_dig: 0,
  power: 0,
  audio: 0,
  conector_carga: 0,
  lector_huella: 0,
  auricular: 0,
  parlante: 0,
  logic_carga: 0,
  home: 0,
  delantera_visor: 0,
  trasera_visor: 0,
  antena: 0,
  porta_sim: 0,
  boton_lateral: 0,
};

const InvDiaRptosPeqTable: React.FC = () => {
  const [data, setData] = useState<InvDiaRptosPeq[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number|null>(null);

  useEffect(() => {
    axios.get('/api/inventario/inv-dia-rptos-peq')
      .then(res => Array.isArray(res.data) ? setData(res.data) : setData([]))
      .catch(() => setData([]));
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
      await axios.put(`/api/inventario/inv-dia-rptos-peq/${editId}`, form);
    } else {
      await axios.post('/api/inventario/inv-dia-rptos-peq', form);
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    axios.get('/api/inventario/inv-dia-rptos-peq').then(res => Array.isArray(res.data) ? setData(res.data) : setData([]));
  };

  const handleEdit = (item: InvDiaRptosPeq) => {
    setForm({ ...item });
    setEditId(item.id);
    setShowModal(true);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Inventario Repuestos Pequeños</h5>
        <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); }}>Nuevo</button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="small text-uppercase text-muted">
              <th className="px-4">ID Marca</th>
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
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(data) ? data : []).map(item => (
              <tr key={item.id}>
                <td className="px-4 fw-bold">{item.id_marca_fk}</td>
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
                <h5 className="modal-title">{editId ? 'Editar' : 'Crear'} Repuesto Pequeño</h5>
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
                    <label className="form-label">V3</label>
                    <input name="v3" value={form.v3} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">V8</label>
                    <input name="v8" value={form.v8} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">TC</label>
                    <input name="tc" value={form.tc} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Tablet</label>
                    <input name="tablet" value={form.tablet} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Chinos</label>
                    <input name="chinos" value={form.chinos} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Mic Dig</label>
                    <input name="mic_dig" value={form.mic_dig} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Power</label>
                    <input name="power" value={form.power} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Audio</label>
                    <input name="audio" value={form.audio} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Conector Carga</label>
                    <input name="conector_carga" value={form.conector_carga} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Lector Huella</label>
                    <input name="lector_huella" value={form.lector_huella} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Auricular</label>
                    <input name="auricular" value={form.auricular} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Parlante</label>
                    <input name="parlante" value={form.parlante} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Logic Carga</label>
                    <input name="logic_carga" value={form.logic_carga} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Home</label>
                    <input name="home" value={form.home} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Delantera Visor</label>
                    <input name="delantera_visor" value={form.delantera_visor} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Trasera Visor</label>
                    <input name="trasera_visor" value={form.trasera_visor} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Antena</label>
                    <input name="antena" value={form.antena} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Porta SIM</label>
                    <input name="porta_sim" value={form.porta_sim} onChange={handleChange} className="form-control" type="number" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Botón Lateral</label>
                    <input name="boton_lateral" value={form.boton_lateral} onChange={handleChange} className="form-control" type="number" />
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

export default InvDiaRptosPeqTable;
