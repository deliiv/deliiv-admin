import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import React, { lazy } from "react";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { getBadge } from "../../utils/orderStatusColor";

const WidgetsDropdown = lazy(() =>
  import("../../views/widgets/WidgetsDropdown")
);

const Orders = (props) => {
  //route match
  const { path, url } = useRouteMatch();

  //Orders
  const orders = useSelector((state) => state.orders.orders);
  const totalOrders = useSelector((state) => state.orders.totalOrders);
  const completedOrders = useSelector((state) => state.orders.completedOrders);
  const pendingOrders = useSelector((state) => state.orders.pendingOrders);

  const fields = [
    { key: "order_id", label: "Order Id" },
    "order_date",
    {
      key: "customername",
      _style: { minWidth: "15%" },
      label: "Customer Name",
    },
    {
      key: "customernumber",
      _style: { minWidth: "15%" },
      label: "Customer Number",
    },
    {
      key: "customeremail",
      _style: { minWidth: "15%" },
      label: "Customer Email",
    },
    {
      key: "amount",
      _style: { minWidth: "1%" },
    },
    { key: "status", _style: { minWidth: "10%" } },
    { key: "view", label: "" },
  ];

  const widgetList = [
    {
      title: "All Orders",
      totalAmount: totalOrders.toString() || "0",
    },
    {
      title: "Completed Orders",
      totalAmount: completedOrders.toString() || "0",
    },
    { title: "Pending Orders", totalAmount: pendingOrders.toString() || "0" },
  ];

  return (
    <>
      <WidgetsDropdown widgetList={widgetList} />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {orders && (
                <CDataTable
                  items={orders}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  columnFilter
                  hover
                  pagination
                  table-filter
                  cleaner
                  scopedSlots={{
                    order_id: (order) => <td>{order.order_id}</td>,
                    order_date: (order) => (
                      <td>
                        {formateDate(order.date_created)}{" "}
                        {formatTime(order.date_created)}
                      </td>
                    ),
                    customername: (order) => (
                      <td>{order.customer ? order.customer.fullname : null}</td>
                    ),
                    customernumber: (order) => (
                      <td>{order.customer ? order.customer.phone : null}</td>
                    ),
                    customeremail: (order) => (
                      <td>{order.customer ? order.customer.email : null}</td>
                    ),
                    amount: (order) => <td>{order.service.price}</td>,
                    status: (order) => (
                      <td>
                        <CBadge
                          color={getBadge(order.status)}
                          style={{ padding: "8px", minWidth: "60px" }}
                        >
                          {order.status}
                        </CBadge>
                      </td>
                    ),
                    view: (order) => (
                      <td>
                        <CButton
                          size="sm"
                          color="info"
                          className="ml-3"
                          onClick={() =>
                            props.history.push({
                              pathname: `${url}/order`,
                              state: order._id,
                            })
                          }
                        >
                          View
                        </CButton>
                      </td>
                    ),
                  }}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Orders;
