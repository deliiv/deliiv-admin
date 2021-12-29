import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CLabel,
  CInput,
  CFormGroup,
  CSelect,
  CButton,
  CSpinner,
} from "@coreui/react";
import checkEmptyProperties from "src/utils/checkEmptyProperties";
import { emailValidation } from "src/utils/validations";
import userService from "src/services/user.service";

const AddSeller = (props) => {
  const services = useSelector((state) => state.services.serviceNameToIdLink);
  const history = useHistory();

  const [loading, setLoading] = React.useState(false);

  const [state, setState] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmpassword: "",
    //email: "",
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
      .addSeller(state)
      .then(() => {
        setLoading(false);
        history.push("/seller");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CRow>
      <CCol>
        <CCard>
          {/* {services && ( */}
            <CCardBody>
              <CFormGroup row>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel>First Name</CLabel>
                    <CInput
                      type="text"
                      size="md"
                      value={state.firstName}
                      name="firstName"
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel>Last Name</CLabel>
                    <CInput
                      type="text"
                      size="md"
                      value={state.lastName}
                      name="lastName"
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel>Phone</CLabel>
                    <CInput
                      type="tel"
                      size="md"
                      value={state.phone}
                      name="phone"
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel>Email</CLabel>
                    <CInput
                      type="email"
                      size="md"
                      value={state.email}
                      name="email"
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup>
                </CCol>
                {/* <CCol sm="6">
                  <CFormGroup>
                    <CLabel>Address</CLabel>
                    <CInput
                      type="text"
                      size="md"
                      value={state.address}
                      name="address"
                      onChange={inputChangeHandler}
                    />
                  </CFormGroup>
                </CCol> */}
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel>Password</CLabel>
                    <CInput
                      type="password"
                      size="md"
                      value={state.password}
                      name="password"
                      onChange={inputChangeHandler}
                      secureEntry
                    />
                  </CFormGroup>
                </CCol>
                <CCol sm="6">
                  <CFormGroup>
                    <CLabel>Confirm Password</CLabel>
                    <CInput
                      type="password"
                      size="md"
                      value={state.confirmpassword}
                      name="confirmpassword"
                      onChange={inputChangeHandler}
                      secureEntry
                    />
                  </CFormGroup>
                </CCol>
                {/* <CCol sm="6">
                  <CFormGroup>
                    <CLabel>Service Type</CLabel>
                    <CSelect
                      value={state.serviceType}
                      name="serviceType"
                      onChange={inputChangeHandler}
                    >
                      <option value="">--Select a Service Type--</option>
                      {/* <option value={services["Generator"]}>Generator</option>
                      <option value={services["AC repair"]}>AC Repairs</option> */}
                    {/* </CSelect> */}
                  {/* </CFormGroup> */}
                {/* </CCol>  */}
             
              </CFormGroup>
              <CButton
                style={{ position: "relative" }}
                size="md"
                color="primary"
                className="mb-4 float-md-right"
                disabled={
                  checkEmptyProperties(state) ||
                  emailValidation(state.email) ||
                  state.phone.length < 11
                }
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
                  Add Seller
                </span>
              </CButton>
            </CCardBody>
          {/* )} */}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddSeller;
