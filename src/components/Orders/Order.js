import {
  CBadge,
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
  CSpinner,
} from "@coreui/react";
import React from "react";
import { formateDate, formatTime } from "../../utils/formatDate";
import { getBadge } from "../../utils/orderStatusColor";
import UserService from "../../services/user.service";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

const Order = (props) => {
  const [order, setOrder] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  React.useEffect(() => {
    setLoading(true);
    UserService.getSingleOrder(id)
      .then((res) => {
        setOrder(res.data.order[0]);
        setLoading(false);
        //console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
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
            {order && (
              <CCardBody>
                <p className="job-column">
                  <strong>Order Id</strong>
                  <span>{order.order_id}</span>
                </p>
                <p className="job-column">
                  <strong>Order Date</strong>
                  <span>
                    {formateDate(order.date_created)}{" "}
                    {formatTime(order.date_created)}
                  </span>
                </p>
                <p className="job-column">
                  <strong>Order Status</strong>
                  <span>
                    <CBadge
                      color={getBadge(order.status)}
                      style={{ padding: "8px", minWidth: "60px" }}
                    >
                      {order.status}
                    </CBadge>
                  </span>
                </p>
                <p className="job-column">
                  <strong>Description</strong>
                  <span>{order.description}</span>
                </p>
                <p className="job-column">
                  <strong>Frequunecy</strong>
                  <span>{order.frequency}</span>
                </p>
              </CCardBody>
            )}
          </CCard>
        </CCol>
        <CCol sm="12">
          <CCard>
            <CCardTitle
              className="p-3 m-0"
              style={{ backgroundColor: backgroundColor }}
            >
              Customer Details
            </CCardTitle>
            {order && order.customer ? (
              <CCardBody>
                <p className="job-column">
                  <strong>Name</strong>
                  <span>
                    <Link
                      to={{
                        pathname: `/customers/customer-${order.customer._id}`,
                      }}
                    >
                      {order.customer.fullname}
                    </Link>
                  </span>
                </p>
                <p className="job-column">
                  <strong>E-mail</strong>
                  <span>{order.customer.email}</span>
                </p>
                <p className="job-column">
                  <strong>Phone Number</strong>
                  <span>{order.customer.phone}</span>
                </p>
              </CCardBody>
            ) : (
              <span className="p-3">Not Available</span>
            )}
          </CCard>
        </CCol>
        <CCol sm="12">
          <CCard>
            <CCardTitle
              className="p-3 m-0"
              style={{ backgroundColor: backgroundColor }}
            >
              Serviceman Details
            </CCardTitle>
            {order && order.serviceman ? (
              <CCardBody>
                <p className="job-column">
                  <strong>Name</strong>
                  <span>{order.serviceman.name}</span>
                </p>
                <p className="job-column">
                  <strong>E-mail</strong>
                  <span>{order.serviceman.email}</span>
                </p>
                <p className="job-column">
                  <strong>Phone Number</strong>
                  <span>{order.serviceman.phone}</span>
                </p>
                <p className="job-column">
                  <strong> Address: </strong>
                  <span>{order.serviceman.address}</span>
                </p>
              </CCardBody>
            ) : (
              <span className="p-3">Not Available</span>
            )}
          </CCard>
        </CCol>
        <CCol sm="12">
          <CCard>
            <CCardTitle
              className="p-3 m-0"
              style={{ backgroundColor: backgroundColor }}
            >
              Bill Details
            </CCardTitle>
            {order && order.customer ? (
              <CCardBody>
                <p className="job-column">
                  <strong>Name</strong>
                  <span>{order.customer.fullname}</span>
                </p>
                <p className="job-column">
                  <strong>E-mail</strong>
                  <span>{order.customer.email}</span>
                </p>
                <p className="job-column">
                  <strong>Phone Number</strong>
                  <span>{order.customer.phone}</span>
                </p>
              </CCardBody>
            ) : (
              <span className="p-3">Not Available</span>
            )}
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Order;
