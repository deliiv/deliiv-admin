import React, { useState } from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable} from '@coreui/react'
import usersData from './UsersData.js'


const DemoTable = ({riders}) => {

  const fields = [
    {
      key: "firstName",
      _style: { minWidth: "15%" },
      label: "First Name",
    },
    {
      key: "lastName",
      _style: { minWidth: "15%" },
      label: "Last Name",
    },
    {
      key: "phone_number",
      _style: { minWidth: "15%" },
      label: "Number",
    },
    {
      key: "email",
      _style: { minWidth: "15%" },
      label: "Email",
    },
    {
      key: "last_login",
      _style: { minWidth: "1%" },
    },
    {
      key: "view",
      _style: { minWidth: "1%" },
      label: "Action",

    },
  ];


  const getBadge = (status) => {
    switch (status) {
      case 'Active': return 'success'
      case 'Inactive': return 'secondary'
      case 'Pending': return 'warning'
      case 'Banned': return 'danger'
      default: return 'primary'
    }
  }

  return (
    <CCardBody>

      <CDataTable
        items={riders}
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


        }}
      />
    </CCardBody>
  )
}

export default DemoTable
