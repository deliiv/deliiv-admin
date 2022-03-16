import React from 'react'
import {
  CCardBody,
  CCard} from '@coreui/react'
import NotificationPayload from './NotificationPayload.js'

const RiderDetails = () => {

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

  return (
    <CCard>
    <CCardBody>

      <NotificationPayload/>



    </CCardBody>
    </CCard>
  )
}

export default RiderDetails
