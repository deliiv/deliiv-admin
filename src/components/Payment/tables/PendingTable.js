import React, { useEffect, useState } from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable,
  CCol,
  CRow
} from '@coreui/react'

import Approve from './approve.svg'
import Decline from './decline.svg'
import moment from 'moment';
import Modal from '../Modals2';
import ReceiptModal from '../Modals';
import { useHistory } from 'react-router-dom';
import userService from 'src/services/user.service.js'
import { toast } from 'react-toastify';


const PendingTable = ({ pending, search }) => {
  const history = useHistory();

  const [status, setStatus] = useState("")
  const [orderId, setOrderId] = useState("")
  const [show, setShow] = useState(false)
  const [showCancel, setShowCancel] = useState(false)
  const [paymentDetail, setPaymentDetail] = useState(null)



  const fields = [
    { key: 'reference', _style: { width: '10%' } },
    { key: 'User', _style: { width: '10%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'amount', _style: { width: '10%' } },
    { key: 'account_detail', label: "Account detail", _style: { width: '10%' } },
    { key: 'createdAt', label: "Date and Time", _style: { width: '20%' } },
    { key: 'Action', label: "", _style: { width: '40%' } },

  ]

  const getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  const handleRequestUpdate = () => {

    let data = {
      wId: orderId,
      status: status === "Decline" ? "cancelled" : status === "Approve" ? "completed" : "pending"
    }


    userService.updateWithdrawalRequest(data)
      .then((res) => {
        toast.success('Request updated');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        toast.error('Error updating request, please try again later');
        console.log(error);
      });
  }





  return (
    <CCardBody>
      <Modal
        show={showCancel}
        title="Change Witdrawal status"
        message={`Are you sure you want to ${status} witdrawal request`}
        handleCancel={() => setShow(false)}
        handleSuccess={handleRequestUpdate}
      />
      <ReceiptModal
        show={show}
        handleCancel={() => setShow(false)}
        title="Upload payment receipt"
        paymentDetail={paymentDetail}
      />

      <CDataTable
        items={pending}
        fields={fields}
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        pagination
        scopedSlots={{
          'status':
            (item) => (
              <td>
                <CBadge color={getBadge(item.status)}>
                  {item.status}
                </CBadge>
              </td>
            ),
          User: (item) => (
            <td>
              <b> {item.user ? item.user.firstName : ""} </b>

            </td>
          ),
          account_detail: (item) => (
            <td>
              {item && item.account_detail ? <div>{item.account_detail.bank_name}<br /> {item.account_detail.account_name}<br /> {item.account_detail.account_number}</div> : <i>Not available</i>}
            </td>
          ),
          "createdAt": (item) => (
            <td>{moment(item.createdAt).format('DD/MM/YYYY  hh:mm a')}</td>
          ),

          Action: (item) => {
            return (
              <td className="py-2 px-5">
                <CRow>
                  <CCol>
                    <img src={Approve} alt="" width={50} onClick={() => {
                      // setStatus("Approve");
                      setPaymentDetail(item);
                      setShow(true);
                      setOrderId(item._id)
                    }}
                      style={{ cursor: "pointer" }} />
                  </CCol>
                  <CCol>
                    <img src={Decline} alt="" width={50}
                      onClick={() => {
                        setStatus("Decline");
                        setShowCancel(true);
                        setOrderId(item._id)
                      }}
                      style={{ cursor: "pointer" }} />
                  </CCol>
                  <CCol>
                    <p style={{ paddingTop: 20, "--hover-color": "green", cursor: "pointer" }}
                      onClick={() => history.push({
                        pathname: `/riders/details/${item.user ? item.user._id : item.agency._id}`,
                        state: { pathname: item.user ? "user" : "agency" }
                      })}>
                      <strong>View Profile</strong></p>
                  </CCol>
                </CRow>
              </td>
            );
          }



        }}
      />

{/* <SearchableTable data={pending} /> */}

    </CCardBody>
  )
}

export default PendingTable
