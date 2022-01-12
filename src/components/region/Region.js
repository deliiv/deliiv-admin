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
  const [availability, setAvailability] = useState('')
  const [regionName, setRegionName] = useState('')
  const [itemId, setItemId] = useState('')
  const [region, setRegion] = useState('')
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const [loading, setLoading] = useState(false);

  const [sCharge, setScharge] = useState('')
  const [sShipping, setsShipping] = useState('')


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
    setRegionName(item.name)
    setAvailability(item.available ? true :false)
    setItemId(item.id)
    setShow(true)
    setShowEdit(true)

  }

  const updateOrCreateCharge = () => {

    let dataUpdate = {
      id: itemId,
      name: regionName,
      available: availability
    }
    let dataCreate = {
      name: regionName,
      available: availability ? availability : false,
      service_charge:sCharge,
      shipping_cost: sShipping
    }

    if (isNew) {
      userService
        .createRegion(dataCreate)
        .then(() => {
          setLoading(false);
          window.location.reload();
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {

      userService
        .updateRegion(dataUpdate)
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
        onClick={() => { setShow(true); setShowEdit(false) }}>
        Add +
      </CButton>
      <Modals 
        show={show}
        regionName={regionName}
        isNew={showEdit}
        handleRegionChange={(e) => setRegion(e.target.value)}
        handleSuccess={updateOrCreateCharge}
        handleCancel={() => { setShow(false); setIsNew(false) }}
        handleOnChangeRname={(e) => setRegionName(e.target.value)}
        handleOnChangeAvailable={(e) => setAvailability(!availability)}
        available={availability}
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
                          onClick={() => {handleEdit(item)
                          }}
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
