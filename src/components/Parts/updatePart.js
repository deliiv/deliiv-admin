import React, { useState } from "react";
import {
  CCol,
  CCardBody,
  CFormGroup,
  CLabel,
  CInput,
  CButton,
  CSpinner,
} from "@coreui/react";
import checkEmptyProperties from "src/utils/checkEmptyProperties";
import userService from "src/services/user.service";

const UpdatePart = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = useState({
    title: props.title,
    price: props.price,
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

  React.useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        title: props.title,
        price: props.price,
      };
    });
  }, [props.title, props.price]);

  const submitForm = () => {
    setLoading(true);
    const data = { ...state, price: +state.price };
    userService
      .updatePart(data, props.id)
      .then(() => {
        setLoading(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CCardBody>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
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
              <CLabel>Price</CLabel>
              <CInput
                type="number"
                size="md"
                value={state.price}
                name="price"
                onChange={inputChangeHandler}
              />
            </CFormGroup>
          </CCol>

          <CButton
            style={{ position: "relative" }}
            size="md"
            color="warning"
            className="mb-4 mr-3 float-right"
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
            <span className={`${loading && "text-primary"}`}>Update Part</span>
          </CButton>
        </form>
      </CCardBody>
    </>
  );
};

export default UpdatePart;
