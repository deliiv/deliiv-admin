import React, { useState } from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable,
  CButton,
  CRow,
  CCol
} from '@coreui/react'
import { useHistory } from 'react-router-dom';

import Approve from './approve.svg'
import Decline from './decline.svg'
import moment from 'moment';
import ReceiptModal from './ImageViewModal'


const CompletedTable = ({ completed }) => {

  const history = useHistory()

  const [showModal, setShow] = useState(false)
  const [imgurl, setimgurl] = useState('')

  const fields = [
    { key: 'User', _style: { width: '30%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'amount', _style: { width: '10%' } },
    // { key: 'receipt', _style: { width: '10%' } },
    { key: 'account_detail', label: "Account detail", _style: { width: '10%' } },
    { key: 'createdAt', label: "Date and Time", _style: { width: '20%' } },
    { key: 'Action', label: "", _style: { width: '40%' } },

  ]

  const getBadge = (status) => {
    switch (status) {
      case 'completed': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  return (
    <CCardBody>
      <ReceiptModal
        title={"Receipt"}
        show={showModal}
        handleCancel={()=> setShow(false)}
        image_url={imgurl} />
      <CDataTable
        items={completed}
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
             <b>{item.user ? item.user.firstName : ""}  {item.user ? item.user.lastName :""}</b> 

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

<CButton
                 color="success"
                 variant="outline"
                  onClick={() => history.push({
                    pathname: `/riders/details/${item.user ? item.user._id : item.agency._id}`,
                    state: { pathname: item.user ? "user" : "agency" }
                  })}>
                  <strong>View Profile</strong>
                </CButton>
                <br />
                <br />
                {item && item.receipt && item.receipt.receipt_image && <CButton
                 color="info"
                 variant="outline"
                onClick={() => { setShow(true);
                setimgurl(item.receipt.receipt_image) }}>
                  View Receipt
                </CButton>}
              </td>
            );
          }



        }}
      />
    </CCardBody>
  )
}

export default CompletedTable
