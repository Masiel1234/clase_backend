import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!nombre || !password) {
      setError('Ingrese nombre y contraseña');
      return;
    }
    const ok = await login(nombre, password);
    if (!ok) {
      setError('Credenciales incorrectas');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <form className="card p-4 shadow-sm" style={{ minWidth: 320 }} onSubmit={handleSubmit}>
        <h4 className="mb-3 fw-bold text-center">Iniciar Sesión</h4>
        {error && <div className="alert alert-danger py-1 small">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input className="form-control" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100" type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
