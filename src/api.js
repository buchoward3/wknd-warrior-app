import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://wknd-warrior-backend.onrender.com';

class API {
  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  setAuthToken(token) {
    if (token) {
      this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common['Authorization'];
    }
  }

  async login(email, password) {
    const response = await this.client.post('/api/auth/login', { email, password });
    return response.data;
  }

  async register(email, password, username) {
    const response = await this.client.post('/api/auth/register', { email, password, username });
    return response.data;
  }

  async getProfile() {
    const response = await this.client.get('/api/user/profile');
    return response.data;
  }

  async getDashboard() {
    const response = await this.client.get('/api/user/dashboard');
    return response.data;
  }

  async findWeekends() {
    const response = await this.client.get('/api/user/weekend-events');
    return response.data;
  }

  async connectSpotify() {
    const response = await this.client.get('/api/spotify/auth-url');
    window.location.href = response.data.url;
  }

  async healthCheck() {
    const response = await this.client.get('/api/health');
    return response.data;
  }
}

export const api = new API();
