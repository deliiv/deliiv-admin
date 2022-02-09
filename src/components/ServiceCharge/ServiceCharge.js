import React, { useState } from "react";
import { useSelector } from "react-redux";
import WidgetsDropdown from "src/views/widgets/WidgetsDropdown";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal
} from "@coreui/react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";

import { formateDate, formatTime } from "../../utils/formatDate";
import Modals from "./Modals";
import AddModal from "./AddModal";
import userService from "src/services/user.service";
import { toast } from 'react-toastify';


const ServiceCharge = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const serviceCharge = useSelector((state) => state.servicecharge.serviceCharge);
  const totalActiveSellers = useSelector((state) => state.dashbord.totalActiveSellers);
  const totalInActiveSellers = useSelector((state) => state.dashbord.totalInActiveSellers);

  const allSellers = useSelector((state) => state.seller.sellers);

  const [modalId, setModalId] = useState('')
  const [sCharge, setScharge] = useState('')
  const [sShipping, setsShipping] = useState('')
  const [itemId, setItemId] = useState('')
  const [sChargeId, setSChargeId] = useState('')
  const [region, setRegion] = useState('')
  const [show, setShow] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [sChargeEdit, setSchargeEdit] = useState(false);
  const [showAddSCharge, setshowAddSCharge] = useState(false);
  const [selectedRegionName, setselectedRegionName] = useState('');
  const [selectedRegionId, setselectedRegionId] = useState('');



  const fields = [
    {
      key: "region",
      _style: { minWidth: "15%" },
      label: "Region",
    },
    {
      key: "shipping_cost",
      _style: { minWidth: "15%" },
      label: "Shipping Cost",
    },
    {
      key: "service_charge",
      _style: { minWidth: "15%" },
      label: "Service Charge",
    },
    {
      key: "action",
      _style: { minWidth: "15%" },
      label: "Edit",
    },
    // {
    //   key: "last_login",
    //   _style: { minWidth: "1%" },
    // },
  ];

  const handleEdit = (item) => {
    setsShipping(item.shipping_cost)
    setScharge(item.service_charge)
    setItemId(item.id)

    setShow(true)
  }
  const handleUpdate = (item) => {
    setsShipping(item.shipping_cost)
    //setScharge(item.service_charge)
    // setItemId(item.id)
    setSChargeId(item.id)
    setFromAmount(item.from_amount)
    setToAmount(item.to_amount)
    setPercentage(item.percentage)
    setSchargeEdit(true)
    setShow(true)
  }

  const handleAdd =(item)=>{
    setselectedRegionName(item.region.name)
    setselectedRegionId(item.region.id)
    setshowAddSCharge(true)
  }

  const updateOrCreateCharge = () => {

    let dataUpdate = {
      id: itemId,
      service_charge: sCharge,
      shipping_cost: sShipping
    }
    let dataCreate = {
      region: region,
      service_charge: sCharge,
      shipping_cost: sShipping
    }

    if (isNew) {
      userService
        .createServiceCharge(dataCreate)
        .then(() => {
          setLoading(false);
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      if(sChargeEdit){
        let dUpdate={
          percentage:percentage,
          from_amount:fromAmount,
          to_amount: toAmount,
          id:sChargeId
        }

        userService
        .updateServiceChargePriceRange(dUpdate)
        .then(() => {
          setLoading(false);
          toast.success("service charge updated");
          setTimeout(() => {
            window.location.reload();
          }, 2000);

        })
        .catch((error) => {
          console.log(error);
        });
        
      }else{
        userService
        .updateServiceCharge(dataUpdate)
        .then(() => {
          setLoading(false);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
      }
    }
  }

  const updateOrCreateChargePrice=()=>{

    let data={
      percentage:percentage,
      from_amount:fromAmount,
      to_amount: toAmount,
      region_id:selectedRegionId
    }

    userService
    .createServiceChargePrice(data)
    .then(() => {
      setLoading(false);
      toast.success("Service charge created");
      setTimeout(() => {
        window.location.reload();
      }, 2000);

    })
    .catch((error) => {
      console.log(error);
    });

  }
  const handleOnChangeSCharge = (value, index) => {

    if (index === 'percentage') {
      setPercentage(value)
    }
    if (index === 'from_amount') {
      setFromAmount(value)
    }
    if (index === 'to_amount') {
      setToAmount(value)
    }

  }
  return (
    <>

      <Modals
        show={show}
        sCharge={sCharge}
        sShipping={sShipping}
        isNew={isNew}
        handleRegionChange={(e) => setRegion(e.target.value)}
        handleSuccess={updateOrCreateCharge}
        handleCancel={() => {
          setShow(false);
          setIsNew(false);
          setSchargeEdit(false)
        }}
        handleOnChangeSCost={(e) => setsShipping(e.target.value)}
        handleOnChangeSCharge={handleOnChangeSCharge}

        sChargeEdit={sChargeEdit}
        percentage={percentage}
        from_amount={fromAmount}
        to_amount={toAmount}
      />
      <AddModal
      title={`Add service charge for ${selectedRegionName} region`}
        show={showAddSCharge}
        sCharge={sCharge}
        sShipping={sShipping}
        isNew={isNew}
        handleRegionChange={(e) => setRegion(e.target.value)}
        handleSuccess={updateOrCreateChargePrice}
        handleCancel={() => {
         setshowAddSCharge(false)
        }}
        handleOnChangeSCost={(e) => setsShipping(e.target.value)}
        handleOnChangeSCharge={handleOnChangeSCharge}

        sChargeEdit={sChargeEdit}
        percentage={percentage}
        from_amount={fromAmount}
        to_amount={toAmount}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {serviceCharge && serviceCharge.length > 0 && (
                <CDataTable
                  items={serviceCharge}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  table-filter
                  cleaner
                  overTableSlot={
                    <>
                    <div className="center-flex">
                      <h3>Service Charge / Shipping Cost</h3>
                    </div>
                    <div><p>What is service charge ?</p>
                    <p></p>
                    </div>

                    </>
                  }
                  scopedSlots={{
                    action: (item) => (
                      <td>
                        <CButton
                          color="warning"
                          variant="outline"
                          size="sm"
                          className="mx-1"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </CButton>
                      </td>
                    ),
                    region: (item) => (
                      <td>

                        {item && item.region && item.region.name.charAt(0).toUpperCase() + item.region.name.slice(1)}
                      </td>
                    ),
                    service_charge: (item) => (
                      <td>

                        {item.service_charge.map((item, index) => {
                          return (
                            <div>
                              <p>Percentage <b>{item.percentage}</b></p>
                              <div style={{ display: "flex", flexDirection: "row" }}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                  <p><b>From</b> </p>
                                  <p>{item.from_amount}</p>
                                </div>
                                  ----------
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                  <p><b>To</b></p>
                                  <p>{item.to_amount}</p>
                                </div>
                              </div>
                              <CButton
                                color="warning"
                                variant="outline"
                                size="sm"
                                className="mx-1"
                                onClick={() => handleUpdate(item)}
                              >
                                Update
                        </CButton>
                              <hr />
                            </div>
                          )
                        })}
                        <CButton
                          color="success"
                          variant="outline"
                          size="sm"
                          className="mx-1"
                          onClick={() => handleAdd(item)}
                        >
                          Add Service Charge
                        </CButton>
                      </td>
                    )
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

export default ServiceCharge;
