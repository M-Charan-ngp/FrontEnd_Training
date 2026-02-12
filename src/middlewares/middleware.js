import { useAuthStore } from "../stores/AuthStore"
export function adminMiddleware(to, from, next) {
    const authStore = useAuthStore()
    
    if (authStore.token && authStore.user?.role === 'admin') {
        next()
    } else {
        alert("Access Denied: Admin privileges required.")
        next('/cart')
    }
}
export function userMiddleware(to, from, next) {
    const authStore = useAuthStore()
    
    if (authStore.token && authStore.user?.role === 'user') {
        next()
    } else {
        next('/studentdata') 
    }
}
export function authMiddleware(to, from, next) {
    const authStore = useAuthStore()
    if (!authStore.token) {
        alert("Access Denied: Login required.")
        next('/login')
    } else {
        next()
    }
}