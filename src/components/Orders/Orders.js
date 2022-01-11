import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,CSelect
} from "@coreui/react";
import React, {useEffect, lazy } from "react";
import { useRouteMatch, Link } from "react-router-dom";
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
  const totalOrders = useSelector((state) => state.orders.totalOrder);
  const completedOrders = useSelector((state) => state.orders.totalCompleted);
  const pendingOrders = useSelector((state) => state.orders.totalPending);
  const pickedUpOrder = useSelector((state) => state.orders.totalPickedup);
  const cancelledOrder = useSelector((state) => state.orders.totalCancelled);

  const fields = [
    {
      key: "id",
      _style: { minWidth: "15%" },
      label: "ID",
    },
    {
      key: "total_price",
      _style: { minWidth: "15%" },
      label: "Total Price",
    },
    {
      key: "status",
      _style: { minWidth: "15%" },
      label: "Status",
    },
    {
      key: "service_charge",
      _style: { minWidth: "15%" },
      label: "Service Charge",
    },
    {
      key: "shipping_cost",
      _style: { minWidth: "5%" },
      label: "Shipping Cost",

    },
    {
      key: "created_at",
      _style: { minWidth: "1%" },
      label: "Date Created",

    },
    {
      key: "updated_at",
      _style: { minWidth: "1%" },
      label: "Updated At",

    }
  ];
  const widgetList = [
    {
      title: "All Orders",
       totalAmount: totalOrders.toString() || "0",
    },
    {
      title: "Total Completed Orders",
      totalAmount: completedOrders.toString() || "0",
    },
    { title: "Total Pending Orders",
      totalAmount: pendingOrders.toString() || "0"
     },
    { title: "Total Pickedup Orders",
      totalAmount: pickedUpOrder.toString() || "0"
     },
    { title: "Total Cancelled Orders",
      totalAmount: cancelledOrder.toString() || "0"
     },
  ];

  const handleOnChangeUpdateOrder =(id, status)=>{
    // setShow(true)
    // setOrderId(id)
    // setOrderStatus(status)
    
    // setTimeout(() => {
    //   console.log(`Status is ${status} and id: ${id}`)
    // }, 3000);
  }
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
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Orders</h3>
                    </div>
                  }
                  cleaner
                  scopedSlots={{
                    created_at: (date) => (
                      <td>
                        {formateDate(date.created_at)}{" "}
                        {formatTime(date.created_at)}
                      </td>
                    ),
                    updated_at: (date) => (
                      <td>
                        {formateDate(date.updated_at)}{" "}
                        {formatTime(date.updated_at)}
                      </td>
                    ),
                    order_id: (order) => <td>{order.order_id}</td>,
                    order_date: (order) => (
                      <td>
                        {formateDate(order.date_created)}{" "}
                        {formatTime(order.date_created)}
                      </td>
                    ),
                    service_details: (order) => (
                      <td>{order.service_details.title}</td>
                    ),
                    customername: (order) => (
                      <td>
                        <Link
                          to={{
                            pathname: `/customers/customer-${order.customer._id}`,
                          }}
                        >
                          {order.customer ? order.customer.fullname : null}
                        </Link>
                      </td>
                    ),
                    customernumber: (order) => (
                      <td>{order.customer ? order.customer.phone : null}</td>
                    ),
                    customeremail: (order) => (
                      <td>{order.customer ? order.customer.email : null}</td>
                    ),
                    amount: (order) => <td>{order.service.price}</td>,
                    status: (item) => (
                      <td className="py-2">
                    <CSelect 
                     style={{ border:`1px solid   ${item.status === 'pending' ? 'blue' : item.status === 'delivered' ? 'green' : item.status === 'pickedup' ? 'yellow' : 'red' }` }}
                    custom value={item.status} name="creditReason" id="creditReason" onChange={e => handleOnChangeUpdateOrder(item.id, e.target.value)}>
                      <option value="pending">Pending</option>
                      <option value="pickedup">Picked up</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </CSelect>
										</td>
                    ),
                    assigned_serviceman: (order) => (
                      <td>{order.serviceman.name}</td>
                    ),
                    view: (order) => (
                      <td>
                        <CButton
                          size="sm"
                          color="info"
                          className="ml-3"
                          onClick={() =>
                            props.history.push({
                              pathname: `${url}/order-${order._id}`,
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
