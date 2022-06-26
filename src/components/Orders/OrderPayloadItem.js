import React from 'react'
import {
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'
import Person from './person.svg'
import Mail from './mail.svg'
import Phone from './phone.svg'
const OrderPayloadItem = ({ payload, index }) => {

  let arr = ['Sender', 'Receiver', 'Rider Details']

  return (
    <CCardBody>
      <h6 style={{ fontWeight: "bold" }}>{arr[index]}</h6>
      {
        payload !== null && <CRow>
          <CCol xs="12" md="4">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <img src={Person} alt="" />
              <p style={{ paddingTop: "10px", paddingLeft: 10 }}>{payload && index < 2 ? payload.full_name : "" + payload.firstName + ' ' + payload.lastName}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <img src={Phone} alt="" />
              <p style={{ paddingTop: "10px", paddingLeft: 10 }}>{payload && payload.phone_number}</p>
            </div>
          </CCol>

        </CRow>
      }
    </CCardBody>
  )
}

export default OrderPayloadItem
