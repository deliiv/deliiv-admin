import React,{useState, useEffect} from "react";
import { useSelector } from "react-redux";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CBadge,

  CSelect,CCollapse,CSpinner,CWidgetSimple

} from "@coreui/react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import { formateDate, formatTime } from "../../utils/formatDate";
import { getBadge } from "../../utils/orderStatusColor";


const SellerOrderDetails = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const servicemen = useSelector((state) => state.servicemen.servicemen);
  const totalActiveSellers = useSelector((state) => state.dashbord.totalActiveSellers);
  const totalInActiveSellers = useSelector((state) => state.dashbord.totalInActiveSellers);

  const seller_details = useSelector((state) => state.seller.seller_details);

  const [orderId, setOrderId] = useState("")
  const [orderStatus, setOrderStatus] = useState("")
  const [show, setShow] = useState(false)
  const [details, setDetails] = useState([])
  const [selectedProduct, setSelectedProduct] = useState()
  const [products, setProducts] = useState(undefined);



  const widgetList = [
    {
      title: "Total Active Sellers",
      totalAmount: totalActiveSellers.toString() || "0",
    },
    {
      title: "Total Inactive Sellers",
      totalAmount: totalInActiveSellers.toString() || "0",
    },
  ];

  useEffect(() =>{
// console.log('++++++++++', seller_details.seller_details);
  },[])
  const handleOnChangeUpdateOrder =(id, status)=>{
    setShow(true)
    setOrderId(id)
    setOrderStatus(status)
    
    setTimeout(() => {
      console.log(`Status is ${status} and id: ${id}`)
    }, 3000);
  }

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
              {seller_details && seller_details.seller_details && seller_details.seller_details.order && seller_details.seller_details.order.length > 0 && (
                <CDataTable
                  items={seller_details.seller_details.order}
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
                              setSelectedProduct(seller_details.seller_details.order.filter(it => it.id === item.id));
                              
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
                              item.products.map(item =>{
                                return(
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
                                  {item.images && item.images.map(item =>{
                                  return(<img src={item.image_url} width={50} height={50}/>)
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
                            {/* <CButton
                              size="sm"
                              color="primary"
                              className="ml-1"
                              onClick={() => {
                                selectedProduct = products[item.id];
                                //console.log("Edit Product", selectedProduct);
                                props.history.push({
                                  pathname: `${url}/add_image`,
                                  selectedProduct,
                                });
                              }}
                            >
                              Add Image
                            </CButton>
                            <CButton
                              size="sm"
                              color="primary"
                              className="ml-1"
                              onClick={() => {
                                selectedProduct = products[item.id];
                                //console.log("Edit Product", selectedProduct);
                                props.history.push({
                                  pathname: `${url}/view_product_images`,
                                  state: products[item.id].id,
                                });
                              }}
                            >
                              View Images
                            </CButton>
                            <CButton
                              size="sm"
                              color="secondary"
                              className="ml-1"
                              onClick={() => {
                                selectedProduct = products[item.id];
                                //console.log("Edit Product", selectedProduct);
                                props.history.push({
                                  pathname: `${url}/edit`,
                                  selectedProduct,
                                });
                              }}
                            >
                              Edit Product
                            </CButton>

                            {item.on_promo && (
                              <CButton
                                size="sm"
                                color="warning"
                                className="ml-1"
                                onClick={() => {
                                  // unMarkForPromo(item._id, "");
                                }}
                              >
                                Un-mark for Promo
                              </CButton>
                            )}

                            {!item.on_promo && (
                              <CButton
                                size="sm"
                                color="primary"
                                className="ml-1"
                                onClick={() => {
                                  //console.log(products[item.id]);
                                  //console.log("Edit Product", selectedProduct);
                                  props.history.push({
                                    pathname: `${url}/available_promos`,
                                    productId: item._id,
                                  });
                                }}
                              >
                                Mark for Promo
                              </CButton>
                            )}

                            <CButton
                              size="sm"
                              color={item.available ? "warning" : "success"}
                              className="ml-1"
                              onClick={() => {
                                selectedProduct = products[item.id];
                                // toggleAvailability(item);
                              }}
                            >
                              {item.available ? "Disable" : "Enable"} Product
                              {/* {disPrdSpinner ? (
                                <CSpinner
                                  size="sm"
                                  color="info"
                                  className="ml-2"
                                />
                              ) : null} */}
                            {/* </CButton> */}
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
    </>  );
};

export default SellerOrderDetails;
