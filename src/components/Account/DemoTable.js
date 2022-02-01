import React from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable
} from '@coreui/react'
import { useSelector } from "react-redux";

import { formateDate, formatTime } from "../../utils/formatDate";

const DemoTable = () => {
  const {localTransaction} = useSelector((state) => state.transactions);
  const fields = [
    { key: 'id', _style: { width: '10%'} },
    { key: 'reference', _style: { width: '20%'} },
    { key: 'Customer', _style: { width: '20%'} },
    { key: 'amount', _style: { width: '20%'} },
    { key: 'status', _style: { width: '10%'} },
    { key: 'created_at', _style: { width: '20%'} }
  ]

  const getBadge = (status)=>{
    switch (status) {
      case 'successful': return 'success'
      case 'ongoing': return 'secondary'
      case 'abandoned': return 'warning'
      case 'failed': return 'danger'
      default: return 'primary'
    }
  }

  return (
    <CCardBody>
      <CDataTable
        items={localTransaction}
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
                <b>{item.user.firstname} {item.user.lastname}</b>
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
            created_at: (date) => (
              <td>
                {formateDate(date.created_at)}{" "}
                {formatTime(date.created_at)}
              </td>
            )
        }}
      />
    </CCardBody>
  )
}

export default DemoTable
