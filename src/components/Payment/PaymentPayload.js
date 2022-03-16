import React from 'react'
import {
  CCardBody,
  CCard,
  CCardHeader,
  CCol,
  CRow,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CFormGroup,
  CLabel,
  CSelect
} from '@coreui/react'

import Location from '../Orders/location.svg'
import OrderPayloadItem from './OrderPayloadItem'
const PaymentPayload = () => {


  return (
    <CCard style={{ border:"1px solid #6FB9FD", marginLeft:20 }}>
      <CCardBody>

        <div style={{ width: '150px' }}>
          <CFormGroup>
            {/* <CLabel htmlFor="ccmonth">Month</CLabel> */}
            <CSelect custom name="ccmonth" id="ccmonth">
              <option value="1">This month</option>
              <option value="2">This week</option>
              <option value="3">Three week</option>
            </CSelect>
          </CFormGroup>
        </div>
        <br />
        <CRow>

          <CCol xs="12" md="6">
            <CCard style={{ padding: 10 }}>
              Renue
              <CCardBody>
                Lorem ipsum
              </CCardBody>
            </CCard>

          </CCol>
          <CCol xs="12" md="6">
            <CCard style={{ padding: 10 }}>
              Payments
              <CCardBody>
                Lorem ipsum
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  )
}

export default PaymentPayload
