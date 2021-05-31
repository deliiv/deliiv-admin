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
import LocalStorage from "../../utils/localstorage";
import { useSelector } from "react-redux";

const Order = (props) => {
  const [order, setOrder] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    setLoading(true);
    let orderRouteState;
    if (props.location.state) {
      //localStorage.setItem('orderRouteState', JSON.stringify(this.props.location.state))
      LocalStorage.set("orderRouteState", props.location.state);
      orderRouteState = props.location.state;
    } else {
      orderRouteState = LocalStorage.get("orderRouteState");
      //if(orderRouteState) orderRouteState = JSON.parse(orderRouteState)
    }

    if (orderRouteState) {
      //use orderRouteState ahead
      //setOrder(orderRouteState);
      UserService.getSingleOrder(orderRouteState)
        .then((res) => {
          setOrder(res.data.order[0]);
          setLoading(false);
          //console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //Prompt no data.
      props.history.push("/");
    }
  }, []);

  //UI color from ui store
  const backgroundColor = useSelector((state) => state.UI.backgroundColor);

  return (
    <>
      {loading && <CSpinner className="loader" grow size="lg" />}
      <CRow>
        <CCol sm="6">
          <CCard>
            <CCardTitle
              className="p-3 m-0"
              style={{ backgroundColor: backgroundColor }}
            >
              Order Details
            </CCardTitle>
            {order && (
              <CCardBody>
                <p className="space-out">
                  <strong>Order Id:</strong>
                  <span>{order.order_id}</span>
                </p>
                <p className="space-out">
                  <strong>Order Date:</strong>
                  <span>
                    {formateDate(order.date_created)}{" "}
                    {formatTime(order.date_created)}
                  </span>
                </p>
                <p className="space-out">
                  <strong>Order Status:</strong>
                  <span>
                    <CBadge
                      color={getBadge(order.status)}
                      style={{ padding: "8px", minWidth: "60px" }}
                    >
                      {order.status}
                    </CBadge>
                  </span>
                </p>
              </CCardBody>
            )}
          </CCard>
        </CCol>
        <CCol sm="6">
          <CCard>
            <CCardTitle
              className="p-3 m-0"
              style={{ backgroundColor: backgroundColor }}
            >
              Customer Details
            </CCardTitle>
            {order && order.customer ? (
              <CCardBody>
                <p className="space-out">
                  <strong>Name:</strong>
                  <span>{order.customer.fullname}</span>
                </p>
                <p className="space-out">
                  <strong>E-mail:</strong>
                  <span>{order.customer.email}</span>
                </p>
                <p className="space-out">
                  <strong>Phone Number:</strong>
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
