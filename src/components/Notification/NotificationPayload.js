import React, { useState } from 'react'
import {
  CCardBody,
  CCard,
  CCol,
  CRow,
  CButton,
  CTextarea,
  CSelect,
  CInput
} from '@coreui/react'

import Modals from './Modals'
import userService from 'src/services/user.service'
import { toast } from 'react-toastify'
const OrderPayload = () => {
  const [receivers, setReceivers] = useState('general')
  const [msg, setMsg] = useState('')
  const [title, setTitle] = useState('')
  const [show, setShow] = useState(false)

  const handleChangeReceiver = (r) => {
    setReceivers(r)

  }

  const handleClickCancel = () => {
    setMsg('')
    setTitle('')
  }

  const handleSendMessage = () => {
    let data = {
      body: msg,
      title: title,
      type: receivers
    }

    userService.sendPushNotification(data)
      .then((res) => {
        toast.success('Notification Sent')
        setShow(false)
        setMsg('');
        setTitle('')
      })
      .catch((error) => {
        toast.error('Error sending notification, try again later')
      });

  }

  return (
    <CCard>
      <Modals
      handleCancel={()=>setShow(false)}
        handleSuccess={handleSendMessage}
        show={show}
        message={msg}
        title={title} />

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
                  <option value="users">Customers</option>
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
                <CInput
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder='Title' />
                <br />
                <CTextarea
                  value={msg}
                  placeholder="Message...."
                  onChange={e => setMsg(e.target.value)} />
                <br />
                <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                  <CButton
                    color="primary"
                    size="xl"
                    onClick={() => setShow(true)}>
                    <strong>  Send  </strong>
                  </CButton>
                  <CButton
                    color="danger"
                    variant="outline"
                    size="xl"
                    style={{ marginLeft: 20 }}
                    onClick={handleClickCancel}>
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
