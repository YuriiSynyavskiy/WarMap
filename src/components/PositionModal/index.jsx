import React, { useState } from 'react'
import { Button, Form, Input, Select, Modal, Switch, Radio } from 'antd'

import { allyImages, countsAlly } from '../../images'

import request from '../../utils/requestFactory'

import './index.css'

const { TextArea } = Input

const POSITION_TYPES = {
  POSITION: false,
  LANDMARK: true,
}

const PositionModal = ({
  isOpen,
  positionToEdit,
  closeModal,
  positionCoords,
  fetchPositions,
  stopEditing,
}) => {
  const [isLandmark, setIsLandmark] = useState(
    positionToEdit ? positionToEdit.isLandmark : POSITION_TYPES.POSITION,
  )

  const [form] = Form.useForm()

  const handleSubmitForm = () => {
    const { name, enemy, type, count, description } = form.getFieldsValue()

    const newPosition = isLandmark
      ? {
          name,
          enemy: false,
          type: 0,
          count: 0,
          description,
          isLandmark,
        }
      : {
          name,
          enemy,
          type,
          count,
          description,
          isLandmark,
        }

    if (positionToEdit) {
      newPosition.id = positionToEdit.id
      newPosition.lat = positionToEdit.lat
      newPosition.lng = positionToEdit.lng
    } else {
      newPosition.lat = positionCoords.lat
      newPosition.lng = positionCoords.lng
    }

    request({
      endpoint: 'position',
      method: positionToEdit ? 'PUT' : 'POST',
      data: newPosition,
    }).then(() => fetchPositions())

    form.resetFields()

    if (positionToEdit) stopEditing()

    closeModal()
  }

  const handleCloseModal = () => {
    if (positionToEdit) stopEditing()
    closeModal()
  }

  const onChangePositionType = (e) => setIsLandmark(e.target.value)

  return (
    <div>
      <Modal
        open={isOpen}
        title={
          <div style={{ textAlign: 'center' }}>
            {positionToEdit ? 'Редагувати позицію' : 'Нова позиція'}
          </div>
        }
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
            positionToEdit || {
              name: '',
              enemy: false,
              type: 1,
              count: 0,
              description: '',
              isLandmark: false,
            }
          }
        >
          {!positionToEdit && (
            <Form.Item name='isLandmark' className='ant-select-item-option-content'>
              <Radio.Group
                options={[
                  { label: 'Позиція', value: POSITION_TYPES.POSITION },
                  { label: 'Орієнтир', value: POSITION_TYPES.LANDMARK },
                ]}
                onChange={onChangePositionType}
                optionType='button'
                buttonStyle='solid'
                defaultValue='position'
                style={{ marginTop: '10px' }}
              />
            </Form.Item>
          )}
          <Form.Item name='name' label="Ім'я позиції">
            <Input type='text' name='name' id='name' placeholder="Введіть ім'я позиції" />
          </Form.Item>
          {!isLandmark && (
            <>
              <Form.Item valuePropName='checked' name='enemy' label='Ворожа позиція'>
                <Switch />
              </Form.Item>
              <Form.Item name='type' label='Тип позиції'>
                <Select>
                  {allyImages.map(({ image, label }, index) => (
                    <Select.Option key={index} value={index}>
                      <p>{label}</p>
                      <img src={image} className='image-position' alt='' />
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name='count' label='Кількість'>
                <Select>
                  {countsAlly.map(({ image, label }, index) => (
                    <Select.Option key={index} value={index}>
                      <p>{label}</p>
                      <img src={image} alt='' />
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </>
          )}
          <Form.Item name='description' label='Додатковий опис'>
            <TextArea autoSize={{ minRows: 3, maxRows: 6 }} valuePropName='description' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default PositionModal
