import React, { useEffect, useState } from 'react';
import { celularesAPI } from '../../apis/api';

interface InvDiaCel {
  id: number;
  fecha: string;
  costo: number;
  referencia: string;
  software: string;
  tarjeta: string;
  display: string;
  tactil: string;
  visor: string;
  bateria: string;
  boton: string;
  ping: string;
  cam_tapas: string;
  bcver: string;
  mantenimiento: string;
  logica: string;
  entrega: string;
  abonos: number;
  fecha_entrega_pago: string;
  no_entrega_o_garantia: string;
  devolucion: string;
  terceros_comentos: string;
}

const emptyForm: Omit<InvDiaCel, 'id'> = {
  fecha: '',
  costo: 0,
  referencia: '',
  software: '',
  tarjeta: '',
  display: '',
  tactil: '',
  visor: '',
  bateria: '',
  boton: '',
  ping: '',
  cam_tapas: '',
  bcver: '',
  mantenimiento: '',
  logica: '',
  entrega: '',
  abonos: 0,
  fecha_entrega_pago: '',
  no_entrega_o_garantia: '',
  devolucion: '',
  terceros_comentos: '',
};

const InvDiaCelTable: React.FC = () => {
  const [data, setData] = useState<InvDiaCel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number|null>(null);

  useEffect(() => {
    celularesAPI.getAll()
      .then(res => Array.isArray(res.data) ? setData(res.data) : setData([]))
      .catch(() => setData([]));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await celularesAPI.update(editId, form);
    } else {
      await celularesAPI.create(form);
    }
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    celularesAPI.getAll().then(res => Array.isArray(res.data) ? setData(res.data) : setData([]));
  };

  const handleEdit = (item: InvDiaCel) => {
    setForm({ ...item });
    setEditId(item.id);
    setShowModal(true);
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="card-header bg-white p-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Inventario Celulares</h5>
        <button className="btn btn-primary btn-sm" onClick={() => { setShowModal(true); setEditId(null); setForm(emptyForm); }}>Nuevo</button>
      </div>
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr className="small text-uppercase text-muted">
              <th className="px-4">Fecha</th>
              <th>Costo</th>
              <th>Referencia</th>
              <th>Software</th>
              <th>Tarjeta</th>
              <th>Display</th>
              <th>Tactil</th>
              <th>Visor</th>
              <th>Batería</th>
              <th>Botón</th>
              <th>Ping</th>
              <th>Cam Tapas</th>
              <th>BCVer</th>
              <th>Mantenimiento</th>
              <th>Lógica</th>
              <th>Entrega</th>
              <th>Abonos</th>
              <th>Fecha Entrega Pago</th>
              <th>No Entrega o Garantía</th>
              <th>Devolución</th>
              <th>Terceros Comentarios</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(data) ? data : []).map(item => (
              <tr key={item.id}>
                <td className="px-4 fw-bold">{item.fecha}</td>
                <td>{item.costo}</td>
                <td>{item.referencia}</td>
                <td>{item.software}</td>
                <td>{item.tarjeta}</td>
                <td>{item.display}</td>
                <td>{item.tactil}</td>
                <td>{item.visor}</td>
                <td>{item.bateria}</td>
                <td>{item.boton}</td>
                <td>{item.ping}</td>
                <td>{item.cam_tapas}</td>
                <td>{item.bcver}</td>
                <td>{item.mantenimiento}</td>
                <td>{item.logica}</td>
                <td>{item.entrega}</td>
                <td>{item.abonos}</td>
                <td>{item.fecha_entrega_pago}</td>
                <td>{item.no_entrega_o_garantia}</td>
                <td>{item.devolucion}</td>
                <td>{item.terceros_comentos}</td>
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
                <h5 className="modal-title">{editId ? 'Editar' : 'Crear'} Celular</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body row g-2">
                  {/* Campos del formulario */}
                  <div className="col-6">
                    <label className="form-label">Fecha</label>
                    <input name="fecha" value={form.fecha} onChange={handleChange} className="form-control" type="date" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Costo</label>
                    <input name="costo" value={form.costo} onChange={handleChange} className="form-control" type="number" step="0.01" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Referencia</label>
                    <input name="referencia" value={form.referencia} onChange={handleChange} className="form-control" required />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Software</label>
                    <input name="software" value={form.software} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Tarjeta</label>
                    <input name="tarjeta" value={form.tarjeta} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Display</label>
                    <input name="display" value={form.display} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Tactil</label>
                    <input name="tactil" value={form.tactil} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Visor</label>
                    <input name="visor" value={form.visor} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Batería</label>
                    <input name="bateria" value={form.bateria} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Botón</label>
                    <input name="boton" value={form.boton} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Ping</label>
                    <input name="ping" value={form.ping} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Cam Tapas</label>
                    <input name="cam_tapas" value={form.cam_tapas} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">BCVer</label>
                    <input name="bcver" value={form.bcver} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Mantenimiento</label>
                    <input name="mantenimiento" value={form.mantenimiento} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Lógica</label>
                    <input name="logica" value={form.logica} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Entrega</label>
                    <input name="entrega" value={form.entrega} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Abonos</label>
                    <input name="abonos" value={form.abonos} onChange={handleChange} className="form-control" type="number" step="0.01" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Fecha Entrega Pago</label>
                    <input name="fecha_entrega_pago" value={form.fecha_entrega_pago} onChange={handleChange} className="form-control" type="date" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">No Entrega o Garantía</label>
                    <input name="no_entrega_o_garantia" value={form.no_entrega_o_garantia} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Devolución</label>
                    <input name="devolucion" value={form.devolucion} onChange={handleChange} className="form-control" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Terceros Comentarios</label>
                    <textarea name="terceros_comentos" value={form.terceros_comentos} onChange={handleChange} className="form-control" />
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

export default InvDiaCelTable;
