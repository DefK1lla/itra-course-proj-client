import { $authHost, $host } from './index'
import { Token } from '../utils/storage'

export const registration = async ({ username, email, password }) => {
   const response = await $host.post('auth/registration', {
      username,
      email,
      password
   })
   Token.set(response.data.token)
   return response.data.user
}

export const login = async ({ username, password }) => {
   const response = await $host.post('auth/login', { username, password })
   Token.set(response.data.token)
   return response.data.user
}

export const authCheck = async () => {
   const response = await $authHost.get('auth/check')
   Token.set(response.data.token)
   return response.data.user
}
