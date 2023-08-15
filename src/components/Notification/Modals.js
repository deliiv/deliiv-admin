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
  CInput
} from '@coreui/react'
import { DocsLink } from 'src/reusable'

const Modals = ({ show, title, message, handleCancel, handleSuccess, modalColor, amount, handleOnChangeAmount }) => {



  return (
    <CRow>
      <CCol>
        <CCard>
          <CModal
            show={show}
            onClose={handleCancel}
            color={modalColor}>
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

export default Modals
