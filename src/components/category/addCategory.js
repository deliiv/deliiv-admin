import React, { useState } from "react";
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
import { useHistory } from "react-router";
import { toast } from 'react-toastify';

const AddService = (props) => {
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const [state, setState] = useState({
    name: "",
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
    setLoading(true);
    userService
      .addCategory(state)
      .then(() => {
        setLoading(false);
        setState({name:""})
        toast.success('Category created')
        setTimeout(() => {
          history.push("/category");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        toast.success('Error creating category')

      });
  };

  return (
    <>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <CFormGroup row>
                <CCol sm="12">
                  <CFormGroup>
                    <CLabel>Name</CLabel>
                    <CInput
                      type="text"
                      size="md"
                      value={state.name}
                      name="name"
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup>
                </CCol>
                {/* <CCol sm="12">
                  <CFormGroup>
                    <CLabel>Tag</CLabel>
                    <CInput
                      type="text"
                      size="md"
                      value={state.tag}
                      name="tag"
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup>
                </CCol> */}
              </CFormGroup>

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
                  Add
                </span>
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default AddService;
