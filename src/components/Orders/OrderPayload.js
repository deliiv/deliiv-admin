import React, { useState, useEffect } from 'react'
import {
  CCardBody,
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CSelect,
  CFormGroup
} from '@coreui/react'
import moment from 'moment'
import Location from './location.svg'
import OrderPayloadItem from './OrderPayloadItem'
import Spinner from '../Spinner'
import userService from "src/services/user.service";
import ModalC from './ModalsC'
import Modals from './Modals'
import { toast } from 'react-toastify'


const OrderPayload = ({ item }) => {

  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [riders, setRiders] = useState([]);
  const [modalTitle, setModalTitle] = useState('');
  const [newRiderId, setNewRiderId] = useState('');
  const [message, setMessage] = useState('');

  const [riderPayload, setRiderPayload] = useState({})
  const [updatedRiderPayload, setUpdatedRiderPayload] = useState({})

  useEffect(() => {
    if (item) {
      setLoader(false)

      let tempRiderPayload ={}
      tempRiderPayload.firstName =item.rider_assign?.firstName
      tempRiderPayload.lastName =item.rider_assign?.lastName
      tempRiderPayload.phone_number =item.rider_assign?.phone_number
      tempRiderPayload.full_name =item.rider_assign?.phone_number
      setRiderPayload(tempRiderPayload)
    }
  }, [item])

  useEffect(() => {
    userService.getAllActiveRiders()
      .then(riders => {
        setRiders(riders.data.riders)
      })

  }, [])

  const handleCancel = () => {

    userService.cancelJob(item._id).then(response => {
      toast.success(`Order cancelled`)
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch(err => {
      console.log(err)
    })
  }

  const handleChangeJobStatus = (value) => {
    let rider = JSON.parse(value)
    setModalTitle("Change job status")
    setNewRiderId(rider._id)
    setShowModal(true)
    setMessage(`Change job rider to ${rider.firstName} ${rider.lastName} ?`)

    let tempRiderPayload ={}
      tempRiderPayload.firstName =rider.firstName
      tempRiderPayload.lastName =rider.lastName
      tempRiderPayload.phone_number =rider.phone_number
      tempRiderPayload.full_name =rider.phone_number
      setUpdatedRiderPayload(tempRiderPayload)

  }

  const handleSuccess = () => {

    setShowModal(false)
    let jobPayload = {
      jobId: item._id,
      riderId: newRiderId
    }

    userService.changeJobRider(jobPayload)
      .then(response => {
        toast.success("Rider successfully changed")
        setRiderPayload(updatedRiderPayload)
      }).catch(error => {
        toast.error("Error changing rider")
      })

  }

  return (
    <CCardBody>
      <ModalC
        title={"Cancel order"}
        message={`Are you sure you want to cancel this order?`}
        show={show}
        handleSuccess={handleCancel}
        handleCancel={() => setShow(false)}
      />
      {loader && <Spinner width={20} height={20} />}

      {item && <CRow>
        <CCol xs="12" md="8" >
          <CCard style={{ border: "1px solid #18A0FB" }}>

            <CCardHeader style={{ backgroundColor: "#D9DDFF", fontWeight: "bold", fontSize: "20px" }}>
              Order Details
              {/* <DocsLink name="CBadge"/> */}
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="2" md="2">
                  <h6 style={{ fontWeight: "bold" }}>Order ID</h6>
                  <p>{item && item.job_id}</p>
                </CCol>
                <CCol>
                  <h6 style={{ fontWeight: "bold" }}>Amount</h6>
                  <p>{item && item.amount}</p>
                </CCol>
                <CCol xs="2" md="2">
                  <h6 style={{ fontWeight: "bold" }}>Date</h6>
                  <p>{item && moment(item.createdAt).format('DD/MM/YYYY')}</p>
                </CCol>
                <CCol xs="2" md="2">
                  <h6 style={{ fontWeight: "bold" }}>Time</h6>
                  <p>{item && moment(item.createdAt).format('hh:mm A')}</p>
                </CCol>
                <CCol xs="2" md="2">
                  <h6 style={{ fontWeight: "bold" }}>Job Status</h6>
                  <p>{item && item.status}</p>
                </CCol>
                <CCol xs="2" md="2">
                  <h6 style={{ fontWeight: "bold" }}>Payment Status</h6>
                  <p>{item && item.payment_status}</p>
                </CCol>
              </CRow>
              <CCard>

                <CCardBody>
                  <CRow>

                    {new Array(3).fill(null).map((i, index) => {
                      if (index === 0) {
                        return (<CCol xs="4" md="4">
                          <OrderPayloadItem payload={item && item.sender} index={0} />
                        </CCol>)
                      }
                      if (index === 1) {
                        return (<CCol xs="4" md="4">
                          <OrderPayloadItem payload={item && item.receiver} index={1} />
                        </CCol>)
                      }
                      if (index === 2) {
                        return (<CCol xs="4" md="4">
                          <OrderPayloadItem payload={item && riderPayload} index={2} />
                        </CCol>)
                      }

                    })}

                  </CRow>
                </CCardBody>
              </CCard>

              <CRow>
                <CCol>
                  <CCard style={{ paddingLeft: 10 }}>
                    <CCardBody>
                      <CRow>
                        <h6 style={{ fontWeight: "bold" }}>Pick up Location</h6>

                      </CRow>
                      <CRow>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                          <img src={Location} alt="" />
                          <p style={{ paddingTop: "10px", paddingLeft: 10 }}>{item.pickup_address}</p>
                        </div>
                      </CRow>

                    </CCardBody>

                  </CCard>

                </CCol>
                <CCol>
                  <CCard style={{ paddingLeft: 10 }}>

                    <CCardBody >
                      <CRow>
                        <h6 style={{ fontWeight: "bold" }}>Drop Off Location</h6>
                      </CRow>
                      <CRow>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                          <img src={Location} alt="" />
                          <p style={{ paddingTop: "10px", paddingLeft: 10 }}>{item.dropoff_address}</p>
                        </div>
                      </CRow>

                    </CCardBody>

                  </CCard>

                </CCol>
              </CRow>


            </CCardBody>

          </CCard>


        </CCol>

        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              <strong>
                Package Details
              </strong>
            </CCardHeader>

            <CCardBody>
              Name: {item.package_name}
              <br />
              <br />
              Instruction: {item.instruction}


            </CCardBody>

          </CCard>
          {item && item.payment_status === 'paid' &&
            item.status !== 'delivered' &&
            item.status !== 'cancelled' &&
            <CButton color="danger" onClick={() => setShow(true)}>Cancel Order</CButton>}
        </CCol>

        <CCol xs="12" md="4">
          <CCard>
            <CCardHeader>
              <strong>
                Switch Job Rider
              </strong>
            </CCardHeader>

            <CCardBody>
              <CFormGroup row>
                <CCol xs="12" md="9">
                  <CSelect
                    custom
                    size="sm"
                    name="selectSm"
                    id="SelectLm"
                    onChange={e => handleChangeJobStatus(e.target.value)}
                  >
                    {
                      riders.length > 0 && riders.map(rider => {
                        return <option value={JSON.stringify(rider)}>{rider.firstName} {rider.lastName}</option>
                      })
                    }

                  </CSelect>
                </CCol>
              </CFormGroup>

            </CCardBody>

          </CCard>
          {/* {item && item.payment_status === 'paid' &&
            item.status !== 'delivered' &&
            item.status !== 'cancelled' &&
            <CButton color="danger" onClick={() => setShow(true)}>Cancel Order</CButton>} */}
        </CCol>
      </CRow>}
      <Modals title={modalTitle}
        show={showModal}
        message={message}
        handleSuccess={handleSuccess}
        handleCancel={() => setShowModal(false)}

      />
    </CCardBody>
  )
}

export default OrderPayload
