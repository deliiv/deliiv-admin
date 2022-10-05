import React,{useState} from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable} from '@coreui/react'

  import {useHistory} from 'react-router-dom'

import moment  from 'moment'

const Delivered = ({delivered}) => {
  const history = useHistory();

  const [payLoad, setPayLoad] = useState({})


  const fields = [
    { key:"order_ID",lable: 'Order ID', _style: { width: '10%' } },
    { key:"user",lable: 'Customer', _style: { width: '20%' } },
    { key:"sender",label: 'Sender', _style: { width: '20%' } },
    { key:"receiver",label: 'Receiver', _style: { width: '20%' } },
    { key:"rider",label: 'Rider', _style: { width: '20%' } },
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
    {Object.keys(payLoad).length > 0  && <button onClick={()=> console.log('')}>Close</button>}


    {Object.keys(payLoad).length  === 0 &&
    <CCardBody>
      <CDataTable
        items={delivered}
        fields={fields}
        // columnFilter
        // tableFilter
        // cleaner
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        pagination
        // loading
        onRowClick={(item,index,col,e) =>{
         //  console.log(item,index,col,e)}
          // setPayLoad(item)
          history.push({pathname:`/orders/order/${item._id}`, data:{item: item}})
        }}
        // onPageChange={(val) => console.log('new page:', val)}
        // onPagesChange={(val) => console.log('new pages:', val)}
        // onPaginationChange={(val) => console.log('new pagination:', val)}
        // onFilteredItemsChange={(val) => console.log('new filtered items:', val)}
        // onSorterValueChange={(val) => console.log('new sorter value:', val)}
        // onTableFilterChange={(val) => console.log('new table filter:', val)}
        // onColumnFilterChange={(val) => console.log('new column filter:', val)}
        scopedSlots={{
          order_ID: (order) => <td>{order.job_id}</td>,
          user: (order) => <td>{order &&order.user && order.user.firstName} {order &&order.user &&  order.user.lastName}</td>,
          sender: (order) => <td>{order.sender.full_name}</td>,
          receiver: (order) => <td>{order.receiver.full_name}</td>,
          rider: (order) => <td>{order.rider_assign ? ""+ order.rider_assign.firstName +" "+ order.rider_assign.lastName: 'No Rider'}</td>,
          date: (order) => <td>{moment(order.createdAt).format("DD/MM/YYYY hh:MM A")}</td>,

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
        }

    </>

  )
}
export default Delivered
