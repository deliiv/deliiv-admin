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
  CRow,
  CInput,CFormGroup,CLabel,CSelect
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const ViewProductModals = ({show, title, message, handleCancel, handleSuccess,modalColor, handleReasonChange,reasonValue, handleOnChangeAmount}) => {

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
              color={modalColor}
            >
              <CModalHeader closeButton>
                <CModalTitle>{title}</CModalTitle>
              </CModalHeader>
              <CModalBody>
                  {message}
                <CCol xs="4">
                  <CFormGroup>
                    <div style={{ display:"flex", flexDirection:"column" }}>
                      <CLabel htmlFor="creditReason">Name</CLabel>
                      <CLabel htmlFor="creditReason"><b>Reason</b></CLabel>
                    </div>                    
                  </CFormGroup>
                  <CFormGroup>
                    <div style={{ display:"flex", flexDirection:"column" }}>
                      <CLabel htmlFor="creditReason">Price</CLabel>
                      <CLabel htmlFor="creditReason"><b>Reason</b></CLabel>
                    </div>                    
                  </CFormGroup>
                  <CFormGroup>
                    <div style={{ display:"flex", flexDirection:"column" }}>
                      <CLabel htmlFor="creditReason">Discount Price</CLabel>
                      <CLabel htmlFor="creditReason"><b>Reason</b></CLabel>
                    </div>                    
                  </CFormGroup>
                  <CFormGroup>
                    <div style={{ display:"flex", flexDirection:"column" }}>
                      <CLabel htmlFor="creditReason">Description</CLabel>
                      <CLabel htmlFor="creditReason"><b>Reason</b></CLabel>
                    </div>                    
                  </CFormGroup>
                  <CFormGroup>
                    <div style={{ display:"flex", flexDirection:"column" }}>
                      <CLabel htmlFor="creditReason">Region</CLabel>
                      <CLabel htmlFor="creditReason"><b>Reason</b></CLabel>
                    </div>                    
                  </CFormGroup>
                  <CFormGroup>
                    <div style={{ display:"flex", flexDirection:"column" }}>
                      <CLabel htmlFor="creditReason">Region</CLabel>
                      <CLabel htmlFor="creditReason"><b>Reason</b></CLabel>
                    </div>                    
                  </CFormGroup>
                </CCol>
                      
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

export default ViewProductModals
