import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Modals = ({show, title, message, handleCancel, handleSuccess}) => {

  const [modal, setModal] = useState(true)
  const [large, setLarge] = useState(false)
  const [small, setSmall] = useState(false)
  const [primary, setPrimary] = useState(false)
  const [success, setSuccess] = useState(false)
  const [warning, setWarning] = useState(false)
  const [danger, setDanger] = useState(false)
  const [info, setInfo] = useState(false)

  return (
    <CRow>
      <CCol>
        <CCard>


        <CModal 
              show={show} 
              onClose={handleCancel}
              color="primary"
            >
              <CModalHeader closeButton>
                <CModalTitle>{title}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                  {message}
              </CModalBody>
              <CModalFooter>
                <CButton color="warning" onClick={handleSuccess}>Go ahead</CButton>{' '}
                <CButton color="secondary" onClick={handleCancel}>Cancel</CButton>
              </CModalFooter>
            </CModal>
 </CCard>
      </CCol>
    </CRow>
  )
}

export default Modals
