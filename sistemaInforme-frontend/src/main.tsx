import React from 'react';
import ReactDOM from 'react-dom/client';
import InvDiaBatGenerica from './Inventario/InvDiaBatGenerica/InvDiaBatGenerica';
import InvDiaBatOriginal from './Inventario/InvDiaBatOriginal';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventario/bat-generica" element={<InvDiaBatGenerica />} />
        <Route path="/inventario/bat-original" element={<InvDiaBatOriginal />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

