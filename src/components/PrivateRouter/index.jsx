import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

import { getToken } from '../../utils/tokenStorage'

export default function PrivateRouter({ children }) {
  const navigate = useNavigate()

  useEffect(() => {
    if (!getToken()) {
      message.error('Сессія відсутня')
      navigate('/login')
    }
  }, [])

  if (!getToken()) return <></>

  return children
}
