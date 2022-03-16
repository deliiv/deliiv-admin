import { CCard, CCollapse, CWidgetSimple, CCardBody, CButton, CCol, CDataTable, CRow, CFormGroup, CInput } from "@coreui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formateDate, formatTime } from "../../utils/formatDate";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";

import userService from "src/services/user.service";
import { toast } from 'react-toastify';
import PaymentDetails from "./PaymentDetails";
import Tabs from './PaymentTabs'

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



  return (
    <>


      <CRow>

        <CCol>

          <CCard>
            <CFormGroup>
              <div style={{ width: "40%", display: "flex", flexDirection: 'row', padding: "30px" }}>
                <CInput placeholder="search" style={{ padding: 20 }} />
                <CButton color="primary" style={{ marginLeft: 20, paddingLeft: 20, paddingRight: 20 }}>Search</CButton>
              </div>
            </CFormGroup>


            <CRow>
              <CCol xs="12" md="6">
                <PaymentDetails />
              </CCol>
              <CCol xs="12" md="3">
                <CCard style={{ padding: 10 }}>
                  Current balance
                  <CCardBody>
                    Lorem ipsum
                  </CCardBody>
                </CCard>

              </CCol>
            </CRow>


          </CCard>

          <Tabs/>


        </CCol>

      </CRow>
    </>
  );
};

export default Store;
