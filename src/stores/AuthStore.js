import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

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