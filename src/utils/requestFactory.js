import { getToken, removeToken } from './tokenStorage'

const API = 'http://127.0.0.1:5000/'

export default function request({ endpoint, method, data, headers }) {
  return fetch(`${API}${endpoint}`, {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: { 'x-access-token': getToken(), 'Content-Type': 'application/json', ...headers },
  }).then((res) => {
    if (res.status === 401) {
      removeToken()
      window.location = '/login'
      return
    }

    return res.json()
  })
}
