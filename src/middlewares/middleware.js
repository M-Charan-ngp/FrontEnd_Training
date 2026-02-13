import { useAuthStore } from "../stores/AuthStore"


export function adminMiddleware(to, from, next) {
    const authStore = useAuthStore()
    const currentTime = Math.floor(Date.now() / 1000)

    if (!authStore.token || (authStore.user?.exp < currentTime)) {
        authStore.logout()
        return next('/login')
    }

    if (authStore.user?.role !== 'admin') {
        alert("Access Denied: Admin privileges required.")
        return next('/studentdata')
    }

    next()
}
export function userMiddleware(to, from, next) {
    const authStore = useAuthStore()
    
    if (authStore.token && authStore.user?.role === 'user') {
        next()
    } else {
        next('/cart') 
    }
}

export function authMiddleware(to, from, next) {
    const authStore = useAuthStore()
    if (!authStore.token) {
        return next('/login')
    }
    const currentTime = Math.floor(Date.now() / 1000)
    
    if (authStore.user && authStore.user.exp < currentTime) {
        alert("Your session has expired. Please log in again.")
        authStore.logout() 
        return next('/login')
    }

    next()
}