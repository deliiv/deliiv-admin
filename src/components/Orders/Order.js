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
import OrderDetails from "../Customers/OrderDetails";
import OrderPayload from "./OrderPayload";

const Order = (props) => {
  const [order, setOrder] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  const {item} = props.location.data
  React.useEffect(() => {
    console.log('>>>>>>>>',item)
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

      <OrderPayload item={item}/>
    </>
  );
};

export default Order;
