import axios from 'axios';

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Instancia de axios configurada
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

// Interceptor para manejar respuestas
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en la petición:', error);
    return Promise.reject(error);
  }
);

// ============ DASHBOARD ============
export const dashboardAPI = {
  getResumenCompleto: () => apiClient.get('/dashboard/resumen-completo'),
};

// ============ INVENTARIO - BATERIAS GENÉRICAS ============
export const batGenericaAPI = {
  getAll: () => apiClient.get('/inventario/bat-generica'),
  create: (data: any) => apiClient.post('/inventario/bat-generica', data),
  update: (id: number, data: any) => apiClient.put(`/inventario/bat-generica/${id}`, data),
};

// ============ INVENTARIO - BATERIAS ORIGINALES ============
export const batOriginalAPI = {
  getAll: () => apiClient.get('/inventario/bat-original'),
  create: (data: any) => apiClient.post('/inventario/bat-original', data),
  update: (id: number, data: any) => apiClient.put(`/inventario/bat-original/${id}`, data),
};

// ============ INVENTARIO - DISPLAYS ============
export const displayAPI = {
  getAll: () => apiClient.get('/inventario/display'),
  create: (data: any) => apiClient.post('/inventario/display', data),
  update: (id: number, data: any) => apiClient.put(`/inventario/display/${id}`, data),
};

// ============ INVENTARIO - TAPA BACK ============
export const tapaBackAPI = {
  getAll: () => apiClient.get('/inventario/tapa-back'),
  create: (data: any) => apiClient.post('/inventario/tapa-back', data),
  update: (id: number, data: any) => apiClient.put(`/inventario/tapa-back/${id}`, data),
};

// ============ INVENTARIO - TÁCTIL ============
export const tactilAPI = {
  getAll: () => apiClient.get('/inventario/tactil'),
  create: (data: any) => apiClient.post('/inventario/tactil', data),
  update: (id: number, data: any) => apiClient.put(`/inventario/tactil/${id}`, data),
};

// ============ INVENTARIO - VISORES ============
export const visoresAPI = {
  getAll: () => apiClient.get('/inventario/visores'),
  create: (data: any) => apiClient.post('/inventario/visores', data),
  update: (id: number, data: any) => apiClient.put(`/inventario/visores/${id}`, data),
};

// ============ INVENTARIO - REPUESTOS PEQUEÑOS ============
export const rptosPeqAPI = {
  getAll: () => apiClient.get('/inventario/rptos-peq'),
  create: (data: any) => apiClient.post('/inventario/rptos-peq', data),
  update: (id: number, data: any) => apiClient.put(`/inventario/rptos-peq/${id}`, data),
};

// ============ INVENTARIO - CELULARES ============
export const celularesAPI = {
  getAll: () => apiClient.get('/inventario/cel'),
  create: (data: any) => apiClient.post('/inventario/cel', data),
  update: (id: number, data: any) => apiClient.put(`/inventario/cel/${id}`, data),
};

// ============ CATÁLOGOS - MARCAS ============
export const marcaAPI = {
  getAll: () => apiClient.get('/catalogos/marcas'),
  create: (data: any) => apiClient.post('/catalogos/marcas', data),
  update: (id: number, data: any) => apiClient.put(`/catalogos/marcas/${id}`, data),
  deactivate: (id: number) => apiClient.patch(`/catalogos/marcas/${id}/deactivate`),
};

// ============ CATÁLOGOS - PROVEEDORES ============
export const proveedorAPI = {
  getAll: () => apiClient.get('/proveedor'),
  create: (data: any) => apiClient.post('/proveedor', data),
  update: (id: number, data: any) => apiClient.put(`/proveedor/${id}`, data),
  deactivate: (id: number) => apiClient.patch(`/proveedor/${id}/deactivate`),
};

export default apiClient;
