import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { setToken } from '../../utils/tokenStorage'

import './index.css'

export default function Login() {
  const [file, setFile] = useState()
  const [uploading, setUploading] = useState(false)

  const [form] = Form.useForm()

  const navigate = useNavigate()

  const handleSubmitForm = () => {
    const { password } = form.getFieldsValue()

    const formData = new FormData()

    formData.append('file', file)
    formData.append('passphrase', password)

    setUploading(true)

    fetch('http://127.0.0.1:5000/login', { method: 'POST', body: formData })
      .then(async (res) => {
        if (res.status !== 200) {
          message.error('Помилка при зчитуванні файлу')
        } else {
          const { token } = await res.json()

          setToken(token)
          message.success('Успішно')
          navigate('/')
        }
      })
      .finally(() => {
        setUploading(false)
      })
  }

  const props = {
    onRemove: () => {
      setFile(null)
    },
    beforeUpload: (file) => {
      setFile(file)

      return false
    },
    file,
    multiple: false,
    showUploadList: false,
  }

  return (
    <Form className='login-form' form={form} name='loginForm' layout='vertical'>
      <Form.Item name='file' label='Файл'>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>{file ? file.name : 'Select File'}</Button>
        </Upload>
      </Form.Item>
      <Form.Item name='password' label='Пароль до файлу'>
        <Input type='text' name='password' id='password' placeholder='Введіть пароль до файлу' />
      </Form.Item>
      <Form.Item name='submit'>
        <Button disabled={!file} key='submit' type='primary' onClick={handleSubmitForm}>
          Увійти
        </Button>
      </Form.Item>
      {uploading ? 'Опрацьовуємо запит...' : <></>}
    </Form>
  )
}
