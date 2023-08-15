import React from 'react'
import {
  CCardBody,
  CCol,
  CRow
} from '@coreui/react'
import Person from '../Orders/person.svg'
import Mail from '../Orders/mail.svg'
import Phone from '../Orders/phone.svg'
const OrderPayloadItem = () => {


  return (
    <CCardBody>
      <h6 style={{ fontWeight: "bold" }}>Rider Details</h6>

      <CRow>

        <CCol xs="4" md="4">
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img src={Person} alt="" />
            <p style={{ paddingTop: "10px", paddingLeft: 10 }}>67896789</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img src={Mail} alt="" />
            <p style={{ paddingTop: "10px", paddingLeft: 10 }}>67896789</p>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <img src={Phone} alt="" />
            <p style={{ paddingTop: "10px", paddingLeft: 10 }}>67896789</p>
          </div>
        </CCol>

      </CRow>



    </CCardBody>
  )
}

export default OrderPayloadItem
