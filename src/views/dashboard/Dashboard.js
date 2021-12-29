import CIcon from "@coreui/icons-react";
import {
  CAlert,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CSpinner,
} from "@coreui/react";
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { getBadge } from "../../utils/orderStatusColor";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown"));

const Dashboard = (props) => {
  const orders = useSelector((state) => state.orders.orders);
  const totalOrders = useSelector((state) => state.dashbord.totalOrders);
  const totalUsers = useSelector((state) => state.dashbord.totalUsers);
  const totalProducts = useSelector((state) => state.dashbord.totalProducts);
  const newOrders = useSelector((state) => state.orders.newOrders);
  const totalServicemen = useSelector(
    (state) => state.servicemen.totalServicemen
  );

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
      title: "New Orders",
      totalAmount: newOrders ? newOrders.length.toString() : "una",
    },
    { title: "Servicemen", totalAmount: totalServicemen.toString() || "0" },
    { title: "Users", totalAmount: totalUsers.toString() || "0" },
    { title: "Products", totalAmount: totalProducts.toString() || "0" },
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
                  items={newOrders}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  columnFilter
                  loadingSlot={<CSpinner size="lg" />}
                  noItemsViewSlot={
                    <div className="center-flex">
                      <h1 className="text-center ">No New Orders</h1>
                      <CIcon
                        name="cil-ban"
                        customClasses="ban-icon text-danger ml-2"
                      />
                    </div>
                  }
                  overTableSlot={
                    <div className="center-flex">
                      <h3>New Orders</h3>
                    </div>
                  }
                  hover
                  pagination
                  table-filter
                  //cleaner
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
                              pathname: `/jobs/job-${order._id}`,
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

export default Dashboard;
