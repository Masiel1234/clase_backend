import React from 'react';
import ReactDOM from 'react-dom/client';
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


import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { AuthProvider } from './auth/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

