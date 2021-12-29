import React from 'react'
import {
  CButton,
  CCard,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow
} from '@coreui/react'

const Modals2 = ({show, title, message, handleCancel, handleSuccess}) => {


  return (
    <CRow>
      <CCol>
        <CCard>


        <CModal 
              show={show} 
              onClose={handleCancel}
              color="success"
            >
              <CModalHeader closeButton>
                <CModalTitle>{title}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                  {message}
              </CModalBody>
              <CModalFooter>
                <CButton color="success" onClick={handleSuccess}>Go ahead</CButton>{' '}
                <CButton color="secondary" onClick={handleCancel}>Cancel</CButton>
              </CModalFooter>
            </CModal>
 </CCard>
      </CCol>
    </CRow>
  )
}

export default Modals2
