import React from 'react'
import { Button, Form, Input, Select, Modal, Switch, InputNumber, Radio } from 'antd'

import Images from '../../images'

import './index.css'

const { TextArea } = Input

const PositionModal = ({
  isOpen,
  positionToEdit,
  closeModal,
  positionCoords,
  fetchPositions,
  stopEditing,
}) => {
  const [form] = Form.useForm()

  const handleSubmitForm = () => {
    const { name, enemy, type, count, description } = form.getFieldsValue()

    const newPosition = {
      name,
      enemy,
      type,
      count,
      description,
    }

    if (positionToEdit) {
      newPosition.id = positionToEdit.id
      newPosition.lat = positionToEdit.lat
      newPosition.lng = positionToEdit.lng
    } else {
      newPosition.lat = positionCoords.lat
      newPosition.lng = positionCoords.lng
    }

    const requestOptions = {
      method: positionToEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPosition),
    }
    fetch('http://127.0.0.1:5000/position', requestOptions)
      .then((response) => response.json())
      .then(() => fetchPositions())

    form.resetFields()

    if (positionToEdit) stopEditing()

    closeModal()
  }

  const handleCloseModal = () => {
    if (positionToEdit) stopEditing()
    closeModal()
  }

  const onChangeType = (e) => {
    console.log(e)
  }
  return (
    <div>
      <Modal
        open={isOpen}
        title={<div style={{ textAlign: 'center' }}>Нова позиція</div>}
        footer={[
          <Button key='decline' onClick={handleCloseModal}>
            Відмінити
          </Button>,
          <Button key='submit' type='primary' onClick={handleSubmitForm}>
            Зберегти позицію
          </Button>,
        ]}
        closable={false}
      >
        <Form
          form={form}
          name='marker'
          layout='vertical'
          initialValues={
            positionToEdit || { name: '', enemy: false, type: 1, count: 1, description: '' }
          }
        >
          <Form.Item name="landmark" className='ant-select-item-option-content'>
          <Radio.Group
            options={[{ label: 'Позиція', value: 'position' }, { label: 'Орієнтир', value: 'landmark' }]}
            onChange={onChangeType}
            optionType="button"
            buttonStyle="solid"
            defaultValue="position"
            style={{marginTop: '10px'}}
          />
          </Form.Item>
          <Form.Item name='name' label="Ім'я позиції">
            <Input type='text' name='name' id='name' placeholder="Введіть ім'я позиції" />
          </Form.Item>
          <Form.Item name='enemy' label='Ворожа позиція'>
            <Switch valuePropName='enemy' />
          </Form.Item>
          <Form.Item name='type' label='Тип позиції'>
            <Select valuePropName='type'>
              {Images.map((image, index) => (
                <Select.Option key={index} value={index}>
                  <p>{image.name}</p>
                  <img src={image.image} className='image-position' alt='' />
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='count' label='Кількість'>
            <InputNumber min={1} valuePropName='count' />
          </Form.Item>
          <Form.Item name='description' label='Додатковий опис'>
            <TextArea autoSize={{ minRows: 3, maxRows: 6 }} valuePropName='description' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PositionModal
