import React from "react";
import Logo from "../../../assets/images/logo.svg";
import AuthService from "../../../services/auth.service";
import LocalStorage from "../../../utils/localstorage";
import ExpirySession from "../../../utils/expirysession";
import { useSelector } from "react-redux";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSpinner,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const Login = (props) => {
  const [formIsValid, setFormIsValid] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

  const inputChangedHandler = (e) => {
    let { name, value } = e.target;
    let input = {
      ...state,
      [name]: value,
    };
    setState(input);
  };

  const validateFormHandler = () => {
    let updatedState = { ...state };
    if (
      updatedState.email.trim().includes("@") &&
      updatedState.password.trim().length > 6
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  };

  const loginHandler = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { email, password } = state;

    AuthService.doLogin({ email, password })
      .then((res) => {
        setLoading(false);
        ExpirySession.set("access", res.data.token);
        LocalStorage.set("user_data", res.data.user);
        props.history.push("/");
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          setError(error.response.data.detail || error.response.data.message);
        }
      });
  };

  React.useEffect(() => {
    validateFormHandler();
  }, [state]);

  //background color from global store
  const backgroundColor = useSelector((state) => state.UI.backgroundColor);

  return (
    <div className="c-app c-default-layout c-dark-theme flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={loginHandler}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Email"
                        autoComplete="email"
                        name="email"
                        value={state.email}
                        onChange={inputChangedHandler}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        autoComplete="new-password"
                        value={state.password}
                        onChange={inputChangedHandler}
                      />
                    </CInputGroup>
                    <CRow className="p-0 m-0">
                      <CCol xs="6" className="p-0 m-0">
                        {error && <p style={{ color: "tomato" }}>{error}</p>}
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          style={{
                            backgroundColor: backgroundColor,
                            color: "#fff",
                          }}
                          className="px-3"
                          type="submit"
                          disabled={!formIsValid}
                        >
                          {loading && <CSpinner size="sm" />}
                          <span className="ml-2">Login</span>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center center-flex">
                  <div>
                    <img src={Logo} alt="fix 234 logo" />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
