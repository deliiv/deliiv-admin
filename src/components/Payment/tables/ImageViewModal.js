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
import { saveAs } from "file-saver";


const Modals = ({
  show,
  title,
  message,
  handleCancel,
  handleSuccess,
  modalColor,
  dId,
  handleOnChangeCatname,
  image_url,
  id,
  paymentDetail
}) => {

  const saveFile = () => {
    console.log('XXXX: ', image_url)
    saveAs(image_url, "payment receipt.png");
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          <CModal show={show} onClose={handleCancel} color={modalColor}>
            <CModalHeader closeButton>
              <CModalTitle>{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              <img
                src={image_url}
                width={'100%'}
                height={'100%'}
              />
              <CFormGroup>
              </CFormGroup>
            </CModalBody>
            <CModalFooter>
              <CButton color="success" onClick={saveFile}>
                Download
              </CButton>{' '}

            </CModalFooter>
          </CModal>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Modals;
