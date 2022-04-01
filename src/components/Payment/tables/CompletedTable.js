import React, { useState } from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable,
  CButton,
  CRow,
  CCol
} from '@coreui/react'
import usersData from '../UsersData.js'
import { useHistory } from 'react-router-dom';

import Approve from './approve.svg'
import Decline from './decline.svg'
import moment from 'moment';


const CompletedTable = ({ completed }) => {

  const history = useHistory()

  const fields = [
    { key: 'User', _style: { width: '30%' } },
    { key: 'status', _style: { width: '10%' } },
    { key: 'amount', _style: { width: '10%' } },
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
          'User':
            (item) => (
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

                <p
                  onClick={() => history.push(`/riders/details/${item.user._id}`)}>
                  <strong>View Profile</strong>
                </p>

              </td>
            );
          }



        }}
      />
    </CCardBody>
  )
}

export default CompletedTable
