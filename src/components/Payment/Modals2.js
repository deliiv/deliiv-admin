import React, { useEffect } from 'react';
import {
  CButton,
  CCard,
  CCol,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CInput,
  CFormGroup,
  CLabel
} from '@coreui/react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import userService from 'src/services/user.service';

const Modals2 = ({
  show,
  title,
  message,
  handleCancel,
  handleSuccess,
  modalColor,
  dId }) => {

  useEffect(() => {
    if (dId) {

      setCatName(dId.document_name ? dId.document_name : '')
    }
  }, [dId])
  const [catName, setCatName] = React.useState('');


  return (
    <CRow>
      <CCol>
        <CCard>
          <CModal show={show}
            onClose={handleCancel}
            color={modalColor}>
            <CModalHeader closeButton>
              <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {message}
            </CModalBody>
            <CModalFooter>
              <CButton color="success" onClick={handleSuccess}>
                Go ahead
              </CButton>{' '}
              <CButton color="secondary" onClick={handleCancel}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Modals2;
