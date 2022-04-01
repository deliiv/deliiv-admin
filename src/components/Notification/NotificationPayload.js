import React, { useState } from 'react'
import {
  CCardBody,
  CCard,
  CCol,
  CRow,
  CBadge,
  CButton,
  CDropdownDivider,
  CTextarea,
  CSidebarNavDivider,
  CSelect
} from '@coreui/react'

import Verified from './verified.svg'
import Avatar from './avatar.svg'
import OrderPayloadItem from './OrderPayloadItem'
const OrderPayload = () => {
  const [receivers, setReceivers] = useState('')

  const handleChangeReceiver = (r) => {
    setReceivers(r)

  }


  return (
    <CCard>

      <CCardBody>
        <CRow>
          <CCol xs="12" md="12" >

            <CRow>

              <CCol xs="6" md="6" >
                <h4>
                  <strong>
                    Receivers
                  </strong>
                </h4>
                <CSelect
                  custom value={receivers} name="creditReason"
                  id="creditReason"
                  onChange={e => handleChangeReceiver(e.target.value)}>
                  <option value="customers">Customers</option>
                  <option value="riders">Riders</option>
                  <option value="general">General</option>
                </CSelect>
                <br />
                <br />
                <br />
                <h4>
                  <strong>
                    Push Notification (Customers)
                  </strong>
                </h4>
                <br />
                <CTextarea minh />
                <br />
                <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                  <CButton
                    color="primary"
                    size="xl">
                    <strong>  Send  </strong>
                  </CButton>
                  <CButton
                    color="danger"
                    variant="outline"
                    size="xl"
                    style={{ marginLeft: 20 }}>
                    <strong>  Clear  </strong>
                  </CButton>
                </div>
              </CCol>
            </CRow>

          </CCol>

        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default OrderPayload
