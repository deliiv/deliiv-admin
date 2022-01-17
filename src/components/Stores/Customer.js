import React from "react";
import UserService from "../../services/user.service";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
  CSpinner,
} from "@coreui/react";

const Customer = (props) => {
  let { id } = useParams();
  const [customer, setCustomer] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    UserService.getSingleCustomer(id)
      .then((res) => {
        setCustomer(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //UI color from ui store
  const backgroundColor = useSelector((state) => state.UI.backgroundColor);

  return (
    <>
      {loading && <CSpinner className="loader" grow size="lg" />}
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardTitle
              className="p-3 m-0"
              style={{ backgroundColor: backgroundColor }}
            >
              Job Details
            </CCardTitle>
            {customer && (
              <CCardBody>
                <p className="job-column">
                  <strong>Name</strong>
                  <span>{customer.user.fullname}</span>
                </p>
                <p className="job-column">
                  <strong>E-mail</strong>
                  <span>{customer.user.email}</span>
                </p>
                <p className="job-column">
                  <strong>Phone Number</strong>
                  <span>{customer.user.phone}</span>
                </p>
                <p className="job-column">
                  <strong> Address: </strong>
                  <span>{customer.user.address}</span>
                </p>
              </CCardBody>
            )}
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Customer;
