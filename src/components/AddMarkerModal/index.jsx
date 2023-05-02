import './index.css'
import React from 'react'
import Images from '../../images/'
import { Button, Form, Input, Select, Modal, Switch, InputNumber } from 'antd'


const { TextArea } = Input

const MapModal = ({ isOpen, setClose, markerPosition, createMarker }) => {
  const handleSubmitForm = (e) => {
    e.preventDefault()

    const {
      target: { name, description, positionCount, positionType },
    } = e

    createMarker({ name: name.value, position: markerPosition })

    setClose()
  }

  return (
    <div>
      <Modal 
        open={isOpen} 
        title={<div style={{textAlign: 'center'}}>Нова позиція</div>}
        footer={[
          <Button key="back">
            Відмінити
          </Button>,
          <Button key="submit" type="primary">
            Зберегти позицію
          </Button>]}
      >
      <Form
        name="marker"
        layout="vertical">
      <Form.Item
      label="Ім'я позиції"
      valuePropName="name"
      rules={[{ required: true, message: 'Please input your username!' }]}>
      <Input type='text' name='name' id='name' placeholder="Введіть ім'я позиції" />
      </Form.Item>
      <Form.Item label="Ворожа позиція" valuePropName="enemy">
          <Switch />
      </Form.Item>
      <Form.Item
      name="positionType"
      label="Тип позиції"
      valuePropName="positionType"
      >
      <Select
      defaultValue="Піхота"
      onChange={(value) => console.log(value) }
      >
        {Images.map((image, index) => (
            <Select.Option key={index} value={index}>
            <p>{image.name}</p>
            <img src={image.image} className='image-position'/>
            </Select.Option>
        ))}
      </Select>
      </Form.Item>
      <Form.Item  
        name="positionCount"
        label="Кількість"
        valuePropName="positionCount">
          <InputNumber />
      </Form.Item>
      <Form.Item  
        name="description"
        label="Додатковий опис"
        valuePropName="description">
          <TextArea autoSize={{minRows: 3, maxRows: 6}}  />
      </Form.Item>
      </Form>
      </Modal>
    </div>
  )
}

export default MapModal
