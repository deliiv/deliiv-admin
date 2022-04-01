import React from "react";
import UserService from "../../services/user.service";
import { useParams } from "react-router-dom";
import OrderPayload from "./OrderPayload";

const Order = (props) => {
  const [order, setOrder] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [localItem, setLocalItem] = React.useState(false);
  const { id } = useParams();
  // const {item} = props.location.data

  React.useEffect(() => {
    setLoading(true);
    UserService.getSingleOrderDetails(id)
      .then((res) => {
        setOrder(res.data.order[0]);
        setLocalItem(res.data.order)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>

      <OrderPayload item={localItem}/>
    </>
  );
};

export default Order;
