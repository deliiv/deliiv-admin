import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow, CSelect, CCollapse, CWidgetSimple
} from "@coreui/react";
import React, { useState, lazy } from "react";
import { useRouteMatch, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { getBadge } from "../../utils/orderStatusColor";
import userService from "src/services/user.service";
import Modals from './Modals';
import { toast } from 'react-toastify';

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

  const [details, setDetails] = useState([])

  const [orderId, setOrderId] = useState("")
  const [orderStatus, setOrderStatus] = useState("")
  const [show, setShow] = useState(false)

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const handleUpdateOrder = () => {
    let data = {
      order_id: orderId,
      status: orderStatus
    }
    userService.updateOrderStatus(data).then(response => {
      toast.success(`Order status updated to ${orderStatus}`)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch(err => {
      console.log(err)
    })
  }



  const fields = [
    {
      key: "id",
      _style: { minWidth: "15%" },
      label: "Order Id",
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
      key: "show_details",
      label: "",
      _style: { width: "1%" },
      filter: false,
    },
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
    {
      title: "Total Pending Orders",
      totalAmount: pendingOrders.toString() || "0"
    },
    {
      title: "Total Pickedup Orders",
      totalAmount: pickedUpOrder.toString() || "0"
    },
    {
      title: "Total Cancelled Orders",
      totalAmount: cancelledOrder.toString() || "0"
    },
  ];

  const handleOnChangeUpdateOrder = (id, status) => {
    setShow(true)
    setOrderId(id)
    setOrderStatus(status)

    setTimeout(() => {
      console.log(`Status is ${status} and id: ${id}`)
    }, 3000);
  }
  return (
    <>
      <WidgetsDropdown widgetList={widgetList} />
      <Modals
        title={"Change order status"}
        message={`Are you sure you want to change order to ${orderStatus} `}
        show={show}
        handleSuccess={handleUpdateOrder}
        handleCancel={() => setShow(false)} />
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
                    show_details: (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="info"
                            variant="outline"
                            // shape="square"
                            size="sm"
                            onClick={() => {
                              toggleDetails(item.id);
                              //console.log(products[item.id]);
                              // setSelectedProduct(seller_details.seller_details.order.filter(it => it.id === item.id));

                            }}
                          >
                            {details.includes(item.id) ? "Hide" : "Overview"}
                          </CButton>
                        </td>
                      );
                    },
                    details: (item) => {
                      return (
                        <CCollapse show={details.includes(item.id)}>
                          <CWidgetSimple>
                            <table>
                              <thead className="thead-light">
                                <tr>
                                  <th className="text-center">Order id</th>
                                  <th>Name</th>
                                  <th>Description</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                  <th className="text-center">Discount Price</th>
                                  <th className="text-center">Seller</th>
                                  <th>Region</th>
                                  <th>Images</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  item.products.map(item => {
                                    return (
                                      <>
                                        <tr>
                                          <td>{item.id}</td>
                                          <td>{item.name}</td>
                                          <td>{item.description}</td>
                                          <td>{item.quantity}</td>
                                          <td>{item.price}</td>
                                          <td>{item.discount_price}</td>
                                          <td><b>{item.seller.firstName} {item.seller.lastName}</b></td>
                                          <td>{item.region}</td>
                                          <td>
                                            {item.images && item.images.map(item => {
                                              return (<img src={item.image_url} width={50} height={50} />)
                                            })}
                                          </td>

                                        </tr>

                                      </>
                                    )
                                  })
                                }
                                <tr>
                                  <td></td>
                                </tr>
                              </tbody>
                            </table>
                            <div style={{ width: '30%', display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
                              <p><b>Change Order Status</b></p>
                              <CSelect
                                style={{ border: `1px solid   ${item.status === 'pending' ? 'blue' : item.status === 'delivered' ? 'green' : item.status === 'pickedup' ? 'yellow' : 'red'}` }}
                                custom value={item.status} name="creditReason" id="creditReason" onChange={e => handleOnChangeUpdateOrder(item.id, e.target.value)}>
                                <option value="pending">Pending</option>
                                <option value="pickedup">Picked up</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </CSelect>
                            </div>
                          </CWidgetSimple>

                          <p className="text-muted">{item.details}</p>

                          <CCardBody>
                            <p className="text-muted">{item.details}</p>
                          </CCardBody>
                          <CCardBody>
                            <h5>Buyer</h5>
                            <CWidgetSimple>
                              <table>
                                <thead className="thead-light">
                                  <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                    <th>Last Login</th>
                                    {/* <th>Address</th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{item.buyer.firstname} {item.buyer.lastname}</td>
                                    <td>{item.buyer.phone}</td>
                                    <td>{item.buyer.last_login}</td>
                                    {/* <td>{item.buyer.address}</td> */}
                                  </tr>
                                  <tr>
                                  </tr>
                                </tbody>
                              </table>
                            </CWidgetSimple>
                            <p className="text-muted">{item.details}</p>
                          </CCardBody>
                        </CCollapse>
                      );
                    },
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
