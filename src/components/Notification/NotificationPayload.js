import React from 'react'
import {
  CCardBody,
  CCard,
  CCol,
  CRow,
  CBadge,
  CButton,
  CDropdownDivider,
  CTextarea,
  CSidebarNavDivider
} from '@coreui/react'

import Verified from './verified.svg'
import Avatar from './avatar.svg'
import OrderPayloadItem from './OrderPayloadItem'
const OrderPayload = () => {


  return (
    <CCard>

      <CCardBody>
        <CRow>
          <CCol xs="12" md="12" >
            <CRow>
              <CCol xs="6" md="6" >
                <h4>
                  <strong>
                    Push Notification (General)
                  </strong>
                </h4>
                <br />
                <CTextarea minh />
                <br />
                <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                  <CButton
                    color="primary"
                    size="xl">
                    <strong>  Save  </strong>
                  </CButton>
                  <CButton
                    color="danger"
                    variant="outline"
                    size="xl"
                    style={{ marginLeft: 20 }}>
                    <strong>  Close  </strong>
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6" md="6" >
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
                    <strong>  Save  </strong>
                  </CButton>
                  <CButton
                    color="danger"
                    variant="outline"
                    size="xl"
                    style={{ marginLeft: 20 }}>
                    <strong>  Close  </strong>
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol xs="6" md="6" >
                <h4>
                  <strong>
                    Push Notification (Riders)
                  </strong>
                </h4>
                <br />
                <CTextarea minh />
                <br />
                <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                  <CButton
                    color="primary"
                    size="xl">
                    <strong>  Save  </strong>
                  </CButton>
                  <CButton
                    color="danger"
                    variant="outline"
                    size="xl"
                    style={{ marginLeft: 20 }}>
                    <strong>  Close  </strong>
                  </CButton>
                </div>
              </CCol>
            </CRow>
          </CCol>
          {/* <CCol xs="3" md="3" >
            <CSidebarNavDivider  />
          </CCol> */}
          <CCol xs="12" md="12" >
            <CCol xs="6" md="6" >
              <h4>
                <strong>
                  Push Notification (General)
                </strong>
              </h4>
              <br />
              <CTextarea minh />
              <br />
              <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                <CButton
                  color="primary"
                  size="xl">
                  <strong>  Save  </strong>
                </CButton>
                <CButton
                  color="danger"
                  variant="outline"
                  size="xl"
                  style={{ marginLeft: 20 }}>
                  <strong>  Close  </strong>
                </CButton>
              </div>
            </CCol>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default OrderPayload
