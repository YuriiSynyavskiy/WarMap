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
      target: { name },
    } = e

    console.log(name.value)

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
