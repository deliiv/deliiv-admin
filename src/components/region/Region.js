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
import userService from "src/services/user.service";
import { toast } from 'react-toastify';


const Region = (props) => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const regions = useSelector((state) => state.region.region);

  const allSellers = useSelector((state) => state.seller.sellers);

  const [modalId, setModalId] = useState('')
  const [sCharge, setScharge] = useState('')
  const [sShipping, setsShipping] = useState('')
  const [itemId, setItemId] = useState('')
  const [region, setRegion] = useState('')
  const [show, setShow] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(false);


  const fields = [
    {
      key: "name",
      _style: { minWidth: "15%" },
      label: "Region",
    },
    {
      key: "available",
      _style: { minWidth: "15%" },
      label: "Availability",
    },
    {
      key: "action",
      _style: { minWidth: "15%" },
      label: "Edit",
    },

  ];

  const handleEdit = (item) => {
    setsShipping(item.shipping_cost)
    setScharge(item.service_charge)
    setItemId(item.id)
    setShow(true)
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
  return (
    <>
      <CButton
        size="md"
        color="primary"
        className="mb-4 float-md-right"
        onClick={() => { setShow(true); setIsNew(true) }}>
        Add +
      </CButton>
      <Modals 
        show={show}
        sCharge={sCharge}
        sShipping={sShipping}
        isNew={isNew}
        handleRegionChange={(e) => setRegion(e.target.value)}
        handleSuccess={updateOrCreateCharge}
        handleCancel={() => { setShow(false); setIsNew(false) }}
        handleOnChangeSCost={(e) => setsShipping(e.target.value)}
        handleOnChangeSCharge={(e) => setScharge(e.target.value)}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              {regions && regions.length > 0 && (
                <CDataTable
                  items={regions}
                  fields={fields}
                  items-per-page-select
                  items-per-page="5"
                  hover
                  pagination
                  table-filter
                  cleaner
                  overTableSlot={
                    <div className="center-flex">
                      <h3>Regions</h3>
                    </div>
                  }
                  scopedSlots={{
                    available: (item) => (
                      <td>
                        {item.available ? "Available" : 'unavailable'}
                      </td>
                    ),
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

export default Region;
