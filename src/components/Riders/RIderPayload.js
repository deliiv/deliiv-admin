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
import { useHistory } from 'react-router';

import Verified from './verified.svg'
import Avatar from './avatar.svg'
import { useRouteMatch, useParams } from "react-router-dom";
import moment from 'moment';
import UserService from "../../services/user.service";
import Mail from '../../assets/mail.svg'
import Phone from '../../assets/phone.svg'
import ImageViewerModal from '../Payment/tables/ImageViewModal'
import { toast } from 'react-toastify';

import Tabs from './Tabs'
import Modals from './Modals';
import Modals2 from './Modals2';
import Spinner from 'src/Spinner';
const OrderPayload = ({ payload }) => {
  const navigate = useHistory();

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
  const [usertype, setUserType] = React.useState('');
  const [role, setRole] = React.useState('');
  const [loader, setLoader] = React.useState(true)
  const [showImageModal, setShowImageModal] = React.useState(false)
  const [imgurl, setimgurl] = React.useState('')

  const documentName = [
    { id: 1, name: "Motorcycle Particulars" },
    { id: 2, name: "Hackney Permit" },
    { id: 3, name: "Advert Permit" },
    { id: 4, name: "Consolidation" },
    { id: 5, name: "Motorcycle drivers license" },
    { id: 6, name: "ID card" }
  ]



  React.useEffect(() => {
    if (!payload.history.location.state) {
      navigate.goBack()

    } else if (payload.history.location.state.pathname === "agency") {
      setUserType('agency')
      setLoading(true);
      UserService.getSingleAgency(id)
        .then((res) => {

          setRole(res.data.user_details.user.role)
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


    } else {
      setUserType('rider')
      setLoading(true);
      UserService.getSingleRider(id)
        .then((res) => {
          setCustomer(res.data.user_details);
          setRole(res.data.user_details.user.role)
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
    }

  }, []);

  const handleDelete = () => {

    UserService.deleteDoc({ docId: docId })
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

  const renderDocumentImage = (name, id) => {

    let docImg = ""
    if(documents && documents.length > 0){
    for (let i = 0; i < documents.length; i++) {
      if (documents[i].document_name === name && documents[i].rider === id) {
        docImg = documents[i].document_image
      }
    }
  }
    return docImg
  }
  const renderImage = (customer) => {
    if (customer && customer.user && customer.user.avatar) {
      return <img src={customer.user.avatar} alt="" width={300} />
    } else if (customer && customer.agency && customer.agency.avatar) {
      return <img src={customer.agency.avatar} alt="" width={300} />
    } else {
      return <img src={Avatar} alt="" width={300} />
    }
  }
  const renderName = (customer) => {
    if (customer && customer.user) {
      return customer.user.firstName + " " + customer.user.lastName
    } else if (customer && customer.agency) {
      return customer.agency.name
    } else {
      return "No name"
    }
  }

  return (
    <CCard>
      <ImageViewerModal
        title={"Docuement image"}
        show={showImageModal}
        handleCancel={()=> setShowImageModal(false)}
        image_url={imgurl}
        />
      <CCardBody>

        <CRow>
          {loader && <Spinner width={20} height={20} />}

          <CCol xs="3" md="3" >

            {renderImage(customer)}

            <h4>
              <strong>
                {customer && customer.user ? customer.user.firstName : ""} {customer && customer.user ? customer.user.lastName : ""}
                {customer && customer.user ? customer.user.name : ""}
              </strong>
            </h4>
            <medium>
              Member since {customer && moment(customer.user.createdAt).format('MMMM Do, YYYY ')}
            </medium>
            <br />
            <strong>
              {usertype !== 'agency' && <CBadge color='primary'>{
                role === "AGENCY_RIDER" ? 'Agency Rider' :
                  role === "RIDER" ? "Solo Rider" :
                    null
              }
              </CBadge>
              }
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
                    ₦{customer && customer.wallet && customer.wallet.toLocaleString()}
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
        {usertype !== 'agency' && <Modals
          show={show}
          title={"Upload document"}
          handleCancel={() => {
            setShow(false);
            setDid(null)
          }}
          dId={dId}
          id={customer && customer.user._id}
        />}
        {usertype !== "agency" && <Modals2
          show={showDel}
          handleCancel={() => setShowDel(false)}
          title={"Delete document"}
          message={"Are u sure you want to delete document"}
          handleSuccess={handleDelete} />}
        {usertype !== 'agency ' && <CRow>
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
                  documentName.map((item, index) => {
                    return (<div style={{ display: "flex", flexDirection: "column", width: '120px', marginRight: '20px' }}>
                      <medium style={{ padding: '10px', maxHeight: "30px", marginBottom: "30px" }}>{item.name}</medium>
                     {renderDocumentImage(item.name, id) ? (
                      <img
                        src={renderDocumentImage(item.name, id)}
                        onClick={()=> {
                          setShowImageModal(true)
                          setimgurl(renderDocumentImage(item.name, id))
                        }}
                        alt=""
                        width={120}
                        height={100} />
                     ):(<div style={{ width:'120px', height:"100px",backgroundColor:"black" }}/>)}
                      <CButton color='primary'
                        size="sm" style={{ marginTop: 10 }}
                        onClick={() => {
                          setShow(true);
                          setDid(item)
                        }}>
                        <strong>Upload</strong></CButton>
                      <CButton color='danger'
                        variant="outline"
                        style={{ marginTop: 10 }}
                        onClick={() => {
                          setDocId(item._id);
                          setShowDel(true)
                        }}
                        size="sm"><strong>Remove</strong></CButton>
                    </div>)
                  })
                }
                {/* {usertype !== 'agency' && <CButton
                  color='success'
                  variant="outline"
                  onClick={() => { setShow(true); setDid(null) }}
                  style={{ height: '40px' }}>Upload Document</CButton>} */}

              </div>

            </CCardBody>
          </CCol>
        </CRow>}
        <CDropdownDivider />

        <Tabs jobs={jobs} />
      </CCardBody>
    </CCard>
  )
}

export default OrderPayload
