import React,{useEffect} from 'react'
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
import { useSelector } from "react-redux";


import Location from '../Orders/location.svg'
import OrderPayloadItem from './OrderPayloadItem'
const PaymentPayload = () => {

  const witdrawal = useSelector((state) => state.transactions.witdrawalRequest);

  return (
    <CCard style={{ border:"1px solid #6FB9FD", marginLeft:20 }}>
      <CCardBody>

        <div style={{ width: '150px' }}>
          {/* <CFormGroup>
            <CSelect custom name="ccmonth" id="ccmonth">
              <option value="1">This month</option>
              <option value="2">This week</option>
              <option value="3">Three week</option>
            </CSelect>
          </CFormGroup> */}
        </div>
        <br />
        <CRow>

          <CCol xs="12" md="6">
            <CCard style={{ padding: 10 }}>
              Total Witdrawal Request
              <CCardBody>
                <h3>
                <strong>
                {witdrawal && witdrawal.total && witdrawal.total.totalPending[0].sum}
                </strong>
                </h3>
              </CCardBody>
            </CCard>

          </CCol>
          <CCol xs="12" md="6">
            <CCard style={{ padding: 10 }}>
              Total Witdrawal Completed
              <CCardBody>
              <h3>
                <strong>
                {witdrawal && witdrawal.total && witdrawal.total.totalCompleted[0].sum}
                </strong>
                </h3>
              </CCardBody>
            </CCard>

          </CCol>
        </CRow>

      </CCardBody>
    </CCard>
  )
}

export default PaymentPayload
