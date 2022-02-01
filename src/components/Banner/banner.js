import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CModal,
  CSpinner,
} from "@coreui/react";
import { formateDate, formatTime } from "../../utils/formatDate";
import { commaDelimitNumber } from "../../utils/formatPrice";
import { useHistory, useRouteMatch } from "react-router";
import { useDispatch } from "react-redux";

import { useState } from "react";
import userService from "src/services/user.service";
import Modals from './Modals';
import { toast } from 'react-toastify';
import { fetchAllCategories } from '../../store/category-actions'


const Services = (props) => {

  const dispatch = useDispatch()

  const banners = useSelector((state) => state.banner.banners);

  const history = useHistory();
  const { url } = useRouteMatch();
  const category = useSelector((state) => state.category);
  const parts = useSelector((state) => state.services.parts);
  const [modalId, setModalId] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModals, setShowModals] = useState(false);
  const [state, setState] = useState({ name: '', id: "", image: "" });
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [emode, setEmode] = useState(false)
  const [availability, setAvailability] = useState('')


  const fields = [
    {
      key: "id",
      _style: { minWidth: "15%" },
      label: "Id",
    },
    {
      key: "title",
      _style: { minWidth: "15%" },
      label: "Title",
    },
    {
      key: "image",
      _style: { minWidth: "15%" },
      label: "Image",
    },
    {
      key: "active",
      _style: { minWidth: "15%" },
      label: "Active",
    },
    {
      key: "action",
      label: "Actions",
      _style: { minWidth: "1%" },
    },
  ];

  const handleOnChangeBannerName = (e) => {
    setName(e.target.value)
  }

  const handleSuccess = () => {
    let data = {
      id: id,
      title: name,
      active:availability
    }
    if(emode){
      userService.uploadBannerTitle(data).then(response => {
        toast.success("Banner title update")
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch(err => {
        console.log(err)
      })
      
    }
  
  }

  return (
    <>
      {loading && <CSpinner className="loader" size="lg" />}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <CButton
          size="md"
          color="primary"
          className="mb-4"
          onClick={() => { setShowModals(true) }}
        >
          Add Banner +
        </CButton>
        <Modals show={showModals}
          catName={name}
          image_url={image}
          id={id}
          handleCancel={() => {setShowModals(false); setName('')}}
          handleSuccess={handleSuccess}
          handleOnChangeBannerName={handleOnChangeBannerName}
          editMode={emode}
          title={"Banner"}
          handleOnChangeAvailable={(e) => setAvailability(!availability)}
        available={availability}
        />
      </div>
      {category && (
        <CRow>
          <CCol>
            <CCard>
              <CCardBody>
                {banners && (
                  <CDataTable
                    items={banners}
                    fields={fields}
                    items-per-page-select
                    items-per-page="5"
                    hover
                    pagination
                    table-filter
                    cleaner
                    overTableSlot={
                      <div className="center-flex">
                        <h3>Banner Ads</h3>
                      </div>
                    }
                    scopedSlots={{
                      image: (service) => <td><img style={{
                        objectFit: 'contain', width: '100%'
                      }}
                        src={service.image_url}
                        width={'150px'}
                        height={'100px'}
                      /></td>,
                      title: (item) => (
                        <td>{item.title ? item.title : "-no title-"}</td>
                      ),
                      active: (item) => (
                        <td>{item.active ? "Available" : "Unavailable"}</td>
                      ),
                      action: (item) => (
                        <td>
                          <CButton
                            color="warning"
                            variant="outline"
                            size="sm"
                            className="mx-1"
                            onClick={() => {
                              setShowModals(true);
                              setEmode(true)
                              setId(item.id)
                              setName(item.title)
                              setImage(item.image_url)
                              setAvailability(item.active ? true :false)

                              setState({ name: item.name, id: item.id, image: item.image_url });
                            }
                            }
                          >
                            Edit
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
      )}
    </>
  );
};

export default Services;
