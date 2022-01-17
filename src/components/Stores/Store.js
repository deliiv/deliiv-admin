import { CCard, CCollapse, CWidgetSimple, CCardBody, CButton, CCol, CDataTable, CRow } from "@coreui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import Modals2 from './Modals2';
import Modals from './Modals';
import userService from "src/services/user.service";
import { toast } from 'react-toastify';

const Store = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const customers = useSelector((state) => state.store.allStoreProducts);
  const totalProductInStore = useSelector((state) => state.store.totalStoreItem);
  const [details, setDetails] = useState([])
  const [img, setImg] = useState([])
  const [orderStatus, setOrderStatus] = useState("")
  const [show, setShow] = useState(false)
  const [eMode, setEmode] = useState(false)
  const [productName, setproductName] = useState('')
  const [productPrice, setproductPrice] = useState('')
  const [productQuantity, setProductQuantity] = useState('')
  const [note, setNote] = useState('')
  const [pId, setPid] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [imageId, setImageId] = useState('')


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

  const fields = [
    {
      key: "name",
      _style: { minWidth: "15%" },
      label: "Name",
    },
    {
      key: "price",
      _style: { minWidth: "15%" },
      label: "Price",
    },
    {
      key: "quantity",
      _style: { minWidth: "15%" },
      label: "Quantity",
    },
    {
      key: "note",
      _style: { minWidth: "15%" },
      label: "Note",
    },

    {
      key: "created_at",
      _style: { minWidth: "1%" },
      label: "Date created"
    },
    {
      key: "view",
      _style: { minWidth: "1%" },
      label: "Action",

    },
  ];

  const widgetList = [
    {
      title: "Total Products in Store",
      totalAmount: totalProductInStore.toString() || "0",
    }
  ];

  const handleUpdateProduct = () => {
    let data = {
      id: pId,
      product_name:productName,
      price:productPrice,
      quantity: productQuantity,
      note: note
    }
    if(!eMode){
      userService.createStoreProduct(data).then(response => {
        toast.success(`Product created successfully`)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch(err => {
        console.log(err)
      })
    }else{
      userService.updateStoreProduct(data).then(response => {
        toast.success(`Product updated successfully`)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch(err => {
        console.log(err)
      })
    }
  }

  const handleShow=(item)=>{
    setShow(true)
    setproductName(item.name)
    setProductQuantity(item.quantity)
    setproductPrice(item.price)
    setNote(item.note)
    setPid(item.id)
  }
  const handleOnChangeCatname=(value, type)=>{
    if(type === 'name'){
      setproductName(value)
    }if(type === 'price'){
      setproductPrice(value)
    }
    if(type === 'quantity'){
      setProductQuantity(value)
    }
    if(type === 'note'){
      setNote(value)
    }
  }

  const handleDelete =(item)=>{
    setShowConfirm(true)
    setImageId(item)
  }
  const handleDeleteImage =()=>{

    userService
			.deleteStoreProductImage(imageId)
			.then((response) => {
				toast.success('Product image deleted');
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			})
			.catch((error) => {
				toast.error('Product image delete error');
			});
    
  }

  return (
    <>
    <CButton
        size="md"
        color="primary"
        className="mb-4 float-md-right"
        onClick={() => {
          setEmode(false); 
          setShow(true)
          setproductName('')
          setProductQuantity('')
          setproductPrice('')
          setNote('')
        }}
      >
        Add +
      </CButton>
      <WidgetsDropdown widgetList={widgetList} />
      
      <Modals2
        title={"Store Product"}
        message={`Are you sure you want to change order to ${orderStatus} `}
        show={show}
        images={img}
        editMode={eMode}
        productName={productName}
        productPrice={productPrice}
        productQuantity={productQuantity}
        note={note}
        id={pId}
        handleDelete={handleDelete}
        handleOnChangeCatname={handleOnChangeCatname}
        handleSuccess={handleUpdateProduct}
        handleCancel={() => {
          setShow(false)
          setEmode(false)
        }} />
      <Modals
        title={"Delete Product Image"}
        message={`Are you sure you want to delete product image? `}
        show={showConfirm}
        images={img}
       
        handleSuccess={handleDeleteImage}
        handleCancel={() => {
          setShowConfirm(false)
        }} />
      <CRow>
        
        <CCol>
          <CCard>
            <CCardBody>
              {customers && (
                <CDataTable
                  items={customers}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  columnFilter
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Store Products</h3>
                    </div>
                  }
                  scopedSlots={{
                    firstname: (customer) => (
                      <td>
                        {customer ? customer.firstname : null}
                      </td>
                    ),
                    customernumber: (customer) => (
                      <td>{customer ? customer.phone : null}</td>
                    ),
                    customeaddress: (customer) => (
                      <td>
                        {customer.address ? customer.address : "Not Available"}
                      </td>
                    ),
                    customeremail: (customer) => (
                      <td>{customer ? customer.email : null}</td>
                    ),
                    created_at: (customer) => (
                      <td>
                        {formateDate(customer.created_at)}{" "}
                        {formatTime(customer.created_at)}
                      </td>
                    ),
                    view: (item) => {
                      return (
                        <td className="py-2">
                          <CButton
                            color="info"
                            variant="outline"
                            // shape="square"
                            size="sm"
                            onClick={() => {
                              toggleDetails(item.id);
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
                              <div style={{
                                display: "flex",
                                alignItems: "flex-start",
                                flexWrap: "wrap",
                                flexDirection: "flex-start",
                                flexDirection: "column"
                              }}>
                                <p>Images</p>
                                <div>
                                  {
                                    item.images && item.images.length > 0 ? item.images.map(item => {
                                      return (<img 
                                        src={item.image_url} 
                                        width={150} 
                                        height={150} 
                                        style={{marginRight:'20px'}}/>)

                                    }) : <p>** no image **</p>
                                  }
                                </div>
                              </div>
                            </CWidgetSimple>

                            <p className="text-muted">{item.note}</p>


                            <CButton
                              size="sm"
                              color="secondary"
                              className="ml-1"
                              onClick={() => {
                               handleShow(item)
                                setImg(item.images)
                                setEmode(true)
                              }}
                            >
                              Edit Product
                            </CButton>


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

export default Store;
