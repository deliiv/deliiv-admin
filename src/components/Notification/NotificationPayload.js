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
  CSelect,
  CInput
} from '@coreui/react'

import Verified from './verified.svg'
import Avatar from './avatar.svg'
import OrderPayloadItem from './OrderPayloadItem'
import Modals from './Modals'
import Axios from 'axios';
const OrderPayload = () => {
  const [receivers, setReceivers] = useState('')
  const [msg, setMsg] = useState('')
  const [title, setTitle] = useState('')
  const [show, setShow] = useState(false)

  const handleChangeReceiver = (r) => {
    setReceivers(r)

  }

  const handleClickCancel=()=>{
    setMsg('')
    setTitle('')
  }

  const handleSendMessage=()=>{
    var data = JSON.stringify({
      to: '/topics/GeneralTopic',
      notification: {
        body: msg,
        title: title,
        image_url: 'image',
        sound: 'default',
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        data: { message: "Suppose user" }
      },
      data:{
        click_action: "FLUTTER_NOTIFICATION_CLICK",
        body: msg,
        title: title,
        image_url: 'image',
      }
    });

    var config = {
      method: 'post',
      url: `https://fcm.googleapis.com/fcm/send`,
      headers: {
        Authorization: `${process.env.REACT_APP_FIREBASE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    console.log('MK: ', `${process.env.REACT_APP_FIREBASE_TOKEN}`)
     Axios(config).then(function (response) {
       console.log('=====', response)
      //notify.put(sendNotificationSuccess(response.data));
    });

  }

  return (
    <CCard>
      <Modals
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
                <CInput
                value={title}
                onChange={e=> setTitle(e.target.value)}
                placeholder='Title'/>
                <br/>
                <CTextarea
                value={msg}
                placeholder="Message...."
                onChange={e => setMsg(e.target.value)} />
                <br />
                <div style={{ display: "flex", justifyContent: 'flex-end' }}>
                  <CButton
                    color="primary"
                    size="xl"
                    onClick={()=> setShow(true)}>
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
