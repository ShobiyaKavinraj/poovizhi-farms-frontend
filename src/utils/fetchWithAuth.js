// src/utils/fetchWithAuth.js
import { useNavigate } from 'react-router-dom';

export function useFetchWithAuth() {
  const navigate = useNavigate();

  async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return null;
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return null;
      }

      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      alert('Network error. Please try again.');
      return null;
    }
  }

  return fetchWithAuth;
}
