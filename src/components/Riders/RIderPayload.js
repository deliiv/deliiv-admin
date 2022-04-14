import React from 'react'
import {
  CCardBody,
  CCard,
  CCol,
  CRow,
  CBadge,
  CButton,
  CDropdownDivider
} from '@coreui/react'

import Verified from './verified.svg'
import Avatar from './avatar.svg'
import { useRouteMatch, useParams } from "react-router-dom";
import moment from 'moment';
import UserService from "../../services/user.service";
import Mail from '../../assets/mail.svg'
import Phone from '../../assets/phone.svg'
import { toast } from 'react-toastify';

import Tabs from './Tabs'
import Modals from './Modals';
import Modals2 from './Modals2';
import Spinner from 'src/Spinner';
const OrderPayload = () => {

  let { id } = useParams();
  const [customer, setCustomer] = React.useState("");
  const [jobs, setJobs] = React.useState("");
  const [documents, setDocuments] = React.useState("");
  const [transactions, setTransactions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [showDel, setShowDel] = React.useState(false);
  const [dId, setDid] = React.useState('');
  const [docId, setDocId] = React.useState('');
  const [loader, setLoader] = React.useState(true)


  React.useEffect(() => {
    setLoading(true);
    UserService.getSingleRider(id)
      .then((res) => {

        setCustomer(res.data.user_details);
        setJobs(res.data.jobs);
        setTransactions(res.data.transactions);
        setDocuments(res.data.documents);
        setLoading(false);
        setLoader(false)

      })
      .catch((error) => {
        setLoader(false)

        console.log(error);
      });
  }, []);

  const handleDelete=()=>{

    UserService.deleteDoc({docId:docId})
      .then((res) => {

        toast.success('Document deleted');
        setTimeout(() => {
        	window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <CCard>
      <CCardBody>

        <CRow>
        {loader && <Spinner width={20} height={20}/>}

          <CCol xs="3" md="3" >
            {customer && customer.user.avatar ? <img src={customer.user.avatar} alt="" width={300} /> : <img src={Avatar} alt="" width={300} />}
            <h4>
              <strong>
                {customer && customer.user.firstName} {customer && customer.user.lastName}
              </strong>
              {customer && customer.user.account_verified && <img src={Verified} alt="" />}

            </h4>
            <medium>
              Member since {customer && moment(customer.user.createdAt).format('MMMM Do, YYYY ')}
            </medium>
            <br />
            <strong>
              {/* <CBadge color='primary'>{customer && customer.user && customer.user.role && customer.user.role === "AGENCY_RIDER" ? 'Agency Rider' : customer.user.role === "RIDER" ? "Solo Rider" : null }</CBadge> */}
            </strong>

          </CCol>
          <CCol xs="12" md="3">
            <CCard style={{ padding: 10 }}>
              <h5>
                <strong>
                  Contact Details
                </strong>
              </h5>
              <CCardBody>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img src={Mail} alt="" />
                  <p style={{ paddingTop: "10px", paddingLeft: 10 }}> {customer && customer.user.email}</p>
                </div>
                {/* </CRow> */}
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                  <img src={Phone} alt="" />
                  <p style={{ paddingTop: "10px", paddingLeft: 10 }}>{customer && customer.user.phone_number}</p>
                </div>
              </CCardBody>
            </CCard>

          </CCol>
          <CCol xs="12" md="3">
            <CCard style={{ padding: 10 }}>
              <h5>
                <strong>
                  Wallet Balance
                </strong>
              </h5>
              <CCardBody>
                <strong>
                  <h2>
                    ₦{customer && customer.wallet && customer.wallet.balance.toLocaleString()}
                  </h2>
                </strong>              </CCardBody>
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
                <h2>
                  {jobs && jobs.delivered.length}
                </h2>
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>
        <Modals
        show={show}
        title={"Upload document"}
        handleCancel={()=> {
          setShow(false);
          setDid(null)}}
        dId={dId}
         id={customer && customer.user._id} />
         <Modals2
         show={showDel}
         handleCancel={()=>setShowDel(false)}
        title={"Delete document"}
         message={"Are u sure you want to delete document"}
         handleSuccess={handleDelete}/>
        <CRow>
          <CCol xs="12" md="12">
            <CDropdownDivider />
            <h5>
              <strong>
                Uploaded Documents
              </strong>
            </h5>
            <CCardBody>
              <div style={{ display: "flex", flexDirection: "row", }}>
                {
                  documents && documents.map((item, index) => {
                    return (<div style={{ display: "flex", flexDirection: "column", width: '120px', marginRight: '20px' }}>
                      <medium>{item.document_name ? item.document_name : 'No name'}</medium>
                      <img src={item.document_image} alt="" width={120} height={100}/>
                      <CButton color='primary'
                        size="sm" style={{ marginTop: 10 }}
                        onClick={()=>{setShow(true);
                        setDid(item)}}>
                        <strong>Upload</strong></CButton>
                      <CButton color='danger'
                        variant="outline"
                        style={{ marginTop: 10 }}
                        onClick={()=>{setDocId(item._id); setShowDel(true)}}
                        size="sm"><strong>Remove</strong></CButton>
                    </div>)
                  })
                }
                <CButton onClick={()=> {setShow(true); setDid(null)}}>Upload</CButton>

              </div>

            </CCardBody>
          </CCol>
        </CRow>
        <CDropdownDivider />

        <Tabs jobs={jobs} />
      </CCardBody>
    </CCard>
  )
}

export default OrderPayload
