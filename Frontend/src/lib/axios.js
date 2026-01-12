import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    withCredentials:true // browser will send the cookie to the server automatically on every single request

})

// Add request interceptor to include Clerk token
axiosInstance.interceptors.request.use(async (config) => {
    try {
        const clerk = window.Clerk
        if (clerk && clerk.session) {
            const token = await clerk.session.getToken()
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }
    } catch (error) {
        console.error('Error getting token:', error)
    }
    return config
})

export default axiosInstance