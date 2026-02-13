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
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventario/bat-generica" element={<InvDiaBatGenerica />} />
        <Route path="/inventario/bat-original" element={<InvDiaBatOriginal />} />
        <Route path="/inventario/display" element={<InvDiaDisplay />} />
        <Route path="/inventario/tapa-back" element={<InvDiaTapaBack />} />
        <Route path="/inventario/tactil" element={<InvDiaTactil />} />
        <Route path="/inventario/visores" element={<InvDiaVisores />} />
      <Route path="/inventario/rptos-peq" element={<InvDiaRptosPeq />} />
      <Route path="/inventario/cel" element={<InvDiaCel />} />
      <Route path="/marca" element={<Marca />} />
      <Route path="/proveedor" element={<Proveedor />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

