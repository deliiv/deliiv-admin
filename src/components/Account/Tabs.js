import React, { useState } from 'react'
import {
  CCol,
  CNav,
  CNavItem,
  CNavLink,
  CRow,
  CTabContent,
  CTabPane,
  CCard,
  CCardBody,
  CTabs,
  CCardHeader,
  CTextarea,
  CInput
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DemoTable from './DemoTable'
import PayStack from './Paystack'

const Tabs = ({ paystack}) => {
 
  return (
    <CRow>
      <CCol xs="12" md="12" className="mb-4">
        <CCard>
          <CCardHeader>
            Table represents transactions in last 24hrs
          </CCardHeader>
          <CCardBody>
            <CTabs>
              <CNav variant="tabs">
                <CNavItem>
                  <CNavLink>
                    Recent Transactions
                  </CNavLink>
                </CNavItem>
                
                <CNavItem>
                  <CNavLink>
                    Paystack
                  </CNavLink>
                </CNavItem>
                
              </CNav>
              <CTabContent>
                <CTabPane>
                  <DemoTable />

                </CTabPane>
          
                <CTabPane>
                  <PayStack paystack={paystack} />
                </CTabPane>
                <CTabPane>
                  {/* <TopUsers topusers={topusers} /> */}
                </CTabPane>

              </CTabContent>
            </CTabs>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Tabs
