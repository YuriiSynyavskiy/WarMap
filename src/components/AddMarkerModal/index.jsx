import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap'
import React from 'react'

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
      <Modal isOpen={isOpen}>
        <Form onSubmit={handleSubmitForm}>
          <ModalHeader>New marker</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input type='text' name='name' id='name' placeholder='Enter marker name' />
            </FormGroup>
            <FormGroup>
              <Label for='description'>Description</Label>
              <Input type='textarea' name='description' id='description' placeholder='Enter description here' />
            </FormGroup>
            <FormGroup>
              <Label for='positionCount'>Position Count</Label>
              <Input type='number' name='positionCount' id='positionCount' placeholder='Enter position count'/>
            </FormGroup>
            <FormGroup>
              <Label for='positionType'>Position Type</Label>
              <Input type='select' name='positionType' style={{display: 'block', borderRadius: '6px', borderColor: 'lightgrey', width: '100%', padding: '8px 0'}}>
                <option value='1'>
                  Zhoska position
                </option>
                <option value='2'>
                  Slaba position
                </option>
                <option value='3'>
                  Huyova position
                </option>
              </Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' color='primary'>
              Save
            </Button>
            <Button type='reset' color='secondary'>
              Discard
            </Button>
            <Button color='danger' onClick={setClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  )
}

export default MapModal
