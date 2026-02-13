import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import apiService from '../services/apiServices'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: Cookies.get('auth_token') || null,
    user: null, 
    themeColor: localStorage.getItem('app_theme') || '#42b883'
  }),

  actions: {
    init() {
      if (this.token) {
        try {
          this.user = jwtDecode(this.token)
        } catch (e) {
          this.logout()
        }
      }
    },

    saveLogin(token) {
      if (typeof token !== 'string') return;
      
      this.token = token;
      Cookies.set('auth_token', token, { expires: 7, sameSite: 'strict' });
      
      try {
        this.user = jwtDecode(token);
      } catch (error) {
        console.error("Invalid token format", error);
      }
    },
async login(credentials) {
    try {
        const response = await apiService.auth.login({ ...credentials });
        const data = response.data; 
        const token = data.token || data.data?.token;
        if (!token) {
            console.error("Token missing in response:", data);
            return { success: false, error: "Token not received" };
        }
        this.saveLogin(token);
        return { success: true, user: this.user };
    } catch (err) {
        console.error("Store Login Error:", err.response?.data || err);
        return { success: false, error: err.response?.data?.message || "Login failed" };
    }
},

    async register(userData) {
      try {
        const response = await apiService.auth.signup(userData);
        return { success: true, message: response.data?.message || 'Success' };
      } catch (err) {
        let message = "Registration failed";
        if (err.response?.status === 422 || err.response?.status === 400) {
            message = err.response.data?.message || "Email already registered";
        }
        return { success: false, error: message };
      }
    },
    logout() {
      this.token = null
      this.user = null
      Cookies.remove('auth_token')
      window.location.href = '/login'
    },

    setTheme(color) {
      this.themeColor = color
      localStorage.setItem('app_theme', color)
    }
    
  }
})