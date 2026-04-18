const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api';

export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '');

export const apiUrl = (path = '') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const mediaUrl = (routePrefix, path = '') => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;

  const normalizedPrefix = routePrefix.startsWith('/') ? routePrefix : `/${routePrefix}`;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return apiUrl(`${normalizedPrefix}${normalizedPath}`);
};
