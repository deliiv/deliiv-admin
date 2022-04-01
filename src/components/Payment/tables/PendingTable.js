import React, { useState } from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable,
  CCol,
  CRow
} from '@coreui/react'
import usersData from '../UsersData.js'

import Approve from './approve.svg'
import Decline from './decline.svg'
import moment from 'moment';
import Modal from '../Modals2';
import { useHistory } from 'react-router-dom';
import userService from 'src/services/user.service.js'
import { toast } from 'react-toastify';


const PendingTable = ({ pending }) => {

  const history = useHistory();

  const [status, setStatus] = useState("")
  const [orderId, setOrderId] = useState("")
  const [show, setShow] = useState(false)

  const fields = [
    { key: 'User', _style: { width: '20%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'amount', _style: { width: '10%' } },
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

  const handleRequestUpdate =()=>{

 let data={
        wId:orderId,
        status:status === "Decline" ? "cancelled" : status === "Approve" ? "completed" : "pending"
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
        show={show}
        title="Change Witdrawal status"
        message={`Are you sure you want to ${status} witdrawal request`}
        handleCancel={()=> setShow(false)}
        handleSuccess={handleRequestUpdate}
      />

      <CDataTable
        items={pending}
        fields={fields}
        // columnFilter
        // tableFilter
        // cleaner
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        pagination
        // loading
        // onRowClick={(item,index,col,e) => console.log(item,index,col,e)}
        // onPageChange={(val) => console.log('new page:', val)}
        // onPagesChange={(val) => console.log('new pages:', val)}
        // onPaginationChange={(val) => console.log('new pagination:', val)}
        // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
        // onSorterValueChange={(val) => console.log('new sorter value:', val)}
        // onTableFilterChange={(val) => console.log('new table filter:', val)}
        // onColumnFilterChange={(val) => console.log('new column filter:', val)}
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
              <b>{item.user.firstName}  {item.user.lastName}</b>
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
                    <img src={Approve} alt="" width={50} onClick={() => {setStatus("Approve"); setShow(true); setOrderId(item._id)}} />
                  </CCol>
                  <CCol>
                    <img src={Decline} alt="" width={50} onClick={() => {setStatus("Decline"); setShow(true); setOrderId(item._id)}} />
                  </CCol>
                  <CCol>
                    <p style={{ paddingTop: 20, "--hover-color": "green" }}
                      onClick={() => history.push(`/riders/details/${item.user._id}`)}>
                            <strong>View Profile</strong></p>
                  </CCol>
                </CRow>
                {/* <CButton
                      // color="info"
                      // variant="outline"
                      style={{ borderRadius: '5px', width: '100px' }}
                      size="sm"
                      onClick={() => {
                        history.push(`/customer-details/${item.id}`, {
                          item
                        })
                      }}>

                      View User
                      </CButton> */}
              </td>
            );
          }



        }}
      />
    </CCardBody>
  )
}

export default PendingTable
