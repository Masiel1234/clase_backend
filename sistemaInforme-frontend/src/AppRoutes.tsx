import React from 'react';
import { useAuth } from './auth/AuthContext';
import Login from './auth/Login';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import InvDiaBatGenerica from './Inventario/InvDiaBatGenerica/InvDiaBatGenerica';
import InvDiaBatOriginal from './Inventario/InvDiaBatOriginal/InvDiaBatOriginal';
import InvDiaCel from './Inventario/InvDiaCel/InvDiaCel';
import InvDiaDisplay from './Inventario/InvDiaDisplay/InvDiaDisplay';
import InvDiaTapaBack from './Inventario/InvDiaTapaBack/InvDiaTapaBack';
import InvDiaTactil from './Inventario/InvDiaTactil/InvDiaTactil';
import InvDiaVisores from './Inventario/InvDiaVisores/InvDiaVisores';
import InvDiaRptosPeq from './Inventario/InvDiaRptosPeq/InvDiaRptosPeq';
import Marca from './Catalogos/Marca';
import Proveedor from './Catalogos/Proveedor';

const PrivateRoute = ({ children, roles }: { children: React.ReactNode, roles?: string[] }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(user.rol)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/inventario/bat-generica" element={<PrivateRoute><InvDiaBatGenerica /></PrivateRoute>} />
      <Route path="/inventario/bat-original" element={<PrivateRoute><InvDiaBatOriginal /></PrivateRoute>} />
      <Route path="/inventario/display" element={<PrivateRoute><InvDiaDisplay /></PrivateRoute>} />
      <Route path="/inventario/tapa-back" element={<PrivateRoute><InvDiaTapaBack /></PrivateRoute>} />
      <Route path="/inventario/tactil" element={<PrivateRoute><InvDiaTactil /></PrivateRoute>} />
      <Route path="/inventario/visores" element={<PrivateRoute><InvDiaVisores /></PrivateRoute>} />
      <Route path="/inventario/rptos-peq" element={<PrivateRoute><InvDiaRptosPeq /></PrivateRoute>} />
      <Route path="/inventario/cel" element={<PrivateRoute><InvDiaCel /></PrivateRoute>} />
      <Route path="/marca" element={<PrivateRoute><Marca /></PrivateRoute>} />
      <Route path="/proveedor" element={<PrivateRoute><Proveedor /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
