import React,{useEffect, useState} from "react";
import { useSelector } from "react-redux";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CBadge,
  CSelect
} from "@coreui/react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { getBadge } from "../../utils/orderStatusColor";


import { formateDate, formatTime } from "../../utils/formatDate";
import userService from "src/services/user.service";
import Modals from './Modals';
import { toast } from 'react-toastify';


const OrderDetails = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const servicemen = useSelector((state) => state.servicemen.servicemen);
  const totalActiveSellers = useSelector((state) => state.dashbord.totalActiveSellers);
  const totalInActiveSellers = useSelector((state) => state.dashbord.totalInActiveSellers);

  const seller_details = useSelector((state) => state.seller.seller_details);

  const [orderId, setOrderId] = useState("")
  const [orderStatus, setOrderStatus] = useState("")
  const [show, setShow] = useState(false)


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

    }
  ];

  const handleUpdateOrder =()=>{
    let data={
      order_id: orderId,
      status:orderStatus
    }
  userService.updateOrderStatus(data).then(response =>{
    toast.success(`Order status updated to ${orderStatus}`)
    setTimeout(() => {
			window.location.reload();
		}, 1000);
  }).catch(err =>{
    console.log(err)
  })
  }

  const handleOnChangeUpdateOrder =(id, status)=>{
    setShow(true)
    setOrderId(id)
    setOrderStatus(status)
    
    setTimeout(() => {
      console.log(`Status is ${status} and id: ${id}`)
    }, 3000);
  }

  return (
    <>
      {/* <WidgetsDropdown widgetList={widgetList} /> */}

<Modals
title={"Change order status"}
message={`Are you sure you want to change order to ${orderStatus} `}
 show={show}
 handleSuccess={handleUpdateOrder}
 handleCancel={()=>setShow(false)}/>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {props.order && props.order.user_detail&&  props.order.user_detail.order.data && props.order.user_detail.order.data.length > 0 && (
                <CDataTable
                  items={props.order.user_detail.order.data}
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
                  //   firstName: (serviceman) => (
                  //     <td>
                  //       <Link
                  //         to={{
                  //           pathname: `${url}/serviceman-${serviceman._id}`,
                  //         }}
                  //       >
                  //         {serviceman ? serviceman.firstName : null}
                  //       </Link>
                  //     </td>
                  //   ),
                  //   number: (serviceman) => (
                  //     <td>{serviceman ? serviceman.phone : null}</td>
                  //   ),
                  //   no_of_jobs: (serviceman) => (
                  //     <td>
                  //       {serviceman ? serviceman.numberOfJobs : "Not Available"}
                  //     </td>
                  //   ),
                  //   active_status: (serviceman) => (
                  //     <td>
                  //       {serviceman.active_status === true
                  //         ? "active"
                  //         : "inactive"}
                  //     </td>
                  //   ),
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

export default OrderDetails;
