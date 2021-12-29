import React, { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CSpinner,
} from "@coreui/react";
import checkEmptyProperties from "src/utils/checkEmptyProperties";
import userService from "src/services/user.service";
import { useHistory, useLocation, useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

import './style.css';


const UpdateService = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const history = useHistory();
  const location = useLocation();
  const { id } = useParams();
  const [state, setState] = useState({
    title: location.state ? location.state.title : "",
    tag: location.state ? location.state.tag : "",
  });

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitForm = () => {
    const data = {
      title: state.title,
    };
    setLoading(true);
    userService
      .updateService(data, id)
      .then(() => {
        setLoading(false);
        history.push("/services");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const changeCategoryImage = () => {
    setLoading(true);

    const form = new FormData();
    form.append('image', selectedImage)
    form.append('category', id)
    setLoading(true);
    userService
      .uploadCategoryImage(form)
      .then(data => {
        setLoading(false);
        toast.success("Image Uploaded")
        setTimeout(() => {
          history.push("/category");
        }, 2000);

      })
      .catch((error) => {
        console.log(error);
        setLoading(true);
        toast.error("Error uploading image")

      });
  };

  useEffect(() => {
    if (!location.state) {
      setRedirect(true);
    }
  }, []);
  useEffect(() => {
    console.log('PPPPP**************', location)
  }, []);

  return (
    <>
      {redirect && <Redirect to="/services" />}
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup>
                    <CLabel>Title</CLabel>
                    <CInput
                      type="text"
                      size="md"
                      value={state.title}
                      name="title"
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="12">
                  <CFormGroup>
                    <CLabel>Tag</CLabel>
                    <CInput
                      type="text"
                      size="md"
                      value={state.tag}
                      name="tag"
                      disabled
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup>
                </CCol>
              </CFormGroup>
              <div style={{ display:"flex", flexDirection:"column" }}>
              {selectedImage && <img alt="src" 
                  width={"250px"} 
                  src={selectedImage &&  URL.createObjectURL(selectedImage)} 
                  />}
              <input
		          	type="file" name="myImage" onChange={(event) => {
			          setSelectedImage(event.target.files[0]);
			        }}
		          />
              <div style={{ display:"flex", flexDirection:"row", just:"space-around", marginTop:20 }}>
              {selectedImage && <button className='button-upload' onClick={changeCategoryImage}>Upload Image</button>}
              {selectedImage && <button className="button-remove" onClick={()=>setSelectedImage(null)}>Remove</button>}
              {loading && <CSpinner size="sm" />}

              </div>
              
            </div>

              <CButton
                style={{ position: "relative" }}
                size="md"
                color="primary"
                className="mb-4 float-md-right"
                disabled={checkEmptyProperties(state)}
                onClick={submitForm}
              >
                {loading && (
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <CSpinner size="sm" />
                  </span>
                )}
                <span className={`${loading && "text-primary"}`}>
                  Update Category
                </span>
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default UpdateService;
