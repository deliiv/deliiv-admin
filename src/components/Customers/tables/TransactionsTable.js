import React from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable} from '@coreui/react'

  import {useHistory} from 'react-router-dom'
import moment  from 'moment'

const Transactions = ({transactions}) => {
  console.log('<<<<<<<<<<<<<<<<<<<', transactions)
  const history = useHistory();

  const fields = [
    { key:"order_ID",lable: 'Order ID', _style: { width: '10%' } },
    { key:"type",lable: 'Debit/Credit', _style: { width: '20%' } },
    { key:"description",label: 'Description', _style: { width: '20%' } },
    { key:"amount",label: 'Amount', _style: { width: '20%' } },
    { key:"time",label: 'Time', _style: { width: '20%' } },
    { key:"date",label: 'Date', _style: { width: '20%' } }

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


  return (
    <>


    <CCardBody>
      <CDataTable
        items={transactions}
        fields={fields}
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        pagination
        // loading

        // onPageChange={(val) => console.log('new page:', val)}
        // onPagesChange={(val) => console.log('new pages:', val)}
        // onPaginationChange={(val) => console.log('new pagination:', val)}
        // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
        // onSorterValueChange={(val) => console.log('new sorter value:', val)}
        // onTableFilterChange={(val) => console.log('new table filter:', val)}
        // onColumnFilterChange={(val) => console.log('new column filter:', val)}
        scopedSlots={{
          order_ID: (order) => <td>{order.job_id}</td>,
          type: (order) => <td>{order.type}</td>,
          description: (order) => <td>{order.message}</td>,
          rider: (order) => <td>{order.rider_assign ? ""+ order.rider_assign.firstName +" "+ order.rider_assign.lastName: 'No Rider'}</td>,
          date: (order) => <td>{moment(order.createdAt).format("DD/MM/YYYY")}</td>,
          time: (order) => <td>{moment(order.createdAt).format("hh:MM A")}</td>,

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


    </>

  )
}
export default Transactions
