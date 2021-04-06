import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

export const apiKey = process.env.VUE_APP_API_KEY
export const apiSecret = process.env.VUE_APP_API_SECRET
const apiUrl = isProduction ? process.env.VUE_APP_API_URL : 'http://localhost:8080/api/v1'

export const request = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
})

export const getExpires = () => Math.round(new Date().getTime() / 1000) + 60
