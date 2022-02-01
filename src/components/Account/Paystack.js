import React, { useState } from 'react'
import {
  CCardBody,
  CBadge,
  CButton,
  CCollapse,
  CDataTable
} from '@coreui/react'
import { useSelector } from "react-redux";

import moment from 'moment';

const PayStack = () => {
  const [details, setDetails] = useState([])
  const {payStack} = useSelector((state) => state.transactions);

  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    } 
    setDetails(newDetails)
  }


  const fields = [
    { key: 'id', _style: { width: '10%'} },
    { key: 'reference', _style: { width: '20%'} },
    { key: 'Customer', _style: { width: '20%'} },
    { key: 'amount', _style: { width: '20%'} },
    { key: 'status', _style: { width: '10%'} },
    { key: 'Date', _style: { width: '20%'} }
  ]

  const getBadge = (status)=>{
    switch (status) {
      case 'success': return 'success'
      case 'ongoing': return 'secondary'
      case 'abandoned': return 'warning'
      case 'failed': return 'danger'
      default: return 'primary'
    }
  }

  return (
    <CCardBody>
      <CDataTable
        items={payStack}
        fields={fields}  
        itemsPerPageSelect
        itemsPerPage={10}
        hover
        sorter
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
        scopedSlots = {{
          'Customer':
          (item)=>(
            <td>
                <b>{item.customer.email}</b>
            </td>
          ),
          'status':
            (item)=>(
              <td>
                <CBadge color={getBadge(item.status)}>
                  {item.status}
                </CBadge>
              </td>
            ),
            'amount':
            (item)=>(
              <td>
                  <b>{new Intl.NumberFormat().format(item.amount / 100)}</b>
              </td>
            ),
            'Date':
            (item)=>(
              <td>
                  <b>{moment(item.createdAt).format('MMMM Do YYYY, h:mm A')}</b>
              </td>
            ),
          'show_details':
            item => {
              return (
                <td className="py-2">
                  <CButton
                    color="primary"
                    variant="outline"
                    shape="square"
                    size="sm"
                    onClick={() => { toggleDetails(item.id) }}
                  >
                    { details.includes(item.id) ? 'Hide' : 'Show' }
                  </CButton>
                </td>
              )
            },
          'details':
              item => {
                return (
                <CCollapse show={details.includes(item.id)}>
                  <CCardBody>
                    <h4>
                      {item.username}
                    </h4>
                    <p className="text-muted">User since: {item.registered}</p>
                    <CButton size="sm" color="info">
                      User Settings
                    </CButton>
                    <CButton size="sm" color="danger" className="ml-1">
                      Delete
                    </CButton>
                  </CCardBody>
                </CCollapse>
              )
            }
        }}
      />
    </CCardBody>
  )
}

export default PayStack
