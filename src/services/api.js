const API_URL = 'http://localhost:8080/api';

// --- Manejo de Sesión y Token en localStorage ---
export const guardarSesion = (token, usuario) => {
  localStorage.setItem('nutrivida_token', token);
  localStorage.setItem('nutrivida_usuario', JSON.stringify(usuario));
};

export const cerrarSesion = () => {
  localStorage.removeItem('nutrivida_token');
  localStorage.removeItem('nutrivida_usuario');
};

export const obtenerToken = () => {
  return localStorage.getItem('nutrivida_token');
};

export const obtenerUsuarioActual = () => {
  const data = localStorage.getItem('nutrivida_usuario');
  return data ? JSON.parse(data) : null;
};

export const esAdmin = () => {
  const usuario = obtenerUsuarioActual();
  return usuario?.rol === 'ADMIN';
};

// --- Petición base con inyección automática de Bearer Token ---
export const apiFetch = async (endpoint, options = {}) => {
  const token = obtenerToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Si el token expiró o no tiene permisos, limpiamos sesión
  if (response.status === 401 || response.status === 403) {
    if (token) {
      cerrarSesion();
    }
    throw new Error('No autorizado o sesión expirada. Inicia sesión nuevamente.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error ${response.status} en el servidor`);
  }

  if (response.status === 204) return null;
  return response.json();
};

// --- Endpoints de Autenticación ---
export const loginUsuario = async (correo, password) => {
  const data = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ correo, password }),
  });
  guardarSesion(data.token, data.usuario);
  return data;
};

export const registrarUsuario = async (usuario) => {
  const data = await apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(usuario),
  });
  guardarSesion(data.token, data.usuario);
  return data;
};