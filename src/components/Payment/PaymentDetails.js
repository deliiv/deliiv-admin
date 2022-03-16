import React, { useState } from 'react'
import {
  CCardBody,
  CBadge,
  CDataTable,
  CCard} from '@coreui/react'
import usersData from './UsersData.js'
import Tabs from './PaymentTabs'
import PaymentPayload from './PaymentPayload.js'

const PaymentDetails = () => {

  const fields = [
    { key: 'name', _style: { width: '40%' } },
    'registered',
    { key: 'role', _style: { width: '20%' } },
    { key: 'status', _style: { width: '20%' } },

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

  return <PaymentPayload/>

}

export default PaymentDetails
