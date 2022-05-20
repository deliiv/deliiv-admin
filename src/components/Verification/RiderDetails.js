import React, { useEffect, useState } from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable,
  CCard,
  CRow,
  CCol,
  CDropdownDivider,
  CButton,
  CSwitch,
  CSpinner
} from '@coreui/react'
import usersData from './UsersData.js'
import Tabs from './RiderTabs'
import Verified from './verified.svg'
import Avatar from './avatar.svg'
import OrderPayloadItem from './OrderPayloadItem'
import Mail from '../../assets/mail.svg'
import Phone from '../../assets/phone.svg'
import moment from 'moment'
import userService from 'src/services/user.service.js'
import Modals2 from './Modals2.js'
import { toast } from 'react-toastify';
import {Toggle} from "react-toggle-component"


const RiderDetails = ({ selected }) => {

  const [rId, setRid] = useState('')
  const [status, setStatus] = useState(true)
  const [payload, setPayload] = useState({})

  const [show, setShow] = React.useState(false);
  const [showDel, setShowDel] = React.useState(false);
  const [dId, setDid] = React.useState('');
  const [docId, setDocId] = React.useState('');
  const [toggleStatus, setToggleStatus] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);


  const fields = [
    { key: 'name', _style: { width: '40%' } },
    'registered',
    { key: 'role', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },

  ]

  const getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }


  useEffect(() => {

   // setToggleStatus(selected.account_verified)

    userService.searchRiderDocs({ riderId: selected._id }).then(response => {
      setPayload(response.data)
      setTimeout(() => {
        setStatus(false)
      }, 2000);

    }).catch(err => {
      console.log(err)
    })

  }, [selected])

  useEffect(() =>{
    if(selected){
     setToggleStatus(selected.admin_verified)
    }
  },[selected])

  const changeRiderStatus=()=>{
    let data = { riderId: selected._id, status:toggleStatus }

    userService.verifyRider(data).then(response => {
      setToggleStatus(toggleStatus)
      setToggleStatus(response.data.rider.admin_verified)
      toast.success('Rider status changed')
      setShowModal(false)


    }).catch(err => {
      console.log(err)
    })
  }
  return (
    <CCard>
      <CCardBody>
      <Modals2 title={"Change rider status"}
        message={`Are you sure you want to change rider Active status from ${toggleStatus} to ${!toggleStatus}`}

        handleCancel={()=> {setShowModal(false); setToggleStatus(selected.account_verified)}}
        handleSuccess={changeRiderStatus}
        show={showModal}/>
        <CRow>
          <CCol xs="3" md="3" >
            <img src={Avatar} alt="" width={300} />
            <h4>
              <strong>
                {selected && selected.firstName} {selected && selected.lastName}     {selected.admin_verified && <img src={Verified}/>}

              </strong>
            </h4>
            <medium>
              Member since {selected && moment(selected.createdAt).format('MMMM Do, YYYY ')}
            </medium>
            <br />
            <strong>
              <CBadge color='primary'>{selected && selected.role && selected.role === "AGENCY_RIDER" ? 'Agency Rider' : selected.role === "RIDER" ? "Solo Rider" : null}</CBadge>
            </strong>

          </CCol>
          <CCol xs="12" md="3">
            <CCard style={{ padding: 10 }}>

              <CCardBody>
                <h4 style={{ marginRight: "20px" }}>
                  <strong>Contact Details</strong>
                </h4>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img src={Mail} alt="" />
                  <p style={{ paddingTop: "10px", paddingLeft: 10 }}> {selected && selected.email}</p>
                </div>
                {/* </CRow> */}
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img src={Phone} alt="" />
                  <p style={{ paddingTop: "10px", paddingLeft: 10 }}>{selected && selected.phone_number}</p>
                </div>
              </CCardBody>
            </CCard>
            <CCol xs='12' sm="9" md="12" style={{ display: "flex", flexDirection: "row", width: "100%" }}>

              <h4 style={{ marginRight: "20px" }}>
                <strong>Verification status</strong>
              </h4>
              <CSwitch
                className="mr-1"
                color="success"
                checked={toggleStatus}

                onChange={e => {
                  setToggleStatus(!toggleStatus);
                  setShowModal(true)
                }}
                shape="pill"

              />

            </CCol>
          </CCol>
          <CCol xs="12" md="3">
            <CCard style={{ padding: 10 }}>
              <h5>
                <strong>
                  Wallet Balance
                </strong>
              </h5>
              <CCardBody>
                {status ? <CSpinner size="sm" /> : payload.wallet ? <h2>{payload.wallet.balance}</h2> : <h2>0</h2>}
              </CCardBody>
            </CCard>

          </CCol>
          <CCol xs="12" md="3">
            <CCard style={{ padding: 10 }}>
              <h5>
                <strong>
                  Orders Completed
                </strong>
              </h5>
              <CCardBody>
              {status ? <CSpinner size="sm" /> : payload  &&  <h2>{payload.completed}</h2>}
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12" md="12">
            <CDropdownDivider />
            <h5>
              <strong>
                Uploaded Documents
              </strong>
            </h5>
            <CCardBody>
              {status ? <CSpinner size="sm" /> : payload && payload.document && payload.document.length > 0 ? payload.document.map(item => {
                return (<div style={{ display: "flex", flexDirection: "column", width: '120px', marginRight: '20px' }}>
                  <medium>{item.document_name ? item.document_name : 'No name'}</medium>
                  <img src={item.document_image} alt="" width={120} height={100} />
                  {/* <CButton color='primary'
                    size="sm" style={{ marginTop: 10 }}
                    onClick={() => {
                      setShow(true);
                      setDid(item)
                    }}>
                    <strong>Upload</strong>
                  </CButton>
                  <CButton color='danger'
                    variant="outline"
                    style={{ marginTop: 10 }}
                    onClick={() => { setDocId(item._id); setShowDel(true) }}
                    size="sm"><strong>Remove</strong>
                  </CButton> */}
                </div>)
              }) : <p>No document uploaded</p>}




            </CCardBody>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default RiderDetails
