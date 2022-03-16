import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CBadge,
  CCollapse,
  CButton,
  CWidgetSimple
} from "@coreui/react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { getBadge } from "../../utils/orderStatusColor";


import { formateDate, formatTime } from "../../utils/formatDate";
import userService from "src/services/user.service";
import { toast } from 'react-toastify';

const OrderDetails = (props)=>{

const { path, url } = useRouteMatch();

const totalActiveSellers = useSelector((state) => state.dashbord.totalActiveSellers);
const totalInActiveSellers = useSelector((state) => state.dashbord.totalInActiveSellers);


const [orderId, setOrderId] = useState("")
const [orderStatus, setOrderStatus] = useState("")
const [show, setShow] = useState(false)
const [details, setDetails] = useState([])
const [selectedProduct, setSelectedProduct] = useState()


const widgetList = [
  {
    title: "Total Active Sellers",
    totalAmount: totalActiveSellers.toString() || "0",
  },
  {
    title: "Total Inactive Sellers",
    totalAmount: totalInActiveSellers.toString() || "0",
  },
  // { title: "Air Conditioner", totalAmount: "unavailable" || "0" },
];

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
    key: "region",
    _style: { minWidth: "15%" },
    label: "Region",
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

const handleOnChangeUpdateOrder = (id, status) => {
  setShow(true)
  setOrderId(id)
  setOrderStatus(status)

  setTimeout(() => {
    console.log(`Status is ${status} and id: ${id}`)
  }, 3000);
}

useEffect(() => {
  console.log('++++++++++', props);
}, [])

return (
  <>
    {/* <WidgetsDropdown widgetList={widgetList} /> */}

    {/* <Modals
title={"Change order status"}
message={`Are you sure you want to change order to ${orderStatus} `}
 show={show}
 handleSuccess={handleUpdateOrder}
 handleCancel={()=>setShow(false)}/> */}
    <CRow>
      <CCol>
        <CCard>
          <CCardBody>
            {props.order && props.order.user_detail && props.order.user_detail.order && props.order.user_detail.order.length > 0 && (
              <CDataTable
                items={props.order.user_detail.order}
                fields={fields}
                items-per-page-select
                items-per-page="5"
                hover
                pagination
                table-filter
                cleaner
                overTableSlot={
                  <div className="center-flex">
                    <h3>Orders Table</h3>
                  </div>
                }
                scopedSlots={{

                  region: (data) => {
                    return (
                      <td>
                        {data && data.address && data.address.region ? data.address.region : "-not-available"}
                      </td>
                    )
                  },
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
                            // setSelectedProduct(item.seller_details.order.filter(it => it.id === item.id));

                          }}
                        >
                          {details.includes(item.id) ? "Hide" : "Show"}
                        </CButton>
                      </td>
                    );
                  },
                  details: (item) => {
                    return (
                      <CCollapse show={details.includes(item.id)}>
                        <CCardBody>
                          <CWidgetSimple>
                            <table>
                              <thead className="thead-light">
                                <tr>
                                  <th className="text-center">#</th>
                                  <th>Name</th>
                                  <th>Description</th>
                                  <th>Quantity</th>
                                  <th>Price</th>
                                  <th className="text-center">Discount Price</th>
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
                }

export default OrderDetails;
