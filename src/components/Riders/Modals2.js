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
  dId,
  handleOnChangeCatname,
  image_url,
  id
}) => {

  useEffect(() => {
    if (dId) {

      setCatName(dId.document_name ? dId.document_name : '')
    }
  }, [dId])
  const [selectedImage, setSelectedImage] = React.useState('');
  const [catName, setCatName] = React.useState('');


  const handleImageUpload = () => {
    if (!catName) {
      toast.error('Document name required')
    }
    let form = new FormData();
    form.append('file', selectedImage);
    form.append('document_name', catName);
    form.append('rider_id', id);
    form.append('dId', dId && dId._id);

    console.log('DNAME: ', catName)
    console.log('MID: ', id)

    userService
      .uploadDocument(form)
      .then(() => {

        toast.success('Image uploaded');
        setTimeout(() => {
        	window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
