import React,{useState} from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable} from '@coreui/react'

  import {useHistory} from 'react-router-dom'

import moment  from 'moment'

const Riders = ({riders}) => {
  const history = useHistory();

  const [payLoad, setPayLoad] = useState({})


  const fields = [
    { key:"firstName",lable: 'First Name', _style: { width: '10%' } },
    { key:"lastName",lable: 'Last Name', _style: { width: '10%' } },
    { key:"email",lable: 'Email', _style: { width: '20%' } },
    { key:"phone_number",label: 'Phone Number', _style: { width: '20%' } },
    { key:"active",label: 'Active', _style: { width: '20%' } }
  ]

  return (
    <>
    {Object.keys(payLoad).length > 0  && <button onClick={()=> console.log('')}>Close</button>}


    {Object.keys(payLoad).length  === 0 &&
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
        onRowClick={(item,index,col,e) =>{
          history.push({
            pathname:`/riders/details/${item._id}`,
           state:{pathname: 'user'}
          })
        }}
      />

    </CCardBody>
        }

    </>

  )
}

export default Riders
