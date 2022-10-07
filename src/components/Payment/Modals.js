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

  console.log('====', paymentDetail)


  useEffect(() => {
    if (dId) {

      setCatName(dId.document_name ? dId.document_name : '')
    }
  }, [dId])
  const [selectedImage, setSelectedImage] = React.useState('');
  const [catName, setCatName] = React.useState('');


  const handleImageUpload = () => {
    console.log('}}}}}====', paymentDetail)
    let form = new FormData();
    form.append('file', selectedImage);
    form.append('userId', paymentDetail.agency? paymentDetail.agency._id: paymentDetail.user._id);
    form.append('witdrawal_request', paymentDetail._id);
    form.append('remarks', catName);

    userService
      .uploadReceiptDocument(form)
      .then(() => {

        toast.success('Receipt uploaded');

        let data={
          wId:paymentDetail._id,
          status: "completed"
        }


      userService.updateWithdrawalRequest(data)
      .then((res) => {
        toast.success('Request updated');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        toast.error('Error updating request, please try again later');
        console.log(error);
      });

      })
      .catch((error) => {
        console.log(error);
      });
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
              {message}

              <CFormGroup>
                <CLabel htmlFor="creditReason">Document Name</CLabel>
                <CInput
                  type="text"
                  placeholder="Remarks"
                  value={catName}
                  onChange={e => setCatName(e.target.value)}
                  style={{ marginTop: '20px', marginBottom: '20px' }}
                />
              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="region">Document Image</CLabel>
                <br />
                {
                  dId && dId.document_image && <div style={{ display: 'flex', flexDirection: 'column', marginRight: 10 }}>
                  <img
                    src={dId && dId.document_image}
                    width={150}
                    height={150}
                  />
                  {/* {editMode && (<button onClick={()=>handleImageDelete(item.id)} style={{backgroundColor:"red" }}>Delete</button>)} */}
                </div>

                }

                <div>
                  {selectedImage && (
                    <div style={{ marginTop: 20 }}>
                      <img
                        alt="not fount"
                        width={'150px'}
                        src={URL.createObjectURL(selectedImage)}
                        style={{ marginBottom: 20 }}
                      />
                      <br />
                      <CButton
                        color="warning"
                        size="sm"
                        className="mx-1"
                        onClick={() => setSelectedImage(null)}>Remove</CButton>
                      <CButton
                        // variant="outline"
                        color="success"
                        size="sm"
                        className="mx-1"
                        onClick={handleImageUpload}
                      >
                        Upload
                      </CButton>
                    </div>
                  )}
                  <br />

                  <br />
                  <input
                    type="file"
                    accept="image/*"
                    name="myImage"
                    onChange={(event) => {
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                </div>
              </CFormGroup>

            </CModalBody>

          </CModal>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Modals;
